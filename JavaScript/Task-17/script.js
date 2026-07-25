function division(a,b) {
    return new Promise((resolve, reject) => {
        if (b == 0) {
            reject("The number can't be divided by zero")
        } else if  ( typeof b !== "number" || typeof a !=="number"  ){
            reject("The input should be a number")
        }
        else{
            resolve(`The result is ${a}/${b} = ${a/b}`)
        }
    })
}

numbers = [
    {a: 20, b:10},
    {a: 200, b:5},
    {a: 330, b:3},
    {a: "or", b:10},
    {a: 200, b:0} //It is for checking zero
]

numbers.forEach(element => {
    division(element.a,element.b)
    .then(message=>{
        console.log(message)
    })
    .catch(error =>{
        console.error(`Error is for a=${element.a}, b= ${element.b}:a${error}`);
        
    })
});