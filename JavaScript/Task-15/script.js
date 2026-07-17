let arrNumber = [1,5,7,3,6,8,10,22,24,26];
let max = Math.max(...arrNumber);   //To find the maximum number 

console.log("The maximum number is" ,max);

console.log()



let sum = 0; // To find the sum of all elements

for (let i = 0; i < arrNumber.length; i++) {
    sum += arrNumber[i];
}

console.log("The sum is:", sum);



const oddNumbers = arrNumber.filter(num => num % 2 !== 0); //To find the odd number

console.log("Odd numbers:", oddNumbers);


let count = 0; //To count the odd number
for (const num of arrNumber) {
    if (num % 2 !== 0) {
        count++;
    }
}

console.log("The count of odd numbers is:", count);
