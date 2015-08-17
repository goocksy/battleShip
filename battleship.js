//
var checkDecks = function(element){
	var currentI = element.getAttribute('i');
	var currentJ = element.getAttribute('j');
	var currentClass = element.getAttribute('class');
	var decks = document.getElementsByClassName(currentClass);
	for (var i = 0; i < decks.length; i++){
		//console.log("i="+decks.item(i).getAttribute('i')+"|| j="+decks.item(i).getAttribute('j'))
	}
}
/*Ответный огонь*/
var fireReturn = function(){
	var i = parseInt(Math.random() * 10);
	var j = parseInt(Math.random() * 10);
	var z = document.getElementById(i+""+j);
	console.log('computer shooting')
	if (playerMap[i][j]=='s1' || playerMap[i][j]=='s2' || playerMap[i][j]=='s3' || playerMap[i][j]=='s4'){
		z.className = 'dmg';
		playerMap[i][j]='dmg';
		enemyScore+=1;
		fireReturn();
	}else if(playerMap[i][j]=='miss'){
		fireReturn()
	}else{
		playerMap[i][j]='miss';
		z.className='miss';
	}	
	console.log("PCScore="+enemyScore);
}

function fire(element){
	if (element.className=="s1e" || element.className=="s2e" || element.className=="s3e"||element.className=="s4e"){
		element.setAttribute("class","dmg");
		console.log("shot on the target!");
		playerScore+=1;
	} else if (element.className=='dmg'){
		alert('ti uje tuda bil')
	}else if(element.className=='miss'){
		alert('ti uje tuda bil');
	}else{
		element.className='miss';
		fireReturn();
	}
	console.log("playerScore="+playerScore);
}

var setShip = function(i,j,typeShip,direction,mass,pl){
	var p = pl;
	for (var l = 0; l < typeShip; l++){
		if (direction==1){
			p==1?mass[i+l][j]="s"+typeShip:mass[i+l][j]="s"+typeShip+"e";
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
			p==1?mass[i][j+l]="s"+typeShip:mass[i][j+l]="s"+typeShip+"e";
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

var genShipsArrangement = function(mass,ts,playr){
	var set = false;
	var p = playr;
	var	typeShip = ts;
	while (!set){
		var i = parseInt(Math.random() * 10);
		var j = parseInt(Math.random() * 10);
		var direction = parseInt(Math.random() * 2);
		
		
		var rj = j+typeShip;
		var ri = i+typeShip;
		
		if (direction == 1 & ri<11 & mass[i][j]=='w'){
			if (ri>9){
				continue;
			}else
				if(mass[ri][j]=='w') {
				set = true;
				setShip(i,j,typeShip,direction,mass,p) 
			}
		}
		if (direction == 0 & rj<11 & mass[i][j]=='w'){	
			if (rj>9){
				continue;
			}else
				if (mass[i][rj]=='w'){
					set = true;
					setShip(i,j,typeShip,direction,mass,p)
				}
		}
	}
}

function init(){
	var width = 10, height = 10;
	playerScore = 0;
	enemyScore = 0;
	player = document.querySelector('.js-player')
	enemy = document.querySelector('.js-enemy')
 	
 	 playerMap = new Array();
 	 enemyMap = new Array();

	for (var i=0;i<width;i++){
		playerMap[i] = new Array();
		enemyMap[i] = new Array();
		for (var	j=0;j<height;j++){
			playerMap[i][j] = 'w'
			enemyMap[i][j] = 'w'
		}
	}
	var score = 0;
	genShipsArrangement(playerMap,4,1)
	genShipsArrangement(playerMap,3,1)
	genShipsArrangement(playerMap,3,1)
	genShipsArrangement(playerMap,2,1)
	genShipsArrangement(playerMap,2,1)
	genShipsArrangement(playerMap,2,1)
	genShipsArrangement(playerMap,1,1)
	genShipsArrangement(playerMap,1,1)
	genShipsArrangement(playerMap,1,1)
	genShipsArrangement(playerMap,1,1)

	genShipsArrangement(enemyMap,4,2)
	genShipsArrangement(enemyMap,3,2)
	genShipsArrangement(enemyMap,3,2)
	genShipsArrangement(enemyMap,2,2)
	genShipsArrangement(enemyMap,2,2)
	genShipsArrangement(enemyMap,2,2)
	genShipsArrangement(enemyMap,1,2)
	genShipsArrangement(enemyMap,1,2)
	genShipsArrangement(enemyMap,1,2)
	genShipsArrangement(enemyMap,1,2)

	for (var i=0;i<width;i++){
		for (var j=0;j<height;j++){

			z=document.createElement('div')
			e=document.createElement('div')
			z.className = playerMap[i][j]
			e.className = enemyMap[i][j]
			z.id=i+""+j;
			z.setAttribute("i", i)
			z.setAttribute("j", j)
			e.setAttribute("i", i)
			e.setAttribute("j", j)
			e.setAttribute("onclick","fire(this)")
			player.appendChild(z)
			enemy.appendChild(e)
		}
	}
};
window.addEventListener("DOMContentLoaded", init);