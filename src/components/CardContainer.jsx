import React, {Component} from 'react';
import Card from './Card.jsx';


class CardContainer extends Component {
	render() {
		const { onCreate, cards, onDelete, onTextChange, onSubmit } = this.props;
		return (
			<div>
				<button onClick={() =>onCreate()}>New card</button>
				{cards.map(card => 
				<Card 
					key={card.id}
					onDelete={onDelete}
					onTextChange={onTextChange}
					onSubmit={onSubmit}
					card={card}
					>
					<h4>Card #{card.id}</h4>
				</Card>) }
			</div>
		)
	}
}

export default CardContainer;
