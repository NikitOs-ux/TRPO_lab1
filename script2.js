function map(){
    //          метод MAP

        let A = [12,124,545,324,124,543,21];
        let c = A.map(function(value, index){
        return `${index + 1}: ${value}`})
        
    console.log(c);
}

function objectConstruct(){
    //          Генерация новых объектов при помощи шаблона 


    function Car(name, color, power){
        this.name = name;
        this.color = color;
        this.power = power
        this.powerEngine = function(){
            return this.power * 3.4 + 2.006
        }
    }
    
    var lada = new Car('Lada','blue', 96);
    var BMW = new Car('BMW','red', 206);
    
    console.log(BMW.powerEngine());
    console.log(lada.powerEngine());
}
function filter(){

    //             метод filter

    let masA = [4,1,5,-7,2, -9,24, -54];
    // let masB = [];
    // for (let index = 0; index < masA.length; index++) {
    //     if (masA[index] > 0) {
    //         masB.push(masA[index])
    //     }
        
    // }
    // console.log(masA);
    // console.log(masB);
    
    let masC = masA.filter(function(currentValue,index,array){
    return currentValue%2==0;})
    
    console.log(masC);
}

function reduce(){
    let masA = [7,1,6,74,2,427,-4,0, -64,25];
    console.log(masA);
    
    let a = masA.reduce(function(prevValue, currentValue,index){  // reduceRight тоже самое, только отсчет с конца
        
        console.log(`index = ${index}`);
        console.log(`prevValue = ${prevValue}`);
        console.log(`currentValue = ${currentValue}`);
        // return prevValue
        return prevValue + currentValue // сумма элементов массива
    })
    console.log(a);
}

reduce()