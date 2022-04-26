function add(a,b){
  return a+b;
}
function subtract(a,b){
  return a-b;
}
function multiply(a,b){
  return a*b;
}
function divide(a,b){
  return a/b;
}
function operate(operator, a, b){
  return operator(a,b);
}

let currNum = '';
let preNum = '';
let operator = '';
let result = '';

let currentDisplay = document.querySelector('#display1');
let previousDisplay = document.querySelector('#display2');
let displayTotal = document.querySelector('#displayTotal');

let equal = document.querySelector('.equal');
let numberBtn = document.querySelectorAll('.number');
let operatorBtn = document.querySelectorAll('.operator');
let clear = document.querySelector('#clear');
let deleteBtn = document.querySelector('#delete');

window.addEventListener('keydown', handleKeys);


numberBtn.forEach(btn => {
  btn.addEventListener('click', (e)=>{
    handleNumber(e.target.textContent);
  });
});
function handleNumber(number){
  currNum += number;
  currentDisplay.textContent = currNum;
}

operatorBtn.forEach(btn =>{
  btn.addEventListener('click', (e)=>{
    handleOperator(e.target.textContent);
  });
});
function handleOperator(op){
  operator = op;
  preNum = currNum;
  previousDisplay.textContent = preNum + ' ' + operator;
  currNum = '';
  currentDisplay.textContent = '';
}

equal.addEventListener('click', ()=>{
  currNum = Number(currNum);
  preNum = Number(preNum);
  calculate(operator);
  
})

function calculate(operator){
  if(operator === '/') displayTotal.textContent = operate(divide, preNum, currNum);
  if(operator === '*') displayTotal.textContent = operate(multiply, preNum, currNum);
  if(operator === '-') displayTotal.textContent = operate(subtract, preNum, currNum);
  if(operator === '+') displayTotal.textContent = operate(add, preNum, currNum);
}

clear.addEventListener('click', ()=>{
  currentDisplay.textContent = '';
  previousDisplay.textContent = '';
  displayTotal.textContent = '';
  currNum = '';
  preNum = '';
})

deleteBtn.addEventListener('click', handleDelete);
function handleDelete(){
  currNum = currNum.slice(0,-1);
  currentDisplay.textContent = currNum;
}

function handleKeys(e){
  e.preventDefault();
  if(e.key >= 0 && e.key <= 9) handleNumber(e.key);
  if(e.key === '/' || e.key === '*' || e.key === '-' || e.key === '+') handleOperator(e.key);
  if(e.key === 'Enter' || e.key === '=') {
    currNum = Number(currNum);
    preNum = Number(preNum);
    calculate(operator);
  }
  if(e.key === 'Backspace') handleDelete();
  if(e.key === '.') handleNumber(e.key);
}