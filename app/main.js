import React from 'react';
import ReactDOM from 'react-dom';

import StatisticsTable from './components/statistics-table';

import * as SsbService from './js/ssb-service';
import SexSelector from './components/sex-selector';

import JSONstat from 'node_modules/jsonstat/module';

class StatisticsViewer extends React.Component {
	constructor (props) {
		super(props);
		this.ds = null;
		this.state = {
			sexes: []
		};
	}

	getLabels (dimension) {
		return dimension.id.map(function (curr, i) {
			return dimension.Category(i).label;
		});
	}

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

	handleFilterChanged (item) {
		console.log('item', item);
        let data = this.getData(this.ds, item);
        this.setState({data: data});
    }

	componentDidMount () {
		let self = this;
		SsbService.get().then((res) => {
			self.ds = JSONstat(res).Dataset(0);

			let defaultSex = self.ds.Dimension("Kjonn").id[0],
				data = this.getData(self.ds, defaultSex);

			this.setState({
				sexes: this.getLabels(self.ds.Dimension('Kjonn')),
				levels: this.getLabels(self.ds.Dimension('Nivaa')),
				yearLabel: self.ds.Dimension('Tid').label,
				data: data
			});
		});
	}

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
