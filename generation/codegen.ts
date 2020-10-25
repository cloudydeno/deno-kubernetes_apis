import * as path from "https://deno.land/std@0.70.0/path/mod.ts";
import { generateModuleTypescript } from "./codegen-mod.ts";
import { generateStructsTypescript } from "./codegen-structs.ts";
import { SurfaceApi, SurfaceMap } from "./describe-surface.ts";

export async function writeApiModule(surface: SurfaceMap, api: SurfaceApi) {
  const modRoot = path.join('lib', 'apis', api.moduleName);

  await Deno.mkdir(modRoot, {recursive: true});

  if (api.operations.length > 0) {
    await Deno.writeTextFile(path.join(modRoot, 'mod.ts'),
      generateModuleTypescript(surface, api));
    console.log('Wrote', path.join(modRoot, 'mod.ts'));
  }

  await Deno.writeTextFile(path.join(modRoot, 'structs.ts'),
    generateStructsTypescript(surface, api));
  console.log('Wrote', path.join(modRoot, 'structs.ts'));
}
