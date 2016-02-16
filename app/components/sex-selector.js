import React from 'react';

import RadioButton from './radio-button';

export default class SexSelector extends React.Component {

	getChoices (sexes, handler) {
		return sexes.map(function (curr, i) {
            return (
                <RadioButton name="sex" id={i} title={curr} key={curr} handleFilterChanged={handler} />
            );
		});
	}

	render() {
		var choices = this.getChoices(this.props.sexes, this.props.handleFilterChanged);

		return (
			<div>
				{choices}
			</div>
		);
	}
}
