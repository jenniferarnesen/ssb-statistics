import React from 'react';

export default class TableRow extends React.Component {

	getTds () {
		if (!this.props.data) {
			return <td></td>;
		}

		return this.props.data.map(function (curr) {
			return <td>{curr}</td>;
		});
	}

	render () {
		var tds = this.getTds();

        return (
            <tr>
                {tds}
            </tr>
        );
    }
}


