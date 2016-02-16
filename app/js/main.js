require.config({
    paths: {
        'jQuery': 'jquery-2.2.0.min',
        'jquery-tablesorter': 'jquery.tablesort.min',
        'JSONstat': 'json-stat'
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'jquery-tablesorter': ['jQuery'],
        'JSONstat': []
    }
});

require(['jQuery', 'ssb-service', 'jquery-tablesorter', 'JSONstat'], function ($, ssbService) {
    $(document).ready(function () {
        'use strict';

        ssbService.get()
        .then(function (ds) {
            // var radioButtonMarkup = function (defaultChecked) {
            //         let sexes = ds.Dimension('Kjonn').id,
            //             buttonMarkup = sexes.reduce(function (prev, curr, i) {
            //                 let checkedVal = (i == defaultChecked ? 'checked' : ''),
            //                     markup = 
            //                         '<input type="radio" \
            //                         name="sex" \
            //                         value="' + ds.Dimension("Kjonn").id[i] + '" \
            //                         ' + checkedVal + '> \
            //                         ' + ds.Dimension("Kjonn").Category(i).label;

            //                 return prev + markup;
            //             }, '');
        
            //         return buttonMarkup;
            //     },

            //     setTableHeaders = function () {
            //         let levels = ds.Dimension('Nivaa').id,
            //             th = ['<th>' + ds.Dimension('Tid').label + '</th>'].concat(levels
            //             .map(function (curr) {
            //                 return '<th class="number"> \
            //                     ' +ds.Dimension('Nivaa').Category(curr).label + ' \
            //                     </th>';
            //             }))
            //             .join('');

            //         $('#statistics thead').append('<tr>' + th + '</tr>');
            //         $('#statistics').tablesort();
            //         $('.number').data('sortBy', function (th, td, sorter) {
            //             return parseInt(td.text(), 10);
            //         });
            //     },

                // setTableData = function (sex) {
                //     let years = ds.Dimension('Tid').id,
                //         OSLO = ds.Dimension('Region').id[51],
                        
                //         yearRowsMarkup = years
                //         .map(function (year, i) {
                //             let yearData =
                //                     ds.Data({
                //                         'Region': OSLO,
                //                         'Kjonn': sex + '',
                //                         'Tid': year
                //                     })
                //                     .map(function (curr) {
                //                         return curr.value;
                //                     }),

                //                 yearLabel = ds.Dimension('Tid').Category(i).label;

                //             return [yearLabel].concat(yearData);
                //         })
                //         .reduce(function (previous, current) {
                //             let tds = current
                //                 .map(function (curr) {
                //                     return '<td>' + curr + '</td>';
                //                 })
                //                 .reduce(function (prev, curr) {
                //                     return prev + curr;
                //                 }, '');

                //             return previous + '<tr>' + tds + '</tr>';
                //         }, '');

                //     $('#statistics tbody').html('');
                //     $('#statistics tbody').append(yearRowsMarkup);
                // },

                init = function () {
                    //let defaultSex = ds.Dimension("Kjonn").id[0];

                    $('#content').append(radioButtonMarkup(defaultSex));
                    //$('#content').append(tableSkeletonMarkup());

                    $('input:radio[name="sex"]').change(function () {
                        setTableData($(this).val());
                    });

                    setTableHeaders();
                    setTableData(defaultSex); 
                };

            init();                
        })
        .catch(function (e) {
            console.log('Could not fetch data at this time', e);
        });
    });
});
