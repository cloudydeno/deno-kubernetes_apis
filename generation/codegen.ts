import { path } from "./deps.ts";
import { generateModuleTypescript } from "./codegen-mod.ts";
import { generateStructsTypescript } from "./codegen-structs.ts";
import { SurfaceApi, SurfaceMap } from "./describe-surface.ts";

export async function writeApiModule(surface: SurfaceMap, api: SurfaceApi, category: string, apisModuleRoot?: string) {
  const modRoot = path.join('lib', category, api.moduleName);

  function postProcess(text: string) {
    if (apisModuleRoot) {
      text = text.replaceAll(/from "..\/..\//g, `from "${apisModuleRoot}`);
    }
    return text;
  }

  await Deno.mkdir(modRoot, {recursive: true});

  await Deno.writeTextFile(path.join(modRoot, 'structs.ts'),
    postProcess(generateStructsTypescript(surface, api)));
  console.log('Wrote', path.join(modRoot, 'structs.ts'));

  if (api.operations.length > 0) {
    await Deno.writeTextFile(path.join(modRoot, 'mod.ts'),
      postProcess(generateModuleTypescript(surface, api)));
    console.log('Wrote', path.join(modRoot, 'mod.ts'));
  }
}
