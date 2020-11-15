import {KubectlRawRestClient} from './via-kubectl-raw.ts';

const client = new KubectlRawRestClient();

// Build a querystring object
const querystring = new URLSearchParams();
querystring.set('limit', '1');

// Request a path directly
console.log(await client.performRequest('get', {
  path: `/api/v1/namespaces/default/endpoints`, querystring}));
