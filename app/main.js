import React from 'react';
import ReactDOM from 'react-dom';

import StatisticsTable from './components/statistics-table';

import * as SsbService from './js/ssb-service';
import SexSelector from './components/sex-selector';

import JSONstat from 'node_modules/jsonstat/module';

class HelloWorld extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			sexes: []
		};
	}

	getSexesData (dm) {
		return dm.id.map(function (curr, i) {
			return dm.Category(i).label;
		});
	}

	componentDidMount () {
		SsbService.get().then((res) => {
			var ds = JSONstat(res).Dataset(0);
			//console.log(ds.Dimension('Kjonn'));
			var sexes = this.getSexesData(ds.Dimension('Kjonn'));
			this.setState({
				sexes: sexes
			});
		});
	}

	render () {
		return (
			<div>
				<SexSelector sexes={this.state.sexes} />
				<StatisticsTable />
			</div>
		);
	}
}

ReactDOM.render(<HelloWorld />, document.getElementById('content'));
