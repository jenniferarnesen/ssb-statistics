import React from 'react';

import $ from 'jquery';
import 'tablesort';

import TableRow from './table-row';

export default class StatisticsTable extends React.Component {
    /**
     * React class lifecycle method
     * Attach the jquery plugin behaviour to the statistics table
     * @return {[type]} [description]
     */
    componentDidUpdate () {
        $('#statistics').tablesort();
        $('.number').data('sortBy', function (th, td, sorter) {
            return parseInt(td.text(), 10);
        });
    }

    /**
     * Assemble the table header
     */
    getHeaders () {
        if (!this.props.yearLabel) {
            return <tr></tr>;
        }

        let levels = this.props.levels,
            th = [<th>{this.props.yearLabel}</th>].concat(
                this.props.levels.map(function (curr, i) {
                    var theKey = curr+i;
                    return <th className="number" key={theKey}>{curr}</th>;
                }));

        return (
            <tr>
                {th}
            </tr>
        );
    }

    /**
     * Get the table rows
     *
     * @return {Array}
     */
    getRows () {
        if (!this.props.data) {
            return <tr></tr>;
        }

        return this.props.data.map(function (curr) {
            return <TableRow data={curr} />;
        });
    }

    /**
     * Render the component
     */
    render () {
        let headers = this.getHeaders(),
            rows = this.getRows();

        return (
            <table id='statistics'>
                <thead>{headers}</thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}


