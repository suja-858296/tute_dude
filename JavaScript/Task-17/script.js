let num1 = 24;
let num2 = 3;

const division = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (num2 === 0) {
            reject("Zere can't be divided by the first number ");
        } else {
            resolve("Success")
        }
    }, 3000);
});
division
    .then((result) => {
        console.log(num1 / num2)
    })
    .catch((error) => {
        console.error(error)
    });




