var calculation = [];
var currentValue = '0';
var numPeriods = 0;
var memory = null;
var unclosedParentheses = 0;
var justCalced = false;

var upperScreen = document.getElementById('upper-screen');
var lowerScreen = document.getElementById('lower-screen');

var precedence = {
    '(': 0,
    ')': 1,
    '^': 2,
    '/': 3,
    '*': 3,
    '+': 4,
    '-': 4
}

function updateUI(){
    var screenData;
    var index;
    var found = false;
    //Check for period
    for(var i = 0; i < currentValue.length; i++){
        if(currentValue[i] === '.'){
            index = i;
            found = true;
            numPeriods = 1;
        }
    }

    //Based on whether period exists format calculator display, and enable/disable period button.
    if(found){
        document.getElementById('period-button').disabled = true;
        screenData = parseFloat(currentValue.substring(0, index)).toLocaleString() + currentValue.substring(index)
    }
    else{
        numPeriods = 0;
        document.getElementById('period-button').disabled = false;
        screenData = parseFloat(currentValue).toLocaleString();
    }

    upperScreen.innerHTML = calculation.join('');
    lowerScreen.innerHTML = screenData;
};
updateUI();

document.getElementById('memory-clear-button').onclick = function (){
    memory = null;
    document.getElementById('memory-clear-button').disabled = true;
    document.getElementById('memory-recall-button').disabled = true;
};

document.getElementById('memory-recall-button').onclick = function (){
    currentValue = memory.toString();
    updateUI();
};

document.getElementById('memory-plus-button').onclick = function (){
    document.getElementById('memory-clear-button').disabled = false;
    document.getElementById('memory-recall-button').disabled = false;
    memory += parseFloat(currentValue);
};

document.getElementById('memory-minus-button').onclick = function(){
    document.getElementById('memory-clear-button').disabled = false;
    document.getElementById('memory-recall-button').disabled = false;
    memory -= parseFloat(currentValue);
};

document.getElementById('memory-store-button').onclick = function(){
    document.getElementById('memory-clear-button').disabled = false;
    document.getElementById('memory-recall-button').disabled = false;
    memory = parseFloat(currentValue);
};

document.getElementById('percent-button').onclick = function(){
    currentValue = (currentValue / 100).toString();
    updateUI();
};

document.getElementById('sqrt-button').onclick = function(){
    currentValue = Math.sqrt(currentValue).toString();
    updateUI();
};

document.getElementById('square-button').onclick = function(){
    currentValue = (currentValue * currentValue).toString();
    updateUI();
};

document.getElementById('inverse-button').onclick = function(){
    if(parseFloat(currentValue) != 0) currentValue = (1.0 / currentValue).toString();
    updateUI();
};

document.getElementById('log-button').onclick = function(){
    currentValue = Math.log(parseFloat(currentValue)).toString();
    updateUI();
}
document.getElementById('sin-button').onclick = function(){
    var degToRad = parseFloat(currentValue) * Math.PI / 180.0;
    currentValue = Math.sin(degToRad).toString();
    updateUI();
}
document.getElementById('cos-button').onclick = function(){
    var degToRad = parseFloat(currentValue) * Math.PI / 180.0;
    currentValue = Math.cos(degToRad).toString();
    updateUI();
}
document.getElementById('tan-button').onclick = function(){
    var degToRad = parseFloat(currentValue) * Math.PI / 180.0;
    currentValue = Math.tan(degToRad).toString();
    updateUI();
}

document.getElementById('factorial-button').onclick = function(){
    var numberFactorial = 1;
    for(var i = 1; i <= Math.abs(parseInt(currentValue)); i++){
        numberFactorial = numberFactorial * i;
    }

    currentValue = numberFactorial.toString();
    updateUI();
}

document.getElementById('negate-button').onclick = function(){
    currentValue = (-1.0 * currentValue).toString();
    updateUI();
};

document.getElementById('clear-recent-button').onclick = function(){
    currentValue = '0';
    numPeriods = 0;
    updateUI();
};

document.getElementById('clear-button').onclick = function(){
    calculation = [];
    currentValue = '0';
    numPeriods = 0;
    unclosedParentheses = 0;
    updateUI();
};

document.getElementById('backspace-button').onclick = function(){
    var numberString = currentValue.toString();

    if(numberString[numberString.length-1] === '.'){
        //Adjust period based globals
        numPeriods -= 1;
    }

    var numberString = numberString.substring(0, numberString.length-1);
    if(numberString.length > 0){
    }
    else {
        if(calculation[calculation.length-1] === ')'){
            //Adjust Parentheses based values
            unclosedParentheses++;
            if(unclosedParentheses) document.getElementById('closepar-button').disabled = false;
        }
        else if(calculation[calculation.length-1] === '('){
            //Adjust Parentheses based values
            unclosedParentheses--;
            if(unclosedParentheses == 0) document.getElementById('closepar-button').disabled = true;
        }
        //Lop off last item in calculation
        calculation = calculation.slice(0, calculation.length -1);
        numberString = '0';
    }

    currentValue = numberString;
    updateUI();
};

function performOp(op){
    var lastCalcItem = calculation[calculation.length - 1];
    if(lastCalcItem != ')' && (typeof precedence[lastCalcItem]) !== 'undefined'){
        calculation.push(currentValue);
        currentValue = '0';
        numPeriods = 0;
    }
    calculation.push(op);

    updateUI();
};

document.getElementById('divide-button').onclick = (op) => performOp('/');
document.getElementById('multiply-button').onclick = (op) => performOp('*');
document.getElementById('subtract-button').onclick = (op) => performOp('-');
document.getElementById('plus-button').onclick = (op) => performOp('+');
document.getElementById('exponent-button').onclick = (op) => performOp('^');

function addBracket(type){
    switch(type){
        case '(':
            if(currentValue != '0'){
                calculation.push(currentValue);
                currentValue = '0';
                numPeriods = 0;
            }
            calculation.push('(');
            unclosedParentheses++;
            document.getElementById('closepar-button').disabled = false;
        break;
        case ')':
            if(unclosedParentheses){
                var lastCalcItem = calculation[calculation.length - 1];
                if(precedence[lastCalcItem] === undefined || precedence[lastCalcItem] == 1){
                    calculation.push(')');
                    unclosedParentheses--;
                    if(unclosedParentheses == 0) document.getElementById('closepar-button').disabled = true;
                } else {
                    calculation.push(currentValue);
                    calculation.push(')')
                    unclosedParentheses--;
                    currentValue = '0';
                    numPeriods = 0;
                    if(unclosedParentheses == 0) document.getElementById('closepar-button').disabled = true;
                }
            }
        break;
        default:
        break;
    }
    updateUI();
}

document.getElementById('openpar-button').onclick = (op) => addBracket('(');
document.getElementById('closepar-button').onclick = (op) => addBracket(')');

function inputHandler(input){
    if(justCalced){
        currentValue = '';
        justCalced = false;
    }
    if(input === '.'){
        if(numPeriods === 0){
            numPeriods += 1;
            currentValue = currentValue + input;
            if(currentValue[0] === '0' && currentValue.length > 1){
                if(currentValue[1] !== '.'){
                    currentValue = currentValue.substring(1, currentValue.length);
                }
            }
        }
    }
    else{
        currentValue = currentValue + input;
        if(currentValue[0] === '0' && currentValue.length > 1){
            if(currentValue[1] !== '.'){
                currentValue = currentValue.substring(1, currentValue.length);
            }
        }
    }

    updateUI();
};

document.getElementById('seven-button').onclick = (input) => inputHandler('7');
document.getElementById('eight-button').onclick = (input) => inputHandler('8');
document.getElementById('nine-button').onclick = (input) => inputHandler('9');
document.getElementById('four-button').onclick = (input) => inputHandler('4');
document.getElementById('five-button').onclick = (input) => inputHandler('5');
document.getElementById('six-button').onclick = (input) => inputHandler('6');
document.getElementById('one-button').onclick = (input) => inputHandler('1');
document.getElementById('two-button').onclick = (input) => inputHandler('2');
document.getElementById('three-button').onclick = (input) => inputHandler('3');
document.getElementById('zero-button').onclick = (input) => inputHandler('0');
document.getElementById('period-button').onclick = (input) => inputHandler('.');

function solveEquation(equation){
    //Process brackets.
    do{
        var parenthesesDepth = 0;
        var startIndex = null;
        var endIndex = null;
        found = false;
        for(var i = 0; i < equation.length; i++){
            if(equation[i] == '('){
                if(parenthesesDepth == 0) startIndex = i;
                parenthesesDepth++;
                found = true;
            } else if(equation[i] == ')'){
                parenthesesDepth--;
                if(parenthesesDepth == 0){
                    endIndex = i;
                }
            }
        }

        if(found){
            if(!endIndex){
                endIndex = equation.length;
            }
            var equationStart = equation.slice(0, startIndex);
            var equationBrackets = equation.slice(startIndex + 1, endIndex);
            var equationEnd = [];
            if(equation.length > endIndex) equationEnd = equation.slice(endIndex + 1);
            console.log(equationBrackets);
            var term = solveEquation(equationBrackets);
            if(startIndex > 0 && (typeof precedence[equation[startIndex - 1]]) === 'undefined'){
                 equationStart.push('*');
             }

            equation = [];
            Array.prototype.push.apply(equation, equationStart);
            Array.prototype.push.apply(equation, term);
            Array.prototype.push.apply(equation, equationEnd);
        }
    } while(found);

    //Process Exponents
    do{
        var found = false;
        var index = 0;
        while(!found && index < equation.length){
            if(equation[index] == '^'){
                 found = true;
             }else{
                 index++;
             }
        }

        if (found){
            var equationStart = equation.slice(0, index - 1);
            var term = Math.pow(parseFloat(equation[index - 1]), parseFloat(equation[index + 1]));
            var equationEnd = [];
            if(equation.length > index + 1) equationEnd = equation.slice(index + 2);

            equation = [];
            Array.prototype.push.apply(equation, equationStart);
            Array.prototype.push.apply(equation, [term]);
            Array.prototype.push.apply(equation, equationEnd);
        }
    }while(found);

    //Process Multiplication/Division
    do{
        var found = false;
        var index = 0;
        while(!found && index < equation.length){
            if(equation[index] == '/' || equation[index] == '*'){
                 found = true;
             }else{
                 index++;
             }
        }

        if(found){
            //Calculate relevant term
            var term;
            switch(equation[index]){
                case '/':
                    term = parseFloat(equation[index - 1]) / parseFloat(equation[index + 1]);
                break;
                case '*':
                    term = parseFloat(equation[index - 1]) * parseFloat(equation[index + 1]);
                break;
            }
            var equationStart = equation.slice(0, index - 1);
            var equationEnd = [];
            if(equation.length > index + 1) equationEnd = equation.slice(index + 2);

            equation = [];
            Array.prototype.push.apply(equation, equationStart);
            Array.prototype.push.apply(equation, [term]);
            Array.prototype.push.apply(equation, equationEnd);
        }
    } while(found);

    //Process Addition/Subtraction
    do{
        var found = false;
        var index = 0;
        while(!found && index < equation.length){
            if(equation[index] == '-' || equation[index] == '+'){
                 found = true;
             }else{
                 index++;
             }
        }

        if(found){
            //Calculate relevant term
            var term;
            switch(equation[index]){
                case '-':
                    term = parseFloat(equation[index - 1]) - parseFloat(equation[index + 1]);
                break;
                case '+':
                    term = parseFloat(equation[index - 1]) + parseFloat(equation[index + 1]);
                break;
            }
            var equationStart = equation.slice(0, index - 1);
            var equationEnd = [];
            if(equation.length > index + 1) equationEnd = equation.slice(index + 2);

            equation = [];
            Array.prototype.push.apply(equation, equationStart);
            Array.prototype.push.apply(equation, [term]);
            Array.prototype.push.apply(equation, equationEnd);
        }
    } while(found);

    return equation;

}

document.getElementById('equals-button').onclick = function(){
    if(calculation.length == 0){

    } else {
        var lastCalcItem = calculation[calculation.length - 1];
        if(lastCalcItem != ')') calculation.push(currentValue);
        currentValue = solveEquation(calculation)[0];
        calculation = [];
        unclosedParentheses = 0;
        if(parseFloat(currentValue) != parseInt(currentValue)) numPeriods = 1;
        justCalced = true;
        updateUI();
    }
}

document.addEventListener('keypress', (event) => {
    var keyName = event.key;
    switch(keyName) {
        case '/':
            document.getElementById('divide-button').onclick();
        break;
        case '*':
            document.getElementById('multiply-button').onclick();
        break;
        case '-':
            document.getElementById('subtract-button').onclick();
        break;
        case '+':
            document.getElementById('plus-button').onclick();
        break;
        case 'Enter':
            event.preventDefault();
            document.getElementById('equals-button').onclick();
        break;
        case '1':
            document.getElementById('one-button').onclick();
        break;
        case '2':
            document.getElementById('two-button').onclick();
        break;
        case '3':
            document.getElementById('three-button').onclick();
        break;
        case '4':
            document.getElementById('four-button').onclick();
        break;
        case '5':
            document.getElementById('five-button').onclick();
        break;
        case '6':
            document.getElementById('six-button').onclick();
        break;
        case '7':
            document.getElementById('seven-button').onclick();
        break;
        case '8':
            document.getElementById('eight-button').onclick();
        break;
        case '9':
            document.getElementById('nine-button').onclick();
        break;
        case '0':
            document.getElementById('zero-button').onclick();
        break;
        case '.':
            document.getElementById('period-button').onclick();
        break;
        default:
        break;
    }
});
