// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let scrabbleWord;

function initialPrompt() {
   console.log("Let's play some scrabble!\n")
   scrabbleWord = input.question("Enter a word: ");
   return scrabbleWord;
};

let simpleScore = function(word) {
  let score = 0;
  word = word.toUpperCase();
  for (let i = 0; i < word.length; i++) {
    score += 1;
  }
  return score;
}

let vowelBonusScore = function(word) {
  let score = 0;
  word = word.toUpperCase();
  for (let i = 0; i < word.length; i++) {
    if (word[i] === "A" || word[i] === "E" || word[i] === "I" || word[i] === "O" || word[i] === "U") {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
}

let scrabbleScore = function(word) {
  let score = 0;
  word = word.toLowerCase();
  for (let i = 0; i < word.length; i++) {
    for (item in newPointStructure) {
      if (word[i] === item) {
        score = score + newPointStructure[item];
      }
    }
	  }
	return score;
 }

const scoringAlgorithms = [{
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoreFunction: simpleScore,
},
{
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoreFunction: vowelBonusScore, 
},
{
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scoreFunction: scrabbleScore,
}];

function scorerPrompt() {
  let response = input.question("Which scoring algorithm would you like to use? \nEnter 0 for Simple Score, 1 for Bonus Vowels, or 2 for Scrabble. ");
  if (response === "0") {
   console.log(`Score for "${scrabbleWord}": ${scoringAlgorithms[0].scoreFunction(scrabbleWord)}`);
  } else if (response === "1") {
    console.log(`Score for "${scrabbleWord}": ${scoringAlgorithms[1].scoreFunction(scrabbleWord)}`);
  } else if (response === "2") {
    console.log(`Score for "${scrabbleWord}": ${scoringAlgorithms[2].scoreFunction(scrabbleWord)}`);
  }
}

function transform(obj) {
  let newPoints = {};
  for (item in obj) {
    for (let i = 0; i < obj[item].length; i++) {
     let newItem = obj[item][i];
     newItem = newItem.toLowerCase();
     newPoints[newItem] = Number(item);
    }
  } 
  return newPoints;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

