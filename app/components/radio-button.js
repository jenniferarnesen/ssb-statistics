import React from 'react';

export default class RadioButton extends React.Component {
	/**
	 * Handle the button click event
	 */
	handleClick () {
        this.props.handleFilterChanged(this.props.id);
    }

    /**
	 * Render the component
	 */
	render () {
		return (
			<span>
				<input type="radio"
					name="{this.props.name}"
					value="{this.props.id}"
					onClick={this.handleClick.bind(this)}/>
				<span>{this.props.title}</span>
			</span>
		);
	}
}
