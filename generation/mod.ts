import type { OpenAPI2 } from './openapi.ts';
import { writeApiModule } from "./codegen.ts";
import { describeSurface } from "./describe-surface.ts";

const data = await Deno.readTextFile('openapi.json');
const wholeSpec: OpenAPI2 = JSON.parse(data);
const surface = describeSurface(wholeSpec);

for (const api of surface.allApis) {
  try {
    await writeApiModule(surface, api);
  } catch (err) {
    console.error(`Error writing`, api.apiGroupVersion);
    console.error(err);
  }
}

// function writeApi(apiGroup: string, apiVersion: string) {
//   const api = surface.allApis.find(x => x.apiGroup === apiGroup && x.apiVersion === apiVersion);
//   if (!api) throw new Error(`Didn't find ${apiGroup} ${apiVersion} in API specification`);
//   return writeApiModule(surface, api);
// }

// await writeApi('meta', 'v1');
// await writeApi('pet.wg69.net', 'v1');
// await writeApi('apps', 'v1');
// // await writeApi('batch', 'v1');
// // await writeApi('batch', 'v1beta1');
// await writeApi('core', 'v1');
// // await writeApi('acme.cert-manager.io', 'v1beta1');
// await writeApi('policy', 'v1beta1');
// // await writeApi('extensions', 'v1beta1');
// await writeApi('autoscaling', 'v1');
// await writeApi('authentication.k8s.io', 'v1');
