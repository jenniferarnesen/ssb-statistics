define(function () {

	var ssbApi = 'http://data.ssb.no/api/v0/dataset/85432.json?lang=no',

		/**
		 * fetch statistics data from ssb
		 * @return {Promise}
		 */
		get = function () {
			var p = new Promise(function (resolve, reject) {

				if (typeof JSONstat !== 'function') {
		            console.log('missing the JSONstat function');
		            reject('JSONstat library is missing');
		        }

		        JSONstat(ssbApi, function () {
		        	resolve(this.Dataset(0));
		        });
			});

			return p;
		};

	return {
		get: get
	};
});