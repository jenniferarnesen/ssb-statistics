import React from 'react';

export default class TableRow extends React.Component {
	/**
	 * Get the table cells for a row
	 * @return {Array}
	 */
	getTds () {
		if (!this.props.data) {
			return <td></td>;
		}

		return this.props.data.map(function (curr) {
			return <td>{curr}</td>;
		});
	}

	/**
	 * Render the component
	 */
	render () {
		var tds = this.getTds();

        return (
            <tr>
                {tds}
            </tr>
        );
    }
}


