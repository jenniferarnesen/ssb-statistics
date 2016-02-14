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

        ssbService.get()
            .then(function (ds) {
                var OSLO = ds.Dimension('Region').id[51],
                    WOMEN = ds.Dimension('Kjonn').id[2],
                    years = ds.Dimension('Tid').id,
                    levels = ds.Dimension('Nivaa').id,
                    yearRows,
                    yearRowsMarkup,
                    th,
                    i;

                var getRadioButtonMarkup = function () {
                    var markup;
                    for (i = 0; i < ds.Dimension('Kjonn').id.length; i += 1) {
                        var checkedVal = i == 0 ? 'checked' : '';
                        markup += '<input type="radio" name="sex" \
                            value="' + ds.Dimension("Kjonn").id[i] + '"' + checkedVal + '> \
                            ' + ds.Dimension("Kjonn").Category(i).label;
                    }
                    return markup;
                };

                var setTableHeaders = function () {
                    th = ['<th>' + ds.Dimension('Tid').label + '</th>'].concat(levels
                        .map(function (curr) {
                            return '<th class="number"> \
                                ' +ds.Dimension('Nivaa').Category(curr).label + ' \
                                </th>';
                        }))
                        .join('');

                    $('#statistics thead').append('<tr>' + th + '</tr>');
                };

                var addTableData = function (sex) {

                }


                $('#content').append(getRadioButtonMarkup());

                $('input:radio[name="sex"]').change(function () {
                    console.log($(this).val());
                });

                setTableHeaders();
                //addTableData(2);

                yearRows = years.map(function (year, i) {
                    var res =
                            ds.Data({
                                'Region': OSLO,
                                'Kjonn': WOMEN,
                                'Tid': year
                            })
                            .map(function (curr) {
                                return curr.value;
                            }),

                        yearLabel = ds.Dimension('Tid').Category(i).label;

                    return [yearLabel].concat(res);
                });

                yearRowsMarkup = yearRows.reduce(function (previous, current) {
                    var tds = current
                        .map(function (curr) {
                            return '<td>' + curr + '</td>';
                        })
                        .reduce(function (prev, curr) {
                            return prev + curr;
                        });

                    return previous + '<tr>' + tds + '</tr>';
                });

                $('#statistics tbody').append(yearRowsMarkup);
                $('#statistics').tablesort();
                $('.number').data('sortBy', function (th, td, sorter) {
                    return parseInt(td.text(), 10);
                });
            })
            .catch(function (e) {
                console.log('Could not fetch data at this time', e);
            });
    });
});
