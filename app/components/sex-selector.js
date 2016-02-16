import React from 'react';

import RadioButton from './radio-button';

export default class SexSelector extends React.Component {

	render() {
		var inputs = this.props.sexes.map(function (curr, i) {
			var name = "sex";

            return (
                <RadioButton name={name} id={i} title={curr} key={curr} />
            );
		});

		return (
			<div>
				{inputs}
			</div>
		);
	}
}
