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
	boardSize:7,
	numShips:3,
	shipsSunk:0,
	shipLength:3,
	ships:[ {location:['06','16','26'], hits:['','','']},
	{location:['24','34','44'], hits:['','','']},
	{location:['10','11','11'], hits:['','','']}	],
	fire: function(guess){
		for (let i=0;i<this.numShips;i++) {
			let ship=this.ships[i];
			let index=ship.location.indexOf(guess);
			debugger
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
	}
}
