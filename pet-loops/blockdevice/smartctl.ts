import {readTextTable, ensureCode} from '../lib.ts';

const decoder = new TextDecoder('utf-8');

async function runSmartCtl(...args: string[]): Promise<string> {
  console.log('$ smartctl', args.join(' '));

  // switch (args[0]) {
  //   case '--version':
  //     return Deno.readTextFile('./pet-loops/blockdevice/fixtures/version.txt');
  //   case '--scan':
  //     return Deno.readTextFile('./pet-loops/blockdevice/fixtures/scan.txt');
  //   case '-a':
  //     return Deno.readTextFile('./pet-loops/blockdevice/fixtures/sdb.txt');
  // }

  const subprocess = Deno.run({
    cmd: [`smartctl`, ...args],
    stdout: 'piped',
  });

  const outText = decoder.decode(await subprocess.output());
  ensureCode(await subprocess.status());
  return outText;
}

export async function test() {
  try {
    const outText = await runSmartCtl('--version');
    return outText.startsWith('smartctl');

  } catch (err) {
    console.error('smartctl cannot be used!', err.originalMessage || err);
    return false;
  }
}

export interface SmartDevice {
  path: string;
  args?: string;
  comment: string;
}

export async function scanDevices(): Promise<SmartDevice[]> {
  const stdout = await runSmartCtl('--scan');
  return stdout.split('\n').slice(0, -1).map(line => {
    const match = line.match(/^([^ ]+) ([^#]+)? # (.+)/);
    if (match) {
      return {path: match[1], args: match[2], comment: match[3]};
    } else {
      return {path: '', comment: line};
    }
  });
}

export interface SmartReport {
  CollectionTime: Date;
  Information: Record<string,string>;
  SelfAssessment: string;
  GeneralValues: Array<string>;
  AttributesVersion: number;
  Attributes: Array<Record<string,string>>;
  ErrorLogVersion: number;
  ErrorLog: Array<string>;
  SelfTestLogVersion: number;
  SelfTestLog: Array<Record<string,string>>;
  SelfTestTableVersion: number;
  SelfTestTable: Array<string>;
  SelfTestFlags: string;
};

export async function readAllForDevice(path: string) {
  const report: SmartReport = {
    CollectionTime: new Date,
    Information: {},
    SelfAssessment: 'TODO',
    GeneralValues: [],
    AttributesVersion: -1,
    Attributes: [],
    ErrorLogVersion: -1,
    ErrorLog: [],
    SelfTestLogVersion: -1,
    SelfTestLog: [],
    SelfTestTableVersion: -1,
    SelfTestTable: [],
    SelfTestFlags: 'TODO',
  };

  const stdout = await runSmartCtl('-a', '--', path);
  for (const block of stdout.trim().split('\n\n').slice(1)) {
    const [headLine, ...lines] = block.trim().split('\n');
    const revNumber = parseInt((headLine.match(/ \d+$/) || ['-1'])[0]);
    switch (true) {

      case headLine === '=== START OF INFORMATION SECTION ===':
        for (const line of lines) {
          const [_, label, content] = line.match(/^([^:]+): +(.+)$/) ?? [];
          report.Information[label.replace(/ is$/,'')] = content;
        }
        break;

      case headLine === '=== START OF READ SMART DATA SECTION ===':
        report.SelfAssessment = lines[0].split(': ')[1];
        break;

      case headLine.startsWith('SMART Attributes Data Structure'):
        report.AttributesVersion = revNumber;
        report.Attributes = readTextTable(lines.slice(1));
        break;

      case headLine.startsWith('SMART Self-test log structure'):
        report.SelfTestLogVersion = revNumber;
        report.SelfTestLog = readTextTable(lines);
        break;

      default:
        console.log('unknown smartctl block header:', headLine);
    }
  }
  return report;
};

export async function dumpAll() {
  const devices = await scanDevices();
  return await Promise
    .all(devices
      .filter(x => x.path)
      .map(x =>
        readAllForDevice(x.path)
        .then(findings => ({
          Device: x,
          ...findings,
        }))));
};

// basic test entrypoint
if (import.meta.main) {
  if (await test()) {
    console.log('Devices:', await scanDevices());
    console.log('First disk:', await readAllForDevice('/dev/sda'));
    console.log(JSON.stringify(await dumpAll()));
  } else {
    console.log('smartctl not usable');
  }
}
