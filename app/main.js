import React from 'react';

import StatisticsTable from './components/statistics-table';

import * as SsbService from './js/ssb-service';

import JSONstat from 'node_modules/jsonstat/module';

class HelloWorld extends React.Component {
	constructor(props) {
		super(props);
		var res = SsbService.get().then(function (res) {
			console.log('res', res);
			JSONstat(res);
		});
		this.state = {data: []};
	}

	render() {
		return <div>
					<StatisticsTable />
				</div>;
	}
}

React.render(<HelloWorld />, document.body);
