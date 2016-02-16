import React from 'react';

import RadioButton from './radio-button';

export default class SexSelector extends React.Component {
	/**
	 * Get the array of radio buttons for the sex choice
	 * @param  {Array} sexes
	 * @param  {Function} handler The click handler from the top level component
	 * @return {Array}
	 */
	getChoices (sexes, handler) {
		return sexes.map(function (curr, i) {
            return (
                <RadioButton
                	name="sex"
                	id={i}
                	title={curr}
                	key={curr}
                	handleFilterChanged={handler}
                />
            );
		});
	}

	/**
	 * Render the component
	 */
	render() {
		var choices =
			this.getChoices(this.props.sexes, this.props.handleFilterChanged);

		return (
			<div>
				{choices}
			</div>
		);
	}
}
