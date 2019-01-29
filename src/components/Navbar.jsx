import React, { Component } from 'react';

// Stateless Functional Component
const Navbar = ({ cardsCount }) => { // object destructuring

	return (
		<div>
			<h1>Navbar - {cardsCount} cards</h1>
		</div>
	);
}

export default Navbar;