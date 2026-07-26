// For the colors of the box
const redBox = document.querySelector('.red')
const greenBox = document.querySelector('.green')
const yellowBox = document.querySelector('.yellow')
const blueBox = document.querySelector('.blue')

redBox.addEventListener('click', function () {
    this.classList.toggle('active');
});

greenBox.addEventListener('click', function () {
    this.classList.toggle('active');
});

yellowBox.addEventListener('click', function () {
    this.classList.toggle('active');
});

blueBox.addEventListener('click', function () {
    this.classList.toggle('active');
});

// For the greetings
const greetingText = document.getElementById("greeting-text");
const nameInput = document.getElementById("name-input");
const greetBtn = document.getElementById("greet-button");

greetBtn.addEventListener('click', function () {
    const typedName = nameInput.value;
    if (typedName !== "")
        greetingText.textContent = "Hello  " + typedName;
    else {
        greetingText.textContent = "Hello";
    }
})

