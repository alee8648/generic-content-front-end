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

	render() {
		console.log(this.props);
		return (
			<div>
				<h1>{this.getTitle()}</h1>
				<p>{this.getContent()}</p>
				{ this.props.children }
				<button onClick={() => this.props.onTextChange( this.props.card )}>Change the text</button>
				<button onClick={() => this.props.onDelete(this.props.card.id)}>Delete</button>
			</div>
		);
	}
}

export default Card;