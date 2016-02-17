import React from 'react';
import ReactDOM from 'react-dom';

import * as SsbService from './lib/ssb-service';
import JSONstat from 'node_modules/jsonstat/module';

import StatisticsTable from './components/statistics-table';
import SexSelector from './components/sex-selector';

class StatisticsViewer extends React.Component {
    constructor (props) {
        super(props);
        this.ds = null;
        this.state = {
            sexes: []
        };
    }

    /**
     * Extract the labels for a given dimension
     * from the statistics dataset
     *
     * @param  {Object} dimension
     * @return {Array}
     */
    getLabels (dimension) {
        return dimension.id.map(function (curr, i) {
            return dimension.Category(i).label;
        });
    }

    /**
     * Query for the education level data for a given sex
     *
     * @param  {Object} ds  Dataset object
     * @param  {Integer} sex
     * @return {Array}
     */
    getData (ds, sex) {
        let years = ds.Dimension('Tid').id,
            OSLO = ds.Dimension('Region').id[51];
                        
        return years
        .map(function (year, i) {
            let yearData =
                    ds.Data({
                        'Region': OSLO,
                        'Kjonn': sex + '',
                        'Tid': year
                    })
                    .map(function (curr) {
                        return curr.value;
                    }),

                yearLabel = ds.Dimension('Tid').Category(i).label;

            return [yearLabel].concat(yearData);
        });
    }

    /**
     * Handler for radio buttons to filter data based on
     * sex choice
     *
     * @param  {Integer} item Which item was clicked
     * @return {Array}
     */
    handleFilterChanged (item) {
        let data = this.getData(this.ds, item);
        this.setState({data: data});
    }

    /**
     * React class lifecycle method
     * Fetch the data from ssb and set the initial state
     */
    componentDidMount () {
        let self = this;
        SsbService.get().then((res) => {
            self.ds = JSONstat(res).Dataset(0);

            let defaultSex = self.ds.Dimension('Kjonn').id[0],
                data = this.getData(self.ds, defaultSex);

            this.setState({
                sexes: this.getLabels(self.ds.Dimension('Kjonn')),
                levels: this.getLabels(self.ds.Dimension('Nivaa')),
                yearLabel: self.ds.Dimension('Tid').label,
                data: data
            });
        });
    }

    /**
     * Render the component
     */
    render () {
        return (
            <div>
                <SexSelector
                    sexes={this.state.sexes}
                    handleFilterChanged={this.handleFilterChanged.bind(this)}
                />
                <StatisticsTable
                    data={this.state.data}
                    yearLabel={this.state.yearLabel}
                    levels={this.state.levels}
                />
            </div>
        );
    }
}

ReactDOM.render(<StatisticsViewer />, document.getElementById('content'));
