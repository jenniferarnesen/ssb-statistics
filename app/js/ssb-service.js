import JSONstat from 'node_modules/jsonstat/module';

import 'fetch'; 

var ssbApi = 'http://data.ssb.no/api/v0/dataset/85432.json?lang=no';

 /**
  * fetch statistics data from ssb
  * @return {Promise}
  */
// export function get() {
//     var p = new Promise(function (resolve, reject) {

//         if (typeof JSONstat !== 'function') {
//             reject('JSONstat library is missing');
//         }

//         JSONstat(ssbApi, function () {
//             resolve(this.Dataset(0));
//         });
//     });

//     return p;
// };

export function get () {
    return fetch(ssbApi).then(response => response.json());
    // return fetch(ssbApi);.then(function (data) {
    //     console.log('data', data);
    //     return data;
    // });
}
