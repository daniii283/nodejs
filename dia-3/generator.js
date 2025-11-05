function filter(array,predicate){
    const newArray=[]
    for(const value of array){
        if(predicate(value)){
            newArray.push(value)
        }
    }
    return newArray
}
/*
    1.Problema de memoria 100.000 50000 
    2.Código bloqueante
*/

function* filter(array,predicate){    
    for(const value of array){
        if(predicate(value)){
            yield value
        }
    }    
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
