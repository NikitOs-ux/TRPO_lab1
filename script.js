var sizeWidthA = document.querySelector('#sizeMatrixAwidth');
var sizeHiegthA = document.querySelector('#sizeMatrixAheight');
var sizeWidthB = document.querySelector('#sizeMatrixBwidth');
var sizeHiegthB = document.querySelector('#sizeMatrixBheight');

var vectorA = document.querySelectorAll('.vector_A>input');
var vectorB = document.querySelectorAll('.vector_B>input');
var vectorResult = document.querySelector('.vector_RESULT');
var vectorInfo = document.querySelector('.info');

var scalarsA = document.querySelector('#scalarA');
var scalarsB = document.querySelector('#scalarB');
var scalarsResult = document.querySelector('.scalars_RESULT'); 

// создание каркаса матрицы
function createTable(nameTable,width,heigth){
    if(width > 5 || heigth > 5){
        alert("Введите размерность матрицы не более 5х5, а то верстка съедет, а мне лень поправлять\nИ вообще, не надо меня осуждать, я сделал всё что было в моих силах");
    }
    else if(width <= 5 && heigth <= 5){
        var table =document.querySelector( nameTable + ' >table');
        for(let j = 0; j<heigth; j++){
            var tbRow = document.createElement('tr');
            table.append(tbRow);
        for(let i = 0; i<width; i++){
            var tbData = document.createElement('td');
            tbRow.appendChild(tbData);
            let inp = document.createElement('input');
            inp.type = "number";
            if(nameTable === ".result"){
                inp.disabled = "disabled"; 
            }
            tbData.append(inp);
            }
        }
    }   
}
// удаление матрицы, при изменение значений
function removeTable(nameTable){
    var table = document.querySelectorAll(nameTable + '>table>tr');
    for(let i=0; i<table.length; i++){
        table[i].remove();
    }
}
// Блок отображения интерфейса в зависимости от выбранной операции
document.querySelector('#selectOperation').oninput = function(){
    operation = [".table",".vectors",".scalars"];
    let table =  document.querySelector(operation[0]);
    let vector =  document.querySelector(operation[1]);
    let scalars =  document.querySelector(operation[2]);
    if(this.value <= 9){
        table.classList.remove('hidden');
        vector.classList.add('hidden');
        scalars.classList.add('hidden');
        if(this.value == 2){
            createTable(".B",1,1);
        }
        if(this.value == 3){
            let surveyHightA = function survey(){
                let aW = +sizeHiegthA.value;
                // console.log(aW);
                if(aW != 0){
                    off(aW);
                }
            };
            function off(heigth){
                clearTimeout(timeoutID);
                createTable(".B",1,heigth); 
                sizeWidthB.value = 1;
                sizeHiegthB.value = heigth;
            };
            let timeoutID = setInterval(surveyHightA, 1000);
        }
        if (this.value == 5 || this.value == 6 || this.value == 7) {
            sizeWidthB.disabled = "disabld";
            sizeHiegthB.disabled = "disabld";
            }
        else{
            sizeWidthB.disabled = "";
            sizeHiegthB.disabled = "";
            }
    }
    else if( this.value >= 10 && this.value < 20){
        table.classList.add('hidden');
        vector.classList.remove('hidden');
        scalars.classList.add('hidden');

        if(this.value == 10){
            vectorInfo.innerHTML = "<b>Умножение на число.</b><br> Введите число на которое нужно умножить в первую ячейку вектора B <br> Почему так? Не важно! Просто сделай и всё";
            
        }
        else if(this.value == 13){
            vectorInfo.innerHTML = "<b>Умножение на вектор.</b><br> Мне лень было подставлять сюда функцию, просто открой такой же пункт в матрицах";
            
        }
    }
    else if(this.value >= 20){
        table.classList.add('hidden');
        vector.classList.add('hidden');
        scalars.classList.remove('hidden');
    }
}
// создание каркаса матрицы по событию oninput
sizeWidthA.oninput = function(){
    let rowTable = document.querySelector('#sizeMatrixAheight').value;
    let colTable = this.value;
    let nameTable =".A";
    if(rowTable === "" || colTable === ""){
        removeTable(nameTable);
    }
    else{
        createTable(nameTable,colTable,rowTable);
    } 
    
}
sizeHiegthA.oninput = function(){
   let colTable = document.querySelector('#sizeMatrixAwidth').value;
    let rowTable = this.value;
    let nameTable =".A";
    if(rowTable === "" || colTable === ""){
        removeTable(nameTable);
        removeTable(".result");
    }
    else{
        createTable(nameTable,colTable,rowTable);
        createTable(".result",colTable,rowTable);
    } 
}
sizeWidthB.oninput = function(){
    let rowTable = document.querySelector('#sizeMatrixBheight').value;
    let colTable = this.value;
    let nameTable =".B";
    if(rowTable === "" || colTable === ""){
        removeTable(nameTable);
    }
    else{
        createTable(nameTable,colTable,rowTable);
    } 
    
}
sizeHiegthB.oninput = function(){
   let colTable = document.querySelector('#sizeMatrixBwidth').value;
    let rowTable = this.value;
    let nameTable =".B";
    if(rowTable === "" || colTable === ""){
        removeTable(nameTable);
    }
    else{
        createTable(nameTable,colTable,rowTable);
    } 
}
document.querySelector('.getResult').onclick = function(){
    var masA = document.querySelectorAll('.A>table>tr>td>input');
    var masB = document.querySelectorAll('.B>table>tr>td>input');
    var masResult = document.querySelectorAll('.result>table>tr>td>input');
    let SelOper = document.querySelector('#selectOperation').value;
    getMassA(masA,masB,masResult,SelOper);
}
// Блок формирования двумерного массива из одномерного
function form2Nmatrix(matrix,width,heigth){
    var matrixEx = new Array();
    let a =0;
    for(var i=0; i<heigth; i++){
        matrixEx[i] = [];
        for(var j=0; j<width; j++){
            matrixEx[i][j]= +matrix[a].value;
            a++;
        }
}
return matrixEx
}
// функция вычисления определителя (детерминанта)
function Determinant(A)
{
    var N = A.length, B = [], denom = 1, exchanges = 0;
    for (var i = 0; i < N; ++i)
     { B[i] = [];
       for (var j = 0; j < N; ++j) B[i][j] = A[i][j];
     }
    for (var i = 0; i < N-1; ++i)
     { var maxN = i, maxValue = Math.abs(B[i][i]);
       for (var j = i+1; j < N; ++j)
        { var value = Math.abs(B[j][i]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { var temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       var value1 = B[i][i];
       for (var j = i+1; j < N; ++j)
        { var value2 = B[j][i];
          B[j][i] = 0;
          for (var k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[i][k]*value2)/denom;
        }
       denom = value1;
     }                                         
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}
// Умножение матриц
function MultiplyMatrix(A,B)
{
    var rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];
    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[ i ] = [];
    for (var k = 0; k < colsB; k++)
     { for (var i = 0; i < rowsA; i++)
        { var t = 0;
          for (var j = 0; j < rowsB; j++) t += A[ i ][j]*B[j][k];
          C[ i ][k] = t;
        }
     }
    return C;
}
// Транспонирование марицы
function TransMatrix(A)       //На входе двумерный массив
{
    var m = A.length, n = A[0].length, AT = [];
    for (var i = 0; i < n; i++)
     { AT[ i ] = [];
       for (var j = 0; j < m; j++) AT[ i ][j] = A[j][ i ];
     }
    return AT;
}
function enterResult(matrix, res){
    for(i=0; i < matrix.length; i++){
        res[i].value = matrix[i] ;
   }   
}
// функция вычисления
function getMassA(masA,masB,masResult,SelOper){
    var arrA = new Array();
    var arrB = new Array();
    // Блок операций с матрицами
        if(SelOper == 0){
            // поэлементное умножение
            for(i=0; i<masA.length; i++){
                arrA[i] = +masA[i].value;
                arrB[i] = +masB[i].value
                masResult[i].value = arrA[i] * arrB[i] ;
        }
        }
        else if(SelOper == 01){
            // поэлементное сложение
            for(i=0; i<masA.length; i++){
                arrA[i] = +masA[i].value;
                arrB[i] = +masB[i].value
                masResult[i].value = arrA[i] + arrB[i] ;
            }
        }
        else if(SelOper == 02){
            // умножение на скаляр
            arrB[0] = +masB[0].value;
                for(i=0; i<masA.length; i++){
                    arrA[i] = +masA[i].value;
                    masResult[i].value = arrA[i] * arrB[0] ;
            }
        }
        else if(SelOper == 03){
            // умножение на вектор
            let formMassA = form2Nmatrix(masA, sizeWidthA.value, sizeHiegthA.value)
            let formMassB = form2Nmatrix(masB, sizeWidthB.value, sizeHiegthB.value) 
        }
        else if(SelOper==04){
            // матричное произведение
            let formMassA = form2Nmatrix(masA, sizeWidthA.value, sizeHiegthA.value)
            let formMassB = form2Nmatrix(masB, sizeWidthB.value, sizeHiegthB.value)
            
            console.log(MultiplyMatrix(formMassA, formMassB));
        }
        else if(SelOper == 05){
        // След и определитель
            let diagonl = new Array();
            if(sizeWidthA.value == sizeHiegthA.value){
                let formMassA = form2Nmatrix(masA, sizeWidthA.value, sizeHiegthA.value);
                console.log(formMassA);
                for(i=0; i < sizeWidthA.value; i++){
                    diagonl[i] = +formMassA[i][i];
                }
                let a =0;
                for(i=0; i < sizeWidthA.value; i++){
                    a = a + diagonl[i];
                }
                console.log(a);
                let perem = document.querySelectorAll('.result>table>tr>td>input');
                perem[0].type = "Text";
                perem[0].value = "След"
                perem[1].value = a;
                perem[3].type = "Text";
                perem[3].value = "Опред."
                perem[4].value = Determinant(formMassA);
                
            }
            else{
                alert("Attention!\n Матрица должна быть размерностью NxN\n Будь осторожен и береги себя!");
            }
        }
        else if(SelOper == 06){
        // обратная матрица
        }
        else if(SelOper == 07){
        // Транспорирование
        let formMassA = form2Nmatrix(masA, sizeWidthA.value, sizeHiegthA.value);
        let transMasA = TransMatrix(formMassA);    
        transMasA = [].concat.apply([], transMasA).filter(function(a, b, c) {
            return c.indexOf(a) == b
        });
         enterResult(transMasA,masResult)
    }
    // Блок операций с векторами
        else if(SelOper == 10){
            var Result = new Array();
            for(i=0; i < 3; i++){
                Result[i] = vectorA[i].value * vectorB[0].value;
            }
            vectorResult.textContent = `Ответ: [${Result[0]},${Result[1]},${Result[2]}]`;
        }
        else if(SelOper == 11){
            var Result = new Array();
            for(i=0; i < 3; i++){
                Result[i] = +vectorA[i].value + +vectorB[i].value;
            }
            vectorResult.textContent = `Ответ: [${Result[0]},${Result[1]},${Result[2]}]`;
        } 
        else if(SelOper == 12){
            var Result = new Array();
            for(i=0; i < 3; i++){
                Result[i] = vectorA[i].value * vectorB[i].value;
            }
            vectorResult.textContent = `Ответ: [${Result[0]},${Result[1]},${Result[2]}]`;
        } 
        else if(SelOper == 13){
            vectorResult.textContent = `Ответ: мне лень было подставлять сюда функцию, просто открой такой же пункт в матрицах`;
        }
        else if(SelOper == 14){
            var Result = new Array();
            var newR=0;
            for(i=0; i<3; i++){
                Result[i] = vectorA[i].value * vectorB[i].value;
                newR +=Result[i];
            }
            vectorResult.textContent = `Ответ: ${newR}`;
        }
        else if(SelOper == 15){
            var Result = new Array();
            var newR=1;
            for(i=0; i<3; i++){
                Result[i] = +vectorA[i].value * +vectorB[i].value;
                newR *=Result[i];
            }
            vectorResult.textContent = `Ответ: ${newR}`;
        }
        else if(SelOper == 16){
            var newR=0;
            for(i=0; i<3; i++){
                newR += Math.pow(vectorA[i].value,2);
            }
            Result = Math.pow(newR,1/2);
            vectorResult.textContent = `Ответ: ${Result}`;
        }
        else if(SelOper == 17){
            var Result = new Array();
            for(i=0; i<3; i++){
               Result[i] = +vectorA[i].value / +vectorB[i].value;
            }
            if(Result[0]==Result[1]==Result[2]){
                var newR=0;
                for(i=0; i<3; i++){
                    Result[i] = vectorA[i].value * vectorB[i].value;
                    newR +=Result[i];
                }
                if(newR > 0){
                    vectorResult.innerHTML = `Ответ: Векторы коллинеарны и соноправлены`;
                }
                else{
                    vectorResult.innerHTML = `Ответ: Векторы коллинеарны, но <i>НЕ</i> сонаправлены`;
                }
            }
            else{
                vectorResult.innerHTML = `Ответ: Векторы <i>НЕ</i> коллинеарны, и <i>НЕ</i> сонаправлены`;
            }
        }
        else if(SelOper == 18){
            var Result = new Array();
            var newR=0;
            for(i=0; i<3; i++){
                Result[i] = vectorA[i].value * vectorB[i].value;
                newR +=Result[i];
            }
            if(newR == 0){
                vectorResult.textContent = `Ответ: Векторы ортогональны т.к. скалярное произведение векторов = ${newR}`;
            }
            else{
                vectorResult.textContent = `Ответ: Векторы НЕ ортогональны! Скалярное произведение векторов = ${newR}`;
            }
        }
        // Блок операций со скалярами
        else if(SelOper == 20){
        scalarsResult.innerHTML = `Ответ: ${+scalarsA.value + +scalarsB.value}`;
        }
        else if(SelOper == 21){
            scalarsResult.innerHTML = `Ответ: ${+scalarsA.value *(-1)} <br> Ответ:${+scalarsB.value *(-1)}`;
        }  
        else if(SelOper == 22){
            scalarsResult.innerHTML = `Ответ: ${+scalarsA.value * +scalarsB.value}`;
        }  
        else if(SelOper == 23){
            scalarsResult.innerHTML = `Ответ: ${Math.pow(+scalarsA.value ,+scalarsB.value)}`;
        }
        else if(SelOper == 24){
            scalarsResult.innerHTML = `Ответ: ${Math.pow(+scalarsA.value ,(1/+scalarsB.value))}`;
        }  
        else if(SelOper == 25){

           let scalarOpt = document.querySelector('#scalarOpt').value;
           console.log(scalarOpt);
        
        }
    }

