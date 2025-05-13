document.getElementById("kuva-1").addEventListener("click", heitaNoppa1)
// document.getElementById("kuva-2").addEventListener("click", heitaNoppa2)
document.getElementById("btnAmount").addEventListener("click", Asetamaara)
document.getElementById("btnNames").addEventListener("click", lisaaPelaaja)

let pelaajaNimet = []
let pelaajaMaara = null

function Asetamaara(event){
    event.preventDefault();
    pelaajaMaara = document.getElementById("playerAmount").value
    console.log("Pelaaja määrä on nyt: " + pelaajaMaara)
}

function lisaaPelaaja(event){
    event.preventDefault();
    if (pelaajaNimet.length >= pelaajaMaara) {
        console.log("Et voi lisätä enempää kuin valitsemasi pelaaja määrä")
        return
    }
    let nimi = document.getElementById("PlayerNames").value
    pelaajaNimet.push(nimi)
    console.log("Lisättiin pelaajiin:" + " " + nimi)

    const uusiPelaaja = document.createTextNode(nimi + ": 0 ");
    const br = document.createElement("br");
    document.getElementById("pisteet").appendChild(uusiPelaaja);
    document.getElementById("pisteet").appendChild(br);
}

function heitaNoppa1(){
    firstRandomNumber = Math.floor(Math.random()* 6 + 1)
    firstImage = "img/dice_" + firstRandomNumber + ".png"
    document.getElementById("kuva-1").setAttribute("src", firstImage)
}

function heitaNoppa2(){
    secondRandomNumber = Math.floor(Math.random()* 6 + 1)
    secondImage = "img/dice_" + secondRandomNumber + ".png"
    document.getElementById("kuva-2").setAttribute("src", secondImage)
}