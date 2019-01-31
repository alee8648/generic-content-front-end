// Controlled component - no local state

import React, { Component } from 'react';
import _ from 'lodash';

class Card extends Component {
	constructor() {
		super(...arguments);
	}

	getTitle() {
		return _.get( this.props, 'card.title', 'Untitled Card' )
	}

	getContent() {
		return _.get( this.props, 'card.content', '...' )
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('---- componentDidUpdate running - Card');
		// Here we could make an AJAX call to update the server or get updated data

		// Title has changed
		if (prevProps.card.title !== this.props.card.title) {
			// Update server
		}
	}

	render() {
		console.log('---- render running - Card', this.props);
		return (
			<div>
				<h1>{this.getTitle()}</h1>
				<p>{this.getContent()}</p>
				<form onSubmit={(e) => this.props.onSubmit(e, this.props.card)}>
					<p><input type="text" placeholder="Add content" name="cardContent" value={this.getContent()} onChange={(e) => this.props.onTextChange(e, this.props.card)} /></p>
					<input type="submit" value="Save" />
				</form>
				{ this.props.children }
				<button onClick={() => this.props.onDelete(this.props.card)}>Delete</button>
			</div>
		);
	}
}

export default Card;