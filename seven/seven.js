//Variables
let turn = 1

let finished = false

let numeros = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16
]
let onlinePressed = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
]

let pressed = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
]

let botones = []

//Funciones
const createButtons = () =>{
    numeros.forEach(btn=>{
        let fila
        if(btn===1){
            fila = 1
        }
        if(btn===2||btn===3||btn===4){
            fila = 2
        }
        if(btn===5||btn===6||btn===7||btn===8||btn===9){
            fila = 3
        }
        if(btn===10||btn===11||btn===12||btn===13||btn===14||btn===15||btn===16){
            fila = 4
        }
        botones.push({num:btn,fila:fila}) 
        let btnActual = document.querySelector(`#boton-${btn}`)
            btnActual.addEventListener(`click`, ()=>{
                if (finished === false){ 
                    if(verify(btn)){
                        onlinePressed[btn]=1
                        if(pressed[btn] + onlinePressed[btn] <= 1){
                            pressed[btn] += onlinePressed[btn]
                        }
                        else{
                            pressed[btn]=1
                        }
                    }
                    else{
                        alert("no se puede apretar ese boton")
                    }
            }
        })
    })
}
function minMax(array) {
    let min = 0;
    let max = 0;
    
    for (let i = 0; i < array.length; i++) {
      if (i < min&&array[i] === 1) {
        min = i;
      }
      if (array[i] > array[min]) {
        max = i;
      }
    }
    
    return {min, max};
}
function Maxmin(array) {
    let min = 1000;
    let max = 0;
    
    for (let i = 0; i < array.length; i++) {
      if (i < min&&array[i] === 1) {
        min = i;
      }
      if (array[i] > array[min]) {
        max = i;
      }
    }
    
    return {min, max};
}
const sameLine = (btn) => {
    let max = minMax(onlinePressed).max
    let min = minMax(onlinePressed).min
    for (let i = btn; i < max||i > min-1; i++) {
        if(onlinePressed[i]===1){
            return(false)
        }
        else{
            // console.log(botones[btn].fila);
            if(botones[btn-1].fila===botones[max-1].fila){
                return(true)
            }
            // else if(botones[min-1]!==undefined){
            //     if(botones[btn-1].fila===botones[min-1].fila){
            //         return(true)
            //     }
            //     else{
            //         return(false)
            //     }
            // }
            else{
                return(false)
            }
        }
    }
}
    


const verify = (btn) =>{
    if(pressed[btn]===1){
        return(false)
    }
    else if(isStpr()){
        // if(onlinePressed[btn-1]===1&&btn-1!=1&&btn-1!=4&&btn-1!=9||onlinePressed[btn+1]===1&&btn+1!=2&&btn+1!=5&&btn+1!=10){
        //     return(true)
        // }
        // else{
        //     return(false)
        // }
        // debugger

        if(sameLine(btn)){
            onlinePressed[btn]=1
            let max = minMax(onlinePressed).max
            // debugger
            let min = Maxmin(onlinePressed).min
            if(btn<max){
            for (let i = btn; i <= max; i++) {
                let btnActual = document.querySelector(`#boton-${i}`)
                turn === 2?btnActual.style="background-color:red":btnActual.style="background-color:blue"
                onlinePressed[i]=1
            }
        }
        else{
            for (let i = btn; i >= min; i--) {
                let btnActual = document.querySelector(`#boton-${i}`)
                turn === 2?btnActual.style="background-color:red":btnActual.style="background-color:blue"
                onlinePressed[i]=1
            }
        }
            return(true)
        }
        else{
            return(false)
        }
    }
    else{
        let btnActual = document.querySelector(`#boton-${btn}`)
        turn === 2?btnActual.style="background-color:red":btnActual.style="background-color:blue"
        return(true)        
    }
}

  

const isStpr = () => {
    let result = 0
        for (let i = 0; i < onlinePressed.length; i++) {
          result += onlinePressed[i];
        }
        if (result === 0){
            return(false)
        }
        else{
            return(true)
        }
}

const sendMove = () =>{
    if(isStpr()){
        turn === 1?turn=2:turn=1
        for (let i = 1; i < pressed.length-1; i++) {
            onlinePressed[i] + pressed[i] === 2?pressed[i]=pressed[i]:pressed[i]+=onlinePressed[i];
        }
    }
    else(
        alert("Tenes que tocar por lo menos un boton")
    )
    
    if(turn===1){
        document.querySelector(`#pl2`).className = `marcado`
        document.querySelector(`#pl1`).className = ``
    }
    else{
        document.querySelector(`#pl1`).className = `marcado`
        document.querySelector(`#pl2`).className = ``
    }
    document.querySelector(`#turn`).innerHTML = `Le toca jugar al jugador ${turn}`
        

    onlinePressed = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ]

    let result = 0
    // debugger
    console.log(pressed);
    for (let i = 1; i < pressed.length; i++) {
      result += pressed[i];
    }
    if (result >= 15){
        finished = true
        let color
        turn === 2?color = "rojo":color = "azul"
        alert("Perdio el jugador " + turn + ", el que cuando tocaba aparecia " + color)
    }

}

const Unduo = () =>{
    for (let i = 0; i < onlinePressed.length; i++) {
        let alPedo = 0
        let btnActual = document.querySelector(`#boton-${i}`)
        onlinePressed[i]===1?btnActual.style="background-color:#333":alPedo+=1
        console.log(alPedo);
    }
    for (let i = 0; i < pressed.length; i++) {
      onlinePressed[i] + pressed[i] === 2?pressed[i] = 0:pressed[i] = pressed[i] 
    }
    onlinePressed = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ]
}

//Conectando con el dom
let submit = document.querySelector(`#submit`)
submit.addEventListener("click",sendMove)

document.querySelector(`#turn`).innerHTML = `Le toca jugar al jugador ${turn}`


let unduo = document.querySelector(`#unduo`)
unduo.addEventListener("click",Unduo)
//Usando funciones
createButtons()