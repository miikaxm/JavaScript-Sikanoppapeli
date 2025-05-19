document.getElementById("btnAloita").addEventListener("click", startGame)

// Yhden nopan pelimuodon nopan heitto
document.getElementById("dice").addEventListener("click", rollDice)

// Kahden nopan pelimuodon nopan heitto
document.getElementById("two-dice-1").addEventListener("click", rollDice2)
document.getElementById("two-dice-2").addEventListener("click", rollDice2)

document.getElementById("btnStopRolling").addEventListener("click", savePoints)
document.getElementById("mode2btnStopRolling").addEventListener("click", savePoints)
document.getElementById("btnRetry").addEventListener("click", restart)

let dices = null
let players = null
let playersIds = []
let listMade = false
let turn = 0
let pointGoal = null
let doublesInRow = 1

function startGame(){

    // Asetetaan pelaaja määrä ja noppa määrä
    players = parseInt(document.getElementById("pelaajienMäärä").value)
    dices = parseInt(document.getElementById("noppaMäärä").value)
    pointGoal = parseInt(document.getElementById("pisteTavoite").value)

    // Tarkistetaan onko pelaaja määrä kahden ja viiden välissä
    if (players < 2 || players > 5) {
        alert("Pelaaja määrä pitää olla 2-5 välissä")
        return
    }

    // Tarkistetaan kuinka monella nopalla pelataan
    if (dices == 1){
        document.getElementById("startScreen").hidden = true;
        document.getElementById("oneDiceArea").hidden = false;
        document.getElementById("pointsArea").hidden = false;
    } else {
        document.getElementById("startScreen").hidden = true;
        document.getElementById("twoDiceArea").hidden = false;
        document.getElementById("pointsArea").hidden = false;

        document.getElementById("currentTurn").setAttribute("id", "EIKÄYTÖSSÄ1")
        document.getElementById("currentScore").setAttribute("id", "EIKÄYTÖSSÄ2")
        document.getElementById("btnStopRolling").setAttribute("id", "EIKÄYTÖSSÄ3")

    }
    addPlayers()
    updatePointsList()
}


function getRandomNumber(){
    // Arvotaan nopan luku
    return Math.floor(Math.random()* 6 + 1)
}

function updatePointsList(){
    // Kasaa listan pelin aluksi jos sitä ei ole vielä kasattu
    if (listMade == false){
        playersIds.forEach(player => {
        const test = document.createElement("h2")
        const newPlayer = document.createTextNode(player.name + ": 0 ");
        test.appendChild(newPlayer)
        test.setAttribute("id", player.name)
        document.getElementById("pointsArea").appendChild(test);
        listMade = true
    });
    // Jos lista on jo kasattu vuorossa olevan pelaajan piste määrä päivitettään
    } else {
        let kohta = document.getElementById("Pelaaja " + (turn + 1))
        kohta.innerText = playersIds[turn].name + ": " + playersIds[turn].savedPoints
    }
}

function addPlayers(){
    // Lisää pelaajat objectina listaan josta löytyy pisteet sekä pelaajan nimi
    let i = 1
    while (i < players+1) {
        let object = {name: "Pelaaja "+i, points: 0, savedPoints: 0}
        playersIds.push(object)
        i += 1
    }
}

function rollDice(){
    // Funktio yhden nopan heitolle
    const rolledNumber = getRandomNumber()
    rolledImage = "img/dice_" + rolledNumber + ".png"
    document.getElementById("dice").setAttribute("src", rolledImage)
    console.log(playersIds[turn])
    // Tarkistaa jos nopan luku ei ole yksi ja tallentaa pisteet pottiin
    if (rolledNumber != 1){
        playersIds[turn].points += rolledNumber
        document.getElementById("currentScore").innerText = "Tämän hetkiset pisteet: " +  playersIds[turn].points
    } else {
        // Jos luku on nolla kierroksen pisteet nollataan ja siirrytään seuraavaan kierrokseen
        playersIds[turn].points = 0
        document.getElementById("currentScore").innerText = "Tämän hetkiset pisteet: " +  playersIds[turn].points
        nextTurn()
    }
}

function savePoints(){
    // Tallentaa pisteet pelaajan saldoon jos pelaaja päättää lopettaa heittämisen
    playersIds[turn].savedPoints += playersIds[turn].points
    playersIds[turn].points = 0
    document.getElementById("currentScore").innerHTML = "Tämän hetkiset pisteet: " +  "0"
    updatePointsList()
    checkWin()
    nextTurn()
}

function nextTurn(){
    // Siirtää vuoron seuraavalle pelaajalle
    if (turn == players-1){
        turn = 0
    } else {
        turn += 1
    }
    document.getElementById("currentTurn").innerText = "Pelaajan vuoro: " + playersIds[turn].name
    updatePointsList()
}

function checkWin(){
    // Tarkistaa onko kukaan pelaajista voittanut peliä, jos on se ilmoitetaan ja peli päättyy.
    playersIds.forEach(players => {
        if (players.savedPoints >= pointGoal){
            if (dices == 1) {
                document.getElementById("oneDiceArea").hidden = true;
                document.getElementById("pointsArea").hidden = true;
                document.getElementById("winScreen").hidden = false;
                document.getElementById("voittajaTeksti").innerText = "Pelin on voittanut " +players.name;
            } else {
                document.getElementById("twoDiceArea").hidden = true;
                document.getElementById("pointsArea").hidden = true;
                document.getElementById("winScreen").hidden = false;
                document.getElementById("voittajaTeksti").innerText = "Pelin on voittanut " +players.name;
            }

        }
    });
}


// Funktiot 2 nopan pelimuodolle
function rollDice2(){
    const rolledNumber1 = getRandomNumber()
    const rolledNumber2 = getRandomNumber()
    rolledImage1 = "img/dice_" + rolledNumber1 + ".png"
    rolledImage2 = "img/dice_" + rolledNumber2 + ".png"
    document.getElementById("two-dice-1").setAttribute("src", rolledImage1)
    document.getElementById("two-dice-2").setAttribute("src", rolledImage2)
    if (rolledNumber1 == 1 && rolledNumber2 == 1) {
        playersIds[turn].points += 25
        document.getElementById("currentScore").innerText = "Tämän hetkiset pisteet: " +  playersIds[turn].points
    } else if (rolledNumber1 == rolledNumber2){
        if (doublesInRow >= 3){
            playersIds[turn].points = 0
            doublesInRow = 1
            document.getElementById("currentScore").innerText = "Tämän hetkiset pisteet: " +  playersIds[turn].points
            nextTurn();
        }
        doublesInRow += 1
        playersIds[turn].points += (rolledNumber1+rolledNumber2)*2
        document.getElementById("currentScore").innerText = "Tämän hetkiset pisteet: " +  playersIds[turn].points
    } else if ((rolledNumber1 == 1 && rolledNumber2 != 1) || (rolledNumber2 == 1 && rolledNumber1 != 1)) {
        // Jos vain toisella nopalla tulee ykkönen niin kierroksen pisteet nollataan ja vuoro vaihtuu
        playersIds[turn].points = 0
        document.getElementById("currentScore").innerText = "Tämän hetkiset pisteet: " +  playersIds[turn].points
        nextTurn();
    } else {
        playersIds[turn].points += rolledNumber1+rolledNumber2
        document.getElementById("currentScore").innerText = "Tämän hetkiset pisteet: " +  playersIds[turn].points
    }
}

function restart(){
    location.reload()
}