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
