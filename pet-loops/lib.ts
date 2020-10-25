export function ensureCode(status: Deno.ProcessStatus) {
  if (status.code !== 0) {
    throw new Error(`Subprocess exited with code ${status.code}`);
  }
}

// export async function execForLine(cmd) {
//   const {stdout, stderr} = await exec(cmd);
//   if (stderr.length > 0) {
//     return stderr.trim();
//   }
//   return stdout.trim();
// };

export function readTextTable(lines: string[]): Record<string,string>[] {
  if (lines.length < 1) return [];

  // record column positioning for each header field
  const fields: {text: string; start: number; end?: number}[] = [];
  ((lines.shift() ?? '')
    .match(/ *[^ ]+ */g) ?? []) // capture including whitespace
    .reduce((accum, raw) => {
      fields.push({
        text: raw.trim(),
        start: accum,
        end: accum+raw.length-1,
      });
      // accumulate starting index
      return accum+raw.length;
    }, 0);

  // last field reads until the last column of the data row
  fields.slice(-1)[0].end = undefined;

  // slice each field out of the lines
  return lines.map(line => {
    const row: Record<string,string> = {};
    for (const {text, start, end} of fields) {
      row[text] = line.slice(start, end).trim();
    }
    return row;
  });
}
