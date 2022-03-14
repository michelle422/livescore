/**
 * 
 */
 
const homeMap = new Map([
	["Mexico", 0], 
	["Spain", 0],
	["Germany", 0], 
	["Uruguay", 0], 
	["Argentina", 0], 
	["Belgium", 0]
]);
const awayMap = new Map([
	["Canada", 0], 
	["Brazil", 0], 
	["France", 0], 
	["Italy", 0], 
	["Australia", 0], 
	["Norway", 0]
]);
const gamesArray = [];
	
function readHomeAndAway() {
	var homeTeam = "";
	var awayTeam = "";
	var homeScore = 0;
	var awayScore = 0;
	var homeIndex = 0;
	var awayIndex = 0;
	var numGames = 0;

	homeMap.forEach(function(value, key) {
		homeIndex++;
		if (value === 0) {
			homeTeam = key;
			homeScore = value;
		}
	})
	
	awayMap.forEach(function(value, key) {
		awayIndex++;
		if (value === 0) {
			awayTeam = key;
			awayScore = value;
		}
	})
	
	if (homeIndex === awayIndex) {
		document.getElementById("hometeam").innerHTML = homeTeam;
		document.getElementById("awayteam").innerHTML = awayTeam;		
		document.getElementById("homescore").innerHTML = homeScore;
		document.getElementById("awayscore").innerHTML = awayScore;
		numGames++;
	}

}
	
function updateScores() {
	var random = Math.floor(Math.random() * 3);
	var home = document.getElementById("homescore").innerHTML;
	var away = document.getElementById("awayscore").innerHTML;
	
	console.log(home);
	
	var homeScore = parseInt(home) + random;
	console.log(homeScore);
	
	document.getElementById("homescore").innerHTML = homeScore;
	random = Math.floor(Math.random() * 3);
	
	var awayScore = parseInt(away) + random;
	console.log(awayScore);
	document.getElementById("awayscore").innerHTML = awayScore;
}
   
function startGame(idName) {
	var x = document.getElementById(idName);
	readHomeAndAway();

	var home = document.getElementById("hometeam").innerHTML;
	var away = document.getElementById("awayteam").innerHTML;
	if (x.style.display === "none" && home != "" && away != "") {
		x.style.display = "block";
	} 
}
   
function finishGame(idName) {
	var x = document.getElementById(idName);
	var homeTeam = document.getElementById("hometeam").innerHTML;
	var homeScore = document.getElementById("homescore").innerHTML;
	var awayTeam = document.getElementById("awayteam").innerHTML;
	var awayScore = document.getElementById("awayscore").innerHTML;
	const homeScoresArr = [];
	const awayScoresArr = [];
	const homeTeamsArr = [];
	const awayTeamsArr = [];
	const totalScoresArr = [];
	
	homeMap.set(homeTeam, homeScore);
	homeMap.forEach(function(value, key) {
		console.log(key + " = " + value);
	});
			
	awayMap.set(awayTeam, awayScore);
	awayMap.forEach(function(value, key) {
		console.log(key + " = " + value);
	});
			
// 	gamesMap.set(parseInt(homeScore) + parseInt(awayScore), homeTeam + " - " + awayTeam + ": " + homeScore + " - " + awayScore);
// 	gamesMap.forEach(function(value, key) {
// 		console.log("Summary: " + key + ": " + value);
// 	});

	var ctr = 0;
	for (var [key, value] of homeMap) {
		homeTeamsArr[ctr] = key;
		homeScoresArr[ctr] = parseInt(value);
		ctr++;
	}
	
	ctr = 0;
	for (var [key, value] of awayMap) {
		awayTeamsArr[ctr] = key;
		awayScoresArr[ctr] = parseInt(value);
		ctr++;
	}
	
	for (let i = 0; i < homeScoresArr.length && i < awayScoresArr.length; i++) {
		totalScoresArr[i] = homeScoresArr[i] + awayScoresArr[i];
	}
	
	for (let i = 0; i < totalScoresArr.length; i++) {
		if (homeTeamsArr[i] != "" && awayTeamsArr[i] != "") {
			gamesArray[i] = totalScoresArr[i] + " | " + homeTeamsArr[i] + " - " + awayTeamsArr[i] + " | " + 
				homeScoresArr[i] + " - " + awayScoresArr[i];
			console.log("Score: " + gamesArray[i]);
		}
	}
				
	if (x.style.display === "block") {
		x.style.display = "none";
	}
}
	    
function summaryOfGames(idName) {
	var gameParts = [];
	
	gamesArray.sort(function(a, b){
		gameParts = a.split(" | ");
		var indexA = parseInt(gameParts[0]);
		gameParts = b.split(" | ");
		var indexB = parseInt(gameParts[0]);
		return indexB - indexA;
	});

	const tbl = document.getElementById(idName);
//	tbl.setAttribute("id", "summary");
//	tbl.style.width = "60%";
//	tbl.style.display = "none";

	if (tbl.childElementCount > 0) {
		while (tbl.lastChild) {
			tbl.removeChild(tbl.lastChild);
		}
	}
	
	for (let i = 0; i < gamesArray.length; i++) {
		console.log(gamesArray[i]);
		gameParts = gamesArray[i].split(" | ");
		
		const tr = document.createElement("tr");
		for (let j = 1; j < gameParts.length; j++) {
			const td = document.createElement("td");
			if (j === 1 && gameParts[j] != " - ") {
				td.setAttribute("id", "teams");
				td.appendChild(document.createTextNode(gameParts[j] + " : "));
			}
			if (j === 2) {
				td.setAttribute("id", "scores");
				td.appendChild(document.createTextNode(gameParts[j]));
			}
			tr.appendChild(td);
		}
		
		tbl.appendChild(tr);
//		document.getElementById("teams").innerHTML = gameParts[1];
//		document.getElementById("scores").innerHTML = gameParts[2];
	}
//	} 
	/*else {
		var trows = tbl.getElementsByTagName("tr");
		for (let i = 0; i < gamesArray.length; i++) {
			console.log(gamesArray[i]);
			gameParts = gamesArray[i].split(" | ");
			
			var tcells = tbl.getElementsByTagName("td");
			for (let j = 1; j < gameParts.length; j++) {
				if (j === 1) {
					tcells[j].getElementById("teams").innerHTML = gameParts[j] + " : ";
//					tcells.appendChild(document.createTextNode(gameParts[j] + " : "));
				}
				if (j === 2) {
					tcells[j].getElementById("scores").innerHTML = gameParts[j];
//					tcells.appendChild(document.createTextNode(gameParts[j]));
				}
			}
				
		}
	}*/
	
//	var x = document.getElementById(idName);

	if (tbl.style.display === "none") {
		tbl.style.display = "block";
	} 
}



