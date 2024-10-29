let isStrict = false;
let isActive = false;
const compSequence = [];
let playerSequence = [];
let currentLevel = 1;

const levelDisplay = document.querySelector('.level-count');
const colorButtons = document.querySelectorAll('.simon-btn');
const initButton = document.getElementById("start-btn");
const toggleButton = document.getElementById("power-btn");

function initiateGame() {
    compSequence.length = 0;
    playerSequence.length = 0;
    currentLevel = 1;
    levelDisplay.textContent = currentLevel;
    proceedToNext();
    initButton.disabled = true;
    toggleButton.disabled = false;
}

function proceedToNext() {
    generateSequence();
    showSequence();
}

function generateSequence() {
    compSequence.push(Math.floor(Math.random() * 4) + 1);
}

function showSequence() {
    let index = 0;
    const intervalId = setInterval(() => {
        flashButton(compSequence[index]);
        index++;
        if (index >= compSequence.length) {
            clearInterval(intervalId);
            manageButtons(false);
        }
    }, 1000);
}

function handlePlayerClick(button) {
    const chosenColor = Number(button.getAttribute("data-color"));
    playerSequence.push(chosenColor);
    flashButton(chosenColor);
    if (!verifySequence()) {
        alert(`Помилка! Рівень: ${currentLevel}`);
        isStrict ? initiateGame() : repeatLevel();
    } else if (playerSequence.length === compSequence.length) {
        playerSequence = [];
        levelDisplay.textContent = ++currentLevel;
        currentLevel <= 20 ? setTimeout(proceedToNext, 1000) : alert("Перемога!");
    }
}

function verifySequence() {
    return playerSequence.every((color, i) => color === compSequence[i]);
}

function flashButton(color) {
    const button = document.querySelector(`[data-color="${color}"]`);
    button.style.backgroundColor = getButtonColor(color);
    setTimeout(() => button.style.backgroundColor = "", 300);
}

function getButtonColor(color) {
    return ["darkgreen", "darkred", "yellow", "lightblue"][color - 1];
}

function repeatLevel() {
    playerSequence = [];
    showSequence();
}

function manageButtons(disable) {
    colorButtons.forEach(button => button.disabled = disable);
}

function toggleStrict() {
    isStrict = !isStrict;
}

function toggleGame() {
    isActive = !isActive;
    if (isActive) {
        initiateGame();
        manageButtons(false);
        initButton.disabled = false;
    } else {
        playerSequence = [];
        manageButtons(true);
        initButton.disabled = true;
    }
}

colorButtons.forEach(button => button.onclick = () => handlePlayerClick(button));
toggleButton.onclick = toggleGame;
