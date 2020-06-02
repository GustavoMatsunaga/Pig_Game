/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, diceStore, diceStore2;

init();

document.querySelector('.btn-roll').addEventListener('click', function (){

    if (gamePlaying){
            
    // 1. Random number
    var dice  = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    // first dice
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block'
    diceDOM.src = 'dice-' + dice + '.png';

    // second dice
    var diceDOM2 = document.querySelector('.dice2');
    diceDOM2.style.display = 'block'
    diceDOM2.src = 'dice-' + dice2 + '.png';

    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1 && dice2 !== 1) {
        // check if it's the second time it happens  = 12 (6 + 6)
        // if it happens, reset the ENTIRE score
        if (dice === 6 && diceStore === 6 || dice2 === 6 && diceStore2 === 6 ){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        }
        // add score
        roundScore += dice + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore
        diceStore = dice ;
        diceStore2 = dice2;

    } else {
        // next player
        nextPlayer();
    }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying){
    // Add CURENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    // Check if player won the game
    if (scores[activePlayer] >= 100){
        document.querySelector('#name-' + activePlayer).textContent= 'Winner!';
        hideDice();
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {

    // Next player
    nextPlayer();

    }
    }
});


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    // init the dices
    hideDice();
    
    // init the board
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // init the names and game
    document.getElementById('name-0').textContent= 'Player 1';
    document.getElementById('name-1').textContent= 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer(){
            // next player
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            roundScore = 0;
            diceStore = 0;

            // reset the current numbers os the rolls
            document.getElementById('current-0').textContent = '0';
            document.getElementById('current-1').textContent = '0';

            // switch for the next player
            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
    
            // another method
            //document.querySelector('.player-0-panel').classList.remove('active');
            //document.querySelector('.player-1-panel').classList.add('active');
    
            // clean the screen with the dices
            hideDice();
}

function hideDice(){
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}


//document.querySelector('#current-' + activePlayer).textContent = dice; // setter
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent; // getter
//console.log(x);
