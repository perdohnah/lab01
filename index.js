let isStrict = false;
let isActive = false;
const compSequence = []; // послідовність кольорів комп'ютера
let playerSequence = [];
let currentLevel = 1; // поточний рівень гри

const levelDisplay = document.querySelector('.level-count');
const colorButtons = document.querySelectorAll('.simon-btn');
const initButton = document.getElementById("start-btn");
const toggleButton = document.getElementById("power-btn");

function initiateGame() {
    compSequence.length = 0; // очищає комп
    playerSequence.length = 0; // очищає гравця
    currentLevel = 1; // скидає рівень гри
    levelDisplay.textContent = currentLevel; // поточний рівень
    proceedToNext(); // наступний етап гри
    initButton.disabled = true;
    toggleButton.disabled = false;
}

function proceedToNext() {

    generateSequence(); // нова послідовність
    showSequence();
}

function generateSequence() {

    compSequence.push(Math.floor(Math.random() * 4) + 1); // додає новий колір
}

function showSequence() {
    let index = 0;
    const intervalId = setInterval(() => {
        flashButton(compSequence[index]); // підсвічує кнопку
        index++;
        if (index >= compSequence.length) {
            clearInterval(intervalId);
            manageButtons(false); // натискати кнопки
        }
    }, 1000);
}

function handlePlayerClick(button) {
    const chosenColor = Number(button.getAttribute("data-color"));
    playerSequence.push(chosenColor);
    flashButton(chosenColor);
    if (!verifySequence()) { // перевірка на правильність
        alert(`Помилка! Рівень: ${currentLevel}`); // помилився
        isStrict ? initiateGame() : repeatLevel(); //новий рівень/повторює
    } else if (playerSequence.length === compSequence.length) {
        playerSequence = [];
        levelDisplay.textContent = ++currentLevel;
        currentLevel <= 20 ? setTimeout(proceedToNext, 1000) : alert("Перемога!"); // новий рівень/перемога
    }
}

function verifySequence() {
    return playerSequence.every((color, i) => color === compSequence[i]); // перевірка
}

function flashButton(color) {
    const button = document.querySelector(`[data-color="${color}"]`);
    button.style.backgroundColor = getButtonColor(color);
    setTimeout(() => button.style.backgroundColor = "", 400);
}

function getButtonColor(color) {
    return ["darkgreen", "darkred", "yellow", "lightblue"][color - 1]; // підсвітка і повернення
}

function repeatLevel() {
    playerSequence = [];
    showSequence(); // повтор послідовності
}

function manageButtons(disable) {
    colorButtons.forEach(button => button.disabled = disable); // вмк вимк кнопки
}

function toggleStrict() {
    isStrict = !isStrict; // Змінює стан "строгого" режиму
}

function toggleGame() {
    isActive = !isActive;
    if (isActive) {
        initiateGame();
        manageButtons(false);
        initButton.disabled = false;
    } else {
        playerSequence = []; // Очищає послідовність гравця
        manageButtons(true);
        initButton.disabled = true;
    }
}

colorButtons.forEach(button => button.onclick = () => handlePlayerClick(button));
toggleButton.onclick = toggleGame;
