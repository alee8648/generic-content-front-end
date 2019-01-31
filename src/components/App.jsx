import React, { Component } from 'react';
import CardContainer from './CardContainer.jsx';
import Navbar from './Navbar.jsx';

const config = {
	getDocumentsEndpoint: 'http://localhost:3000/documents',
	updateDocumentsEndpoint: 'http://localhost:3000/documents/update/',
	deleteDocumentsEndpoint: 'http://localhost:3000/documents/delete/'
}

class App extends Component {
	state = {
		cards: []
	}


	constructor() {
		console.log('---- constructor running - App');

		super(...arguments);
	}

	componentDidMount() {
		console.log('---- componentDidMount running - App');

		fetch(config.getDocumentsEndpoint)
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log('data', data);
			this.setState({ 
				cards: data.map((datum, index) => {
					return {
						id: index,
						_id: datum._id,
						title: datum.title,
						content: datum.content
					}
				}) 
			})
		})
		.catch(err => {
			console.log('Error', err);
		});
	}

	render() {
		console.log('---- render running - App');

		return (
			<div>
				<Navbar 
					cardsCount={this.state.cards.length}
				/>
				<CardContainer 
					cards={this.state.cards}
					onResetAll={this.handleResetAll}
					onDelete={this.handleDelete}
					onTextChange={this.handleTextChange}
					onSubmit={this.handleSubmit}
				/>
			</div>
		);
	}

	// arrow function gets the 'this' from context, avoiding need to use .bind
	handleTextChange = (event, card) => {
		console.log('evet', event.target.name, event.target.value);

		const newCards = [...this.state.cards];
		const index = newCards.indexOf(card);
		newCards[index] = {...card};
		newCards[index].content = event.target.value;

		this.setState({
			cards: newCards
		});
	}

	handleResetAll = () => {
		const newCards = this.state.cards.map( card => {
			card.heading = '';
			return card;
		})
	}

	handleSubmit = (event, card) => {
		console.log('---- handleSubmit running - App', card);
		event.preventDefault();
		this.putCardUpdateRequest( card );
	}

	handleDelete = ( card ) => {
		console.log('---- handleDelete running - App', card);

		// Update state
		const newCards = this.state.cards.filter(stateCard => stateCard.id !== card.id)
		this.setState({
			cards: newCards
		})
		
		// Update API
		this.deleteCardUpdateRequest( card );
	}

	putCardUpdateRequest( card ) {
		console.log('---- putCardUpdateRequest card', card);

		let data = JSON.stringify( {
			title: card.title,
			content: card.content 
		})
		console.log('Content', data);

		fetch( `${config.updateDocumentsEndpoint}${card._id}`, {
			method: 'PUT',
			body: data,
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(response => {
			console.log('Response', response);
		})
		.catch(err => {
			console.log('Error', err);
		})
	}

	deleteCardUpdateRequest( card ) {
		console.log('---- deleteCardUpdateRequest card', card);

		fetch( `${config.deleteDocumentsEndpoint}${card._id}`, {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(response => {
			console.log('Response', response);
		})
		.catch(err => {
			console.log('Error', err);
		})
	}
}

export default App;