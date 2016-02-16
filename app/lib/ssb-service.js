import JSONstat from 'node_modules/jsonstat/module';

import 'fetch'; 

var ssbApi = 'http://data.ssb.no/api/v0/dataset/85432.json?lang=no';

 /**
  * fetch statistics data from ssb
  * @return {Promise}
  */
export function get () {
    return fetch(ssbApi).then(response => response.json());
}
