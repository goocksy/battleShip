

var setShip = function(i,j,typeShip,direction,mass){
	for (var l = 0; l < typeShip; l++){
		if (direction==1){
			mass[i+l][j]='s';
			if (j>0) mass[i+l][j-1]='z';
			if (j<9) {
				mass[i+l][j+1]='z';
				if (i>0) mass[i-1][j+1]='z';
			}
			if (i>0){
				mass[i-1][j]='z';
				if (j>0) mass[i-1][j-1]='z';
			}
			if (i<10-typeShip){
				mass[i+typeShip][j]='z';
				if (j>0) mass[i+typeShip][j-1]='z';
				if (j<9) mass[i+typeShip][j+1]='z';
			} 
		}else{
			mass[i][j+l]='s';
			if(i>0){
				mass[i-1][j+l]='z';
			}
			if (i<9){
				mass[i+1][j+l]='z';
			}
			if (j==0){
				mass[i][j+typeShip]='z';
				if (i<9) mass[i+1][j+typeShip]='z'
				if (i>0) mass[i-1][j+typeShip]='z'
			}
			if (j>0){
				mass[i][j-1]='z';
				if(i>0) mass[i-1][j-1]='z';				
				if(i<9) mass[i+1][j-1]='z';
				if (j<9){
					mass[i][j+typeShip]='z';
					if (i>0) mass[i-1][j+typeShip]='z';
					if (i<9) mass[i+1][j+typeShip]='z';

				}
			}
		}
	}
}

var genShipsArrangement = function(mass,ts){
	var set = false;
	var	typeShip = ts;
	while (!set){
		var i = parseInt(Math.random() * 10);
		var j = parseInt(Math.random() * 10);
		var direction = parseInt(Math.random() * 2);
		
		console.log(i)
		var rj = j+typeShip;
		var ri = i+typeShip;
		
		if (direction == 1 & i+typeShip<11 & mass[i][j]=='w'){
			if (ri>9){
				continue;
			}else
				if(mass[ri][j]=='w') {
				set = true;
				setShip(i,j,typeShip,direction,mass)
			}
		}
		if (direction == 0 & j+typeShip<11 & mass[i][j]=='w'){	
			if (rj>9){
				continue;
			}else
				if (mass[i][rj]=='w'){
					set = true;
					setShip(i,j,typeShip,direction,mass)
				}
		}
	}
}

function init(){
	var width = 10, height = 10;
	
	player = document.querySelector('.js-player')
 	
 	// матрица поля
 	var playerMap = new Array();
	for (var i=0;i<width;i++){
		playerMap[i] = new Array();
		for (var	j=0;j<height;j++){
			playerMap[i][j] = 'w'
		}
	}

	genShipsArrangement(playerMap,4)
	genShipsArrangement(playerMap,3)
	genShipsArrangement(playerMap,3)
	genShipsArrangement(playerMap,2)
	genShipsArrangement(playerMap,2)
	genShipsArrangement(playerMap,2)
	genShipsArrangement(playerMap,1)
	genShipsArrangement(playerMap,1)
	genShipsArrangement(playerMap,1)
	genShipsArrangement(playerMap,1)
	console.log(playerMap)

	for (var i=0;i<width;i++){
		for (var j=0;j<height;j++){

			z=document.createElement('div')
			z.className = playerMap[i][j]
			z.setAttribute("i", i)
			z.setAttribute("j", j)
			player.appendChild(z)
		}
	}
//

};
window.addEventListener("DOMContentLoaded", init);																												 