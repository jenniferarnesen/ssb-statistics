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

require(['jQuery', 'ssb-service', 'jquery-tablesorter'], function ($, ssbService) {
    $(document).ready(function () {

        $('#statistics').tablesort();

        ssbService.get()
            .then(function (ds) {
                var OSLO = ds.Dimension('Region').id[51],
                    WOMEN = ds.Dimension('Kjonn').id[2],
                    years = ds.Dimension('Tid').id,
                    result = [],
                    i;
                
                //free dimension is Levels (Nivaa)
                for (i = 0; i < years.length; i += 1) {
                    var res =
                        ds.Data({
                            'Region': OSLO,
                            'Kjonn': WOMEN,
                            'Tid': years[i]
                        })
                        .map(function (curr) {
                            return curr.value;
                        });

                    result.push([
                        ds.Dimension('Tid').Category(i).label, res[0], res[1], res[2], res[3]
                    ]);
                };

                for (i = 0; i < result.length; i += 1) {
                    var tds = result[i]
                        .map(function (curr) {
                            return '<td>' + curr + '</td>';
                        })
                        .reduce(function (prev, curr) {
                            return prev + curr;
                        });

                    $('#statistics tbody').append('<tr>' + tds + '</tr>'); 
                }
            })
            .catch(function (e) {
                console.log('could not fetch data at this time', e);
            });
    });
});
