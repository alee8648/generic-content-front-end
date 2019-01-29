import React, {Component} from 'react';
import Card from './Card.jsx';


class CardContainer extends Component {
	render() {
		const { onResetAll, cards, onDelete, onTextChange } = this.props;
		return (
			<div>
				<button onClick={() =>onResetAll()}>Reset</button>
				{cards.map(card => 
				<Card 
					key={card.id}
					onDelete={onDelete}
					onTextChange={onTextChange}
					card={card}
					>
					<h4>Card #{card.id}</h4>
				</Card>) }
			</div>
		)
	}
}

export default CardContainer;
