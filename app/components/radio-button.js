import React from 'react';

export default class RadioButton extends React.Component {
	handleClick (e) {
        console.log('button clicked', e);
    }

	render () {
		return (
			<span>
				<input type="radio"
					name="{this.props.name}"
					value="{this.props.id}"
					onClick={this.handleClick}/>
				<span>{this.props.title}</span>
			</span>
		);
	}
}
