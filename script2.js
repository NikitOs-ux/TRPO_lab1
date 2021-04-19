let a = 5, b =17;
function sum(a,b){
    return a + b;
}

function myltiply(a,b){
    return a*b;
}

class matrix{
    constructor(name, operation){
        this.name = name;
        this.operation = operation;
        this.sayHi();
    }
    sayHi(){
        alert(this.name + '\n' + this.operation)
    }
}
class vectors{
    constructor(name, operation){
        this.name = name;
        this.operation = operation;
        this.sayHi();
    }
    sayHi(){
        alert(this.name + '\n' + this.operation)
    }
}
class scalars{
    constructor(){

    }
}
if(a > 4 && a != 5){
    new matrix("Name",sum(a,b));
}
else if(a == 5){
    new matrix("KEK",myltiply(a,b));
}
    

document.querySelector('.btn-lg').onclick = function(){
    let ab = myltiply(40,2);
    console.log(ab);
}