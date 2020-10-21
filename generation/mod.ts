import type { OpenAPI2 } from './openapi.ts';
import { describeApi } from "./describe-api.ts";
import { writeApiModule } from "./codegen.ts";
import { describeSurface } from "./describe-surface.ts";

const data = await Deno.readTextFile('openapi.json');
const wholeSpec: OpenAPI2 = JSON.parse(data);
const surface = describeSurface(wholeSpec);
// console.log(surface.allApis.slice(0, 5));
// console.log(surface.allApis.map(x => [x.apiRoot, x.shapePrefix]));

const wg69 = surface.allApis.find(x => x.apiGroup === 'pet.wg69.net' && x.apiVersion === 'v1');
if (!wg69) throw new Error(`TODO`);
// const wg69api = describeApi(surface, wg69);
await writeApiModule(surface, wg69);
// // console.log(wg69api.kinds);

// await writeApiModule(describeApi(wholeSpec, 'meta', 'v1'));
// await writeApiModule(describeApi(wholeSpec, 'core', 'v1'));
// await writeApiModule(describeApi(wholeSpec, 'acme.cert-manager.io', 'v1beta1'));
// await writeApiModule(describeApi(wholeSpec, 'policy', 'v1beta1'));
// await writeApiModule(describeApi(wholeSpec, 'extensions', 'v1beta1'));
// await writeApiModule(describeApi(wholeSpec, 'batch', 'v1'));
// await writeApiModule(describeApi(wholeSpec, 'batch', 'v1beta1'));
