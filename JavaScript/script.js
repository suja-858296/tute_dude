let P = 1000; 
let r = 0.05; 
let n = 12;   
let t = 5;    

let amount = P * Math.pow((1 + (r / n)), (n * t));
let compoundInterest = amount - P;


console.log("Principal (P): ₹" + P);
console.log("Annual Rate (r): " + (r * 100) + "%");
console.log("Compounds per year (n): " + n);
console.log("Time in years (t): " + t);
console.log("---------------------------------");
console.log("Total Amount (A): ₹" + amount.toFixed(2));
console.log("Interest Earned: ₹" + compoundInterest.toFixed(2));

