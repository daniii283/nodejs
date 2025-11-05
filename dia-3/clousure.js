/*
    Es una funcion que devuelve otra funcion
    function sum(a){
        return function(b){
            debugger
            return a+b
        }
    }

    Como obtendría el 8 sumando el 5 y el 3
    sum(3)(5)
    Como puedo crear una instancia de un objeto que tiene como 
    atributo privado el valor 5
    const result = sum(5)

    result(100) //105
    result(30) //35
*/

//singal

function signal(initialValue){  //constructor
    let value = initialValue //atributo
    const getter = ()=>value //getter
    getter.set = (newValue)=>{ //setter
        debugger
        if(!Object.is(value,newValue)){
            console.log(`òldValue: ${value} newValue:${newValue}`)
            value=newValue
        }
    }
    return Object.freeze(getter)
}

/*
 <div>{{signal()}}</div>
*/

function events(node,event,callback){
    node.addEventListener(event,callback)
    return ()=>node.removeEventListener(event,callback)
}