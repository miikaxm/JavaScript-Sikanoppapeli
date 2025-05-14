document.getElementById("btnAloita").addEventListener("click", startGame)
document.getElementById("dice").addEventListener("click", rollDice)

let dices = null
let players = null
let playersIds = []
let listMade = false
let turn = 0

function startGame(){
    players = parseInt(document.getElementById("pelaajienMäärä").value)
    dices = parseInt(document.getElementById("noppaMäärä").value)
    if (dices == 1){
        document.getElementById("startScreen").hidden = true;
        document.getElementById("oneDiceArea").hidden = false;
        document.getElementById("pointsArea").hidden = false;
    } else {
        document.getElementById("startScreen").hidden = true;
        document.getElementById("twoDiceArea").hidden = false;
        document.getElementById("pointsArea").hidden = false;
    }
    addPlayers()
    updatePointsList()
}

function getRandomNumber(){
    return Math.floor(Math.random()* 6 + 1)
}

function updatePointsList(){
    if (listMade == false){
        playersIds.forEach(player => {
        const test = document.createElement("h2")
        const newPlayer = document.createTextNode(player.name + ": 0 ");
        test.appendChild(newPlayer)
        test.setAttribute("id", player.name)
        document.getElementById("pointsArea").appendChild(test);
        listMade = true
    });
    } else {
        let kohta = document.getElementById("Pelaaja " + (turn + 1))
        kohta.innerText = playersIds[turn].name + ": " + playersIds[turn].savedPoints
    }
}

function addPlayers(){
    let i = 1
    while (i < players+1) {
        let object = {name: "Pelaaja "+i, points: 0, savedPoints: 0}
        playersIds.push(object)
        i += 1
    }
}

function rollDice(){
    const rolledNumber = getRandomNumber()
    rolledImage = "img/dice_" + rolledNumber + ".png"
    document.getElementById("dice").setAttribute("src", rolledImage)
    console.log(playersIds[turn])
    if (rolledNumber != 1){
        playersIds[turn].points += rolledNumber
        document.getElementById("currentScore").innerText = "Tämän hetkiset pisteet: " +  playersIds[turn].points
        document.getElementById("btnStopRolling").addEventListener("click", savePoints)
    } else {
        playersIds[turn].points = 0
        document.getElementById("currentScore").innerText = "Tämän hetkiset pisteet: " +  playersIds[turn].points
        nextTurn()
    }
}

function savePoints(){
    playersIds[turn].savedPoints += playersIds[turn].points
    playersIds[turn].points = 0
    document.getElementById("currentScore").innerHTML = "Tämän hetkiset pisteet: " +  "0"
    updatePointsList()
    checkWin()
    nextTurn()
}

function nextTurn(){
    if (turn == players-1){
        turn = 0
    } else {
        turn += 1
    }
    document.getElementById("currentTurn").innerText = "Pelaajan vuoro: " + playersIds[turn].name
    updatePointsList()
}

function checkWin(){
    playersIds.forEach(players => {
        if (players.savedPoints >= 100){
            document.getElementById("oneDiceArea").hidden = true;
            document.getElementById("pointsArea").hidden = true;
            document.getElementById("winScreen").hidden = false;
            document.getElementById("voittajaTeksti").innerText = "Pelin on voittanut " +players.name;
        }
    });
}