// Variables
let i = 153
let sum = 0
for (n = 0; n <= i; n++) {
    sum += n;
    console.log(n);

}
console.log(`The Sum of the numbers are ${sum}`);
console.log(`The Table of ${i} is`);
// Table for i.
for (n = 0; n <= 10; n++) {
    multiply = i * n
    console.log(`${i}*${n} =${multiply}`);
}
if (i <= 1) {
    console.log(`${i} is not a prime number`);
} else if (i === 2 || i === 3 || i === 5 || i === 7) {
    console.log(`${i} is a prime number`);
} else if (i % 2 === 0 || i % 3 === 0 || i % 5 === 0 || i % 7 === 0) {
    console.log(`${i} is not a prime number`);
} else {
    console.log(`${i} is a prime number`);
}

console.log(`The fators of ${i} are`)
for (let j = 1; j <= i; j++) 
    if (i % j === 0) {
        console.log(j);
    
}

let numForDigits = i;
let digitSum = 0;
let temp = i;

while (temp > 0) {
    digitSum += temp % 10;
    temp = Math.floor(temp / 10);
}
console.log(`The sum of digits of ${i} is ${digitSum}`);

let numForArmstrong = i;
let armSum = 0;
let tempArm = i;

while (tempArm > 0) {
    let digit = tempArm % 10;
    armSum += (digit * digit * digit);
    tempArm = Math.floor(tempArm / 10);
}

if (armSum === numForArmstrong) {
    console.log(`${i} is an Armstrong number.`);
} else {
    console.log(`${i} is not an Armstrong number.`);
}










