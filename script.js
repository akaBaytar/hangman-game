//dom variables
const buttonDOM = document.querySelector("#play");
const popupDOM = document.querySelector(".popup");
const notificationDOM = document.querySelector(".notification");
const popupMessageDOM = document.querySelector(".popup-title");
const popupDescriptionDOM = document.querySelector(".popup-description");
const wordDOM = document.querySelector(".word");
const wrongLetterDOM = document.querySelector("#wrong-letters");

const figureParts = document.querySelectorAll(".figure-part");

//variables
let animalNames = [
  "horse",
  "lion",
  "cat",
  "sheep",
  "dog",
  "deer",
  "cow",
  "rabbit",
  "elephant",
  "bear",
  "fox",
  "giraffe",
  "monkey",
  "goat",
  "kangaroo",
  "hen",
  "wolf",
  "pig",
  "camel",
  "tiger",
  "mouse",
  "duck",
  "doney",
  "leopard",
  "squirrel",
  "cheetah",
  "zebra",
  "turtle",
  "frog",
  "fish",
  "bat",
  "koala",
  "lizard",
  "jaguar",
  "iguana",
  "elk",
  "swan",
  "peacock",
  "lemur",
  "snake",
  "lynx",
  "meerkat",
  "otter",
  "llama",
  "orangutan",
  "antelope",
];

let correctLetters = [];
let wrongLetters = [];
let randomAnimalName =
  animalNames[Math.floor(Math.random() * animalNames.length)];

//functions
function showName() {
  wordDOM.innerHTML = `
    ${randomAnimalName
      .split("")
      .map(
        (letter) => `
            <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
            </span>
        `
      )
      .join("")}`;

  const innerName = wordDOM.innerText.replace(/\n/g, "");
  if (innerName === randomAnimalName) {
    popupMessageDOM.innerText = "Congratulations, you won!";
    popupDOM.style.display = "flex";
  }
}

function updareWrongLettersDOM() {
  wrongLetterDOM.innerHTML = `
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  figureParts.forEach((part, index) => {
    const error = wrongLetters.length;
    if (index < error) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters.length === figureParts.length) {
    popupMessageDOM.innerText = "Unfortunately you lost.";
    popupDescriptionDOM.innerText = `Answer: ${randomAnimalName}`;
    popupDOM.style.display = "flex";
  }
}

function showNotification() {
  notificationDOM.classList.add("show");

  setTimeout(() => {
    notificationDOM.classList.remove("show");
  }, 1500);
}

//event listeners
window.addEventListener("keydown", (e) => {
  if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode == 222) {
    const letter = e.key;
    if (randomAnimalName.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        showName();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updareWrongLettersDOM();
      } else {
        showNotification();
      }
    }
  }
});

buttonDOM.addEventListener("click", (e) => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  randomAnimalName =
    animalNames[Math.floor(Math.random() * animalNames.length)];
  showName();
  updareWrongLettersDOM();
  popupDOM.style.display = "none";
});

//function call
showName();
