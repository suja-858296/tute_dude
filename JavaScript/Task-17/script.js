 const division = (a,b)=> {
    return new Promise((resolve, reject) => {
        if(typeof a !=='number' || typeof b !=='number'){
            reject(new Error('The input must be a number'));
       }else if (b ==0) {
            reject('Division by zero is not allowed');
        }else{
            resolve(a/b);
        }

    });
 };
 console.log('Result of the divisions');

 const num= [
    {a: 12 ,b:2},
    {a:30 , b:15},
    {a:20 , b:10},
    {a:50 , b:5},
    {a:100 ,b:0},
    {a:"or" , b:2}    
 ];
num.forEach(({a,b})=>{
    division(a,b)
        .then((result)=>{
            console.log(` ${a} / ${b} = ${result}`);
            
        })
        .catch((error)=> {
            console.log(` ${a} / ${b} -> Error: ${error.message}`);
            
            });
            
        });


 



