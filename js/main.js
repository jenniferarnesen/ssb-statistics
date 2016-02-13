require.config({
    paths: {
        'jQuery': 'jquery-2.2.0.min'
    },
    shim: {
        'jQuery': {
            exports: '$'
        }
    }
});

require(['jQuery'], function ($) {
    $(document).ready(function () {
        console.log('ready to go');

        if (typeof JSONstat !== 'function') {
            console.log('missing the JSONstat function');
            throw "missing JSONstat";
        }

        var ssbApi = 'http://data.ssb.no/api/v0/dataset/85432.json?lang=no';

        JSONstat(ssbApi, function () {
            if (this.classv === "bundle") {
                var ds = this.Dataset(0);
                    OSLO = ds.Dimension('Region').id[51],
                    levels = ds.Dimension('Nivaa').id,
                    WOMEN = ds.Dimension('Kjonn').id[2],
                    years = ds.Dimension('Tid').id,
                    result = [];

                //order of the data
                //"id":["Region","Nivaa","Kjonn","Tid","ContentsCode"]

                var transform = function (curr, i) {
                    return {
                        'Year': ds.Dimension('Tid').Category(i).label,
                        'Percent': curr.value
                    };
                };

                //free dimension is Years
                //Get the education level percents for all the available years
                for (var i = 0; i < levels.length; i += 1) {
                    var res = ds.Data({
                        'Region': OSLO,
                        'Kjonn': WOMEN,
                        'Nivaa': levels[i]
                    }).map(transform);
                    
                    result.push({
                        'level': ds.Dimension('Nivaa').Category(i).label,
                        'data': res
                    });
                };

                console.log('result', result);
                
                //get education level for women in Oslo, by year
                // year | grunn | videre | uni1 | uni2
                // -----------------------------------
                // 1980 |   33  |   22   | 20   |  25
                // 1981 |   35  |   25   | 25   |  15 
                
                // make a compound bar graph?
            }
        });
    });
});
