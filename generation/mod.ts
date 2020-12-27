import type { OpenAPI2 } from './openapi.ts';
import { writeApiModule } from "./codegen.ts";
import { describeSurface } from "./describe-surface.ts";

const data = await Deno.readTextFile(Deno.args[0] ?? 'openapi.json');
const wholeSpec: OpenAPI2 = JSON.parse(data);
const surface = describeSurface(wholeSpec);

for (const api of surface.allApis) {
  try {
    await writeApiModule(surface, api, Deno.args[1] ?? 'builtin');
  } catch (err) {
    console.error(`Error writing`, api.apiGroupVersion);
    console.error(err);
  }
}
