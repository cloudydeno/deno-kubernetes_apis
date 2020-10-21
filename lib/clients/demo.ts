import {KubectlRestClient} from './via-kubectl.ts';

const client = new KubectlRestClient();

// Build a querystring object
const querystring = new URLSearchParams();
querystring.set('limit', '1');

// Create a subpathed client for working within an API space
console.log(await client
  .subPath`/api/v1/namespaces/${'default'}/services`
  .performRequest('get', {querystring}));

// Or pass a full path directly
console.log(await client.performRequest('get', {
  path: `/api/v1/namespaces/default/endpoints`, querystring}));
