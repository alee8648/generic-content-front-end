import React, { Component } from 'react';

// Stateless Functional Component
// Can't use lifecycle hooks like in classes
const Navbar = ({ cardsCount }) => { // object destructuring

	return (
		<div>
			<h1>Navbar - {cardsCount} cards</h1>
		</div>
	);
}

export default Navbar;