import { autoDetectClient, readAllItems } from '../client.ts';
import { ApiextensionsV1beta1Api } from "../builtin/apiextensions.k8s.io@v1beta1/mod.ts";

const restClient = await autoDetectClient();

const appsApi = new ApiextensionsV1beta1Api(restClient);
for await (const crd of readAllItems(t => appsApi
    .getCustomResourceDefinitionList({ limit: 25, continue: t }))) {

  console.log(crd.metadata?.name,
      crd.spec.version,
      crd.spec.versions?.map(x => x.name));
}
