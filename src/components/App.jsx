import React, { Component } from 'react';
import CardContainer from './CardContainer.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
	state = {
		cards: []
	}

	// arrow function gets the 'this' from context, avoiding need to use .bind
	handleTextChange = card => {
		console.log('card', card);
		const newCards = [...this.state.cards];
		const index = newCards.indexOf(card);
		newCards[index] = {...card};
		newCards[index].title = "Reset";

		this.setState({
			cards: newCards
		});
	}


	handleDelete = (cardID) => {
		const newCards = this.state.cards.filter(card => card.id !== cardID)
		this.setState({
			cards: newCards
		})
	}

	handleResetAll = () => {
		const newCards = this.state.cards.map( card => {
			card.heading = '';
			return card;
		})
	}

	render() {
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
				/>
			</div>
		);
	}

	componentDidMount() {
		fetch('http://localhost:3000/documents')
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log('data', data);
			this.setState({ 
				cards: data.map((datum, index) => {
					return {
						id: index,
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
}

export default App;