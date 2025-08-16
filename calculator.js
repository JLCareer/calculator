const calStack = []

function add(num1, num2){
    return num1 + num2
}

function sub(num1, num2){
    return num1 - num2
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

const buttons = [ { "c": "clear", "<=": "remove"},  
            {"7": "number", "8": "number", "9": "number", "/": "operator"},
            {"4": "number", "5": "number", "6": "number", "X": "operator"},
            {"1": "number", "2": "number", "3": "number", "+": "operator"},
            {".": "float", "0": "number", "-": "operator negative", "=": "operator calculate"}]
const buttonGrid = document.querySelector(".buttons");

for(let i = 0; i < buttons.length; i++){
    let row = document.createElement("div")
    row.setAttribute("class", "row")
    for(objKey of Object.keys(buttons[i])){
        let button = document.createElement("button")
        button.textContent = objKey
        button.setAttribute("class", buttons[i][objKey])
        row.appendChild(button)
    }
    buttonGrid.appendChild(row);
}

function operate (arr, input){
    console.log("calculate")
    switch(arr[1]){
        case "+":
            arr[0] = add(parseFloat(arr[0]), parseFloat(input))
            break;
        case "-":
            arr[0] = sub(parseFloat(arr[0]), parseFloat(input))
            break;
        case "/":
            arr[0] = divide(parseFloat(arr[0]), parseFloat(input))
            break;
        case "X":
            arr[0] = multiply(parseFloat(arr[0]), parseFloat(input))
            break;
    }

    arr.pop()
}

let input = ""
let equation = []
let numInInpute = false;
const equationDisplay =  document.querySelector(".equation")
const inputDisplay = document.querySelector(".input")

buttonGrid.addEventListener("click", (e) => {
  if(e.target.tagName == "BUTTON"){
    if(e.target.classList.contains("clear")){
        input = ""
        equation = []
        numInInpute = false;
        document.querySelector(".float").disabled = false;
    }
    else if(e.target.classList.contains("number") && equation.length % 2 == 0){
        input += e.target.textContent;
        numInInpute = true;
    }
    else if(e.target.classList.contains("float") && !input.includes(".") && numInInpute){
        input += e.target.textContent;
        document.querySelector(".float").disabled = true;
    }else if(e.target.classList.contains("remove") && input.length > 0){
        input = input.slice(0, -1)
        if(input.length == 0 || input.includes("-") && input.length <= 1){
            numInInpute = false;
        }
        if(!input.includes(".")){
            document.querySelector(".float").disabled = false;
        }
    }else if(e.target.classList.contains("operator")){
        console.log("operating")
        if(e.target.classList.contains("negative") && input.length == 0){
            input += e.target.textContent;
        }else if((equation.length == 2 && numInInpute)){
            operate(equation, input);
            input = "";
            if(!e.target.classList.contains("calculate")){
                equation.push(e.target.textContent);
            }
            numInInpute = false;
        }else if(equation.length == 1 && !e.target.classList.contains("calculate")){
            equation[1] = e.target.textContent;
        }
        else if(numInInpute && !e.target.classList.contains("calculate")){
            equation[0] = input;
            equation[1] = e.target.textContent;
            input = "";
            numInInpute = false;
            document.querySelector(".float").disabled = false;
        }
    }
  }
    equationDisplay.textContent = equation.join(" ")
  inputDisplay.textContent = input
})

