// JavaScript Document
// console.log("howdy");


//GRAPJES API: cursus les mee gedaan en bron gebruikt


//beginnen: met het ophalen van selecteren in de HTML
// var van gemaakt omdat die (denk ik +-) variable moet zijn niet constant, voor het keydown event
var button = document.querySelector(".container button");
const jokeDiv = document.querySelector(".container .joke p");

//Voor de API
document.addEventListener("DOMContentLoaded", getJock);

// luisteren naar de click en functie uitvoeren getJock (grapje ophalen)
button.addEventListener("click", getJock);

// Om de key te laten werken zonder tab, moet de body geheel geselecteerd worden
//daarna moet die luisteren naar de gekozen key moet je de key benoemen of metkeyCode
//en daarmee (de key) moet de functie opgehaald worden die geschreven is aka joke ophalen
var button = document.querySelector("body");
button.addEventListener("keydown", function(event) {
  if (event.keyCode == '78') { //keycode voor N kan ook gewoon .eventkey == 'n' :p
    getJock();
  }
});

// async function om API op de halen
// zou iets met een nieuwe funtie en setTimeout kunnen doen, zodat fetch vervangen wordt met bv 2s ophalen
// maar wegens wat tijd tekort toch wat te lastig om uit te pluizen
async function getJock() {
  const jokeData = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json"
    }
  });
  const jokeObj = await jokeData.json();
  jokeDiv.innerHTML = jokeObj.joke;



  // FAVORIET KNOPJE EN TOEVOEGEN FAVO LIJST:


  // 1e deel disbablen van het hartje na een keer klikken
  var deHartjesButton = document.querySelector("button.hartje");
  deHartjesButton.disabled = false;
}

// De favo button uit de HTML krijgen
var favorietenKnopje = document.querySelector("button.hartje");

// Hij moet luisteren naar de click
favorietenKnopje.addEventListener("click", voegFavorietToe);

// Of luisteren naar het toetsenbord - key f
var deHartjesButton = document.querySelector("body");
deHartjesButton.addEventListener("keydown", function(event) {
  if (event.key == 'f') {
    voegFavorietToe();
  }
});

//Functie schrijven voor het favo knopje, hij moet de mop toevoegen aan de UL
function voegFavorietToe(event) {
  const deMop = document.querySelector(".joke p");
  var clnMop = deMop.cloneNode(true);
  const ul = document.querySelector(".boven ul");

  // Voor de teller: eerst in de HTML vinden
  const teller = document.querySelector(".boven span");
  //Daarna huidige aantal +1 wannneer favo toegevoegd (in HTML staat span op 0 dit is de begin waarde)
  var huidigAantal = parseInt(teller.textContent);
  var nieuweAantal = huidigAantal + 1;

  teller.textContent = nieuweAantal;


  // Vind de button die is aangemaakt voor het verwijderen van de joke
  var button = document.createElement("button");
  // geef de button context aka een tekst of iets bv X
  button.textContent = "Delete this joke";
  //om de favo te verwijderen moet die luisteren naar een click
  button.addEventListener("click", verwijderFavoriet);

  // maakt de li aan met het mopje voor in de UL
  var li = document.createElement("li");
  li.appendChild(clnMop);
  li.appendChild(button);
  ul.appendChild(li);


  // 2e deel disbablen van het hartje na een keer klikken
  var deHartjesButton = event.target;
  deHartjesButton.disabled = true;
}

//Favo verwijderen uit de lijst
function verwijderFavoriet(event) {
  var deButton = event.target;
  var deMop = deButton.closest("li");
  deMop.remove();

  //..en dus ook weer afhalen van de teller met -1
  const teller = document.querySelector(".boven span");
  var huidigAantal = parseInt(teller.textContent);
  var nieuweAantal = huidigAantal - 1;
  teller.textContent = nieuweAantal;
}


//THEMA SWITCH KNOPJE, met behulp van Sam voor het fiksen
// dat toggle en instellingen samen gaan


// 1. Checkbox ff aanroepen in HTML:
var themaSwitch = document.querySelector('.switch input[type="checkbox"]');

// 2. functie schrijven, if-else statement:
function switchThema(iemandKlikt) {
  if (iemandKlikt.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme')
    localStorage.setItem('theme', 'light');
  }
}


//luister naar @media van dark mode in JavaScript (Sams werk)
window.matchMedia("(prefers-color-scheme: dark)").addListener(
  e => e.matches && activateDarkMode() // listener to dark scheme
);

//activeer dark mode
function activateDarkMode() {
  document.documentElement.setAttribute('data-theme', 'dark');
  themaSwitch.checked = true;
}

//luister naar @media van light mode in JavaScript (Sams werk)
window.matchMedia("(prefers-color-scheme: light)").addListener(
  e => e.matches && activateLightMode() // listener to dark scheme
);

//verwijder dark mode
function activateLightMode() {
  document.documentElement.removeAttribute('data-theme', 'dark');
  themaSwitch.checked = false;
}


// 3. Laten luisteren naar de verandering wanneer toggle gebruikt wordt
themaSwitch.addEventListener('change', switchThema, false);


// 4. Dit stukje heb ik van internet, zorgt er voor dat de setting (dark of light)
// wordt bewaard ookal wordt de site bv. refresht
const themaNu = localStorage.getItem('theme');

if (themaNu) {
  document.documentElement.setAttribute('data-theme', themaNu);

  if (themaNu === 'dark') {
    themaSwitch.checked = true;
  }
}
