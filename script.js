const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

let score = document.querySelector('.score')
const finalscore = document.querySelector('.finalscore')
const menu = document.querySelector('.gameoverscreen')
const button = document.querySelector('.btn')

const size = 30

const numerorand = (min, max)=>{
    return Math.round(Math.random() * (max - min) + min)
}

const posicaorand = (min, max)=>{
    const number = numerorand(5, 600 - 30)
    return Math.round(number / 30) * 30
}

const incrementscore = ()=>{
    score.innerText = +score.innerText+10
}

const audio = new Audio('gemidinho-do-vidane-2.mp3')


const food = {
    x: posicaorand(),
    y: posicaorand(),
    color: "red"

}

const snake = [
    
        {x: 90, y: 0},
        {x: 120, y: 0}

    
]

let direction, loopId


const desenharcomid = ()=> {
    contexto.fillStyle = food.color
    contexto.fillRect(food.x, food.y, size, size)
}

const drawsnake = () => {
    contexto.fillStyle = 'green'
    snake.forEach((elemento, index)=> {

        if (index == snake.length - 1){
            contexto.fillStyle = 'darkgreen' 
        }

        contexto.fillRect(elemento.x, elemento.y, size,size)
    })
}

const move = ()=>{
if(!direction)return

    const cabeca = snake[snake.length - 1]

    snake.shift()

    if(direction == "right"){
        snake.push({x: cabeca.x + size, y: cabeca.y})
    }

    if(direction == "left"){
        snake.push({x: cabeca.x - size, y: cabeca.y})
    }

    if(direction == "up"){
        snake.push({x: cabeca.x, y: cabeca.y - size})
    }

    if(direction == "down"){
        snake.push({x: cabeca.x, y: cabeca.y + size})
    }
}

const linhas =()=>{
    contexto.lineWidth=1
    contexto.strokeStyle='#292929'

    for(let i = 30; i < 600; i += 30){
        contexto.beginPath()
        contexto.lineTo(i, 0)
        contexto.lineTo(i, 600)
        contexto.stroke()

        contexto.beginPath()
        contexto.lineTo(0, i)
        contexto.lineTo(600, i)
        contexto.stroke()
    }


    
}

const checcomeu = ()=>{
    const cabeca = snake[snake.length - 1]

    if (cabeca.x == food.x && cabeca.y == food.y){
        incrementscore()
        snake.push(cabeca)

        food.x = posicaorand(),
        food.y = posicaorand(),
        food.color = "red"
        audio.play()
    }
}

const checkbatida = ()=>{
    const cabeca = snake[snake.length - 1]

    if (cabeca.x < 0 || cabeca.y < 0 || cabeca.y > 570 || cabeca.x > 570){
    gameover()
    }
}

linhas()

const gameover = ()=>{
    direction = undefined

    menu.style.display = "flex"
    finalscore.innerText=` ${score.innerText}`
}

const gameloop = () => {

    if(menu.style.display == 'flex'){
        return
    }

        clearInterval(loopId)
        contexto.clearRect(0,0, 600,600)
        linhas()
        desenharcomid()
        move()
        drawsnake()
        checcomeu()
        checkbatida()  

    loopId = setTimeout(()=>{
            gameloop()
        },150)
}

gameloop()

document.addEventListener("keydown", ({key})=>{
    
    if(key=="ArrowRight" && direction != 'left'){
        direction="right"
    }

    if(key=="ArrowDown" && direction != "up"){
        direction="down"
    }

    if(key=="ArrowUp" && direction != "down"){
        direction="up"
    }

    if(key=="ArrowLeft" && direction!= 'right'){
        direction="left"
    }
})

button.addEventListener('click', ()=>{
    window.location.href = window.location.href
})

