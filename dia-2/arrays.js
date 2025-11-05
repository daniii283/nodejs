const a = [1,2,3,4,5,6]

const result = a.filter(v=>v%2===0) //[2,4,6]
a.find(v=>v%2===0) //2
a.map(v=>v*v) [1,4,6,16,25,36]
a.sort()
a.filter(v=>v%2===0).map(v=>v*v).reduce((a,v)=>a+v,100)
//a.filter(v=>v%2===0).map(v=>v*v).reduce((a,v)=>a+v,[])
//a.filter(v=>v%2===0).map(v=>v*v).reduce((a,v)=>a+v,{})
    //suma [1,4,6,16,25,36] + 100
    //100+1*1=101
    //101*1+2*2=a

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

const set = new Set([1,2,3,4,5,4,3]) 
const resultSet = [...set] //[1,2,3,4,5]

//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set

const map = new Map()
map.set('key',10)
map.get('key')

//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Map
//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
