require.config({
    paths: {
        'jQuery': 'jquery-2.2.0.min',
        'jquery-tablesorter': 'jquery.tablesort.min'
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'jquery-tablesorter': ['jQuery']
    }
});

require(['jQuery', 'jquery-tablesorter'], function ($) {
    $(document).ready(function () {

        console.log('ready to go');

        $('#statistics').tablesort();

        if (typeof JSONstat !== 'function') {
            console.log('missing the JSONstat function');
            throw "missing JSONstat";
        }

        var ssbApi = 'http://data.ssb.no/api/v0/dataset/85432.json?lang=no';

        JSONstat(ssbApi, function () {
            console.log('got the data');
            
            // var beforeSec = new Date().getTime();
            // var data1 = this.Dataset(0).toTable( {type : 'arrobj', content : 'id'}, function (d, i) {

            //     if (d.Kjonn === '2' && d.Region === '0301') {
            //         return {
            //             percent: d.value,
            //             year: d.Tid,
            //             level: d.Nivaa
            //         } 
            //     }
            // });
            // var afterSec = new Date().getTime();
            // console.log('time used', afterSec - beforeSec);
            
            var ds = this.Dataset(0);
                OSLO = ds.Dimension('Region').id[51],
                levels = ds.Dimension('Nivaa').id,
                WOMEN = ds.Dimension('Kjonn').id[2],
                years = ds.Dimension('Tid').id,
                result = [];
            
            //free dimension is Levels (Nivaa)
            var transform = function (curr, i) {
                return curr.value;
            };
            var beforeSec1 = new Date().getTime();
            for (var i = 0; i < years.length; i += 1) {
                var res = ds.Data({
                    'Region': OSLO,
                    'Kjonn': WOMEN,
                    'Tid': years[i]
                }).map(transform);

                result.push([
                    ds.Dimension('Tid').Category(i).label, res[0], res[1], res[2], res[3]
                ]);
            };
            var afterSec1 = new Date().getTime();
            console.log('time used', afterSec1 - beforeSec1);

            for (var j = 0; j < result.length; j += 1) {
                var item = result[j];
                var trMarkup =
                    '<tr> \
                        <td>' + item[0] + '</td> \
                        <td>' + item[1] + '</td> \
                        <td>' + item[2] + '</td> \
                        <td>' + item[3] + '</td> \
                        <td>' + item[4] + '</td> \
                    </tr>';
                $('#statistics tbody').append(trMarkup); 
            }

            //get education level for women in Oslo, by year
            // year | grunn | videre | uni1 | uni2
            // -----------------------------------
            // 1980 |   33  |   22   | 20   |  25
            // 1981 |   35  |   25   | 25   |  15 
        });
    });
});
