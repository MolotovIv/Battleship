let view= {
	displayMassege: function (msg) {
		let messageArea= document.getElementById('messageArea')
		messageArea.innerHTML=msg
	},
	displayHit: function(location) {
		let hitArea=document.getElementById(location).className+="hit"
	},
	displayMiss: function(location) {
		let missArea=document.getElementById(location).className+="miss"
	}
}

let model= {
	boardSize:6,
	numShips:3,
	shipsSunk:0,
	shipLength:3,
	ships:[ {locations:['00','00','00'], hits:['','','']},
	{locations:['00','00','00'], hits:['','','']},
	{locations:['00','00','00'], hits:['','','']}	],
	fire: function(guess){
		for (let i=0;i<this.numShips;i++) {
			let ship=this.ships[i];
			let index=ship.locations.indexOf(guess);

			if (index>=0) {
				ship.hits[index]='hit'
				view.displayMassege('HIT!');
				view.displayHit(guess);
				if (this.isSunk(ship)) {
					view.displayMassege('You sunk my battleship')
					this.shipsSunk++;
				}
				return true
			}
		}
		view.displayMassege('You missed');
		view.displayMiss(guess);
		return false
	},
	isSunk: function(ship) {
		for (let i=0;i<this.shipLength;i++) {
			if (ship.hits[i]!=='hit') {
				return false;
			}
		}
		return true
	},
	generateshipLocation: function() {
		let locations;
		for(let i=0;i<this.numShips;i++) {
			do {
				locations=this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations=locations;
		}
	},
	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},
	collision : function(locations) {
		for (let i = 0; i <this.numShips ; i++) {
			var ship=model.ships[i];
			for( let j=0;j<locations.length;j++) {
				if (ship.locations.indexOf(locations[j])>=0) {
					return true;
				}
			}
		}
		return false
	}

}

let controller= {
	gusses: 0,
	processGuess: function(guess){
		let location =parseGuess(guess);
		if (location) {
			this.gusses++;
			let hit= model.fire(location)
			if (hit && model.shipsSunk===model.numShips) {
				view.displayMassege('You sank all my battleships,in '+ this.gusses+'gusses')
				alert ('Game Over')
			}
		}

	}
}
function parseGuess(guess) {
	let alphabet=['A','B','C','D','E','F','G']
	if(guess===null|| guess.length!==2) {
		alert ('Ooops,please  enter a letter and a number on the board');
	}else {
		firstChar=guess.charAt(0);
		var row=alphabet.indexOf(firstChar)
		let column=guess.charAt(1);
		if (isNaN(row)|| isNaN(column)) {
			alert('Ooops, that is not on the board.') 
		} else if (row<0|| row>model.boardSize|| column<0||column>model.boardSize) {
			alert('Ooops that is off the board!');
		}else {
			return row+column;

		}
		return null
	}
}


function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value.toUpperCase();

	controller.processGuess(guess);

	guessInput.value = "";
}


function handleKeyPress(e) {
	let fireButton=document.getElementById('fireButton');
	if( e.keyCode===13) {
		fireButton.click();
		return false
	}

}

window.onload=init;


function init() {
	var fireButton=document.getElementById('fireButton');
	fireButton.onclick=handleFireButton;
	let guessInput=document.getElementById('guessInput')
	guessInput.onkeypress=handleKeyPress;

	model.generateshipLocation();
}




