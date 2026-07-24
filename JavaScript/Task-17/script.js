 const division = (a,b)=> {
    return new Promise((resolve, reject) => {
        if(typeof a !=='number' || typeof b !=='number'){
            reject(new error('The input must be a number'));
       }else if (b ==0) {
            reject('Division by zero is not allowed');
        }else{
            resolve(a/b);
        }

    });
 };
 console.log('--Promise Implementation--');

 const test= [
    {a: 10 ,b:2},
    {a:30 , b:15},
    {a:20 , b:10},
    {a:50 , b:5},
    {a:100 ,b:0}    
 ];
test.forEach(({a,b},index)=>{
    division(a,b)
        .then((result)=>{
            console.log(`Test ${index+1} : ${a} / ${b} = ${result}`);
            
        })
        .catch((error)=> {
            console.log(`Test ${index+1} : ${a} / ${b} -> Error: ${error.message}`);
            
        });
});

 



