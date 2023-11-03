let computerSequence = []

function removeClassBox(box){
    box.classList.remove('opacity-100')
}

function addClassBox(box){
    box.classList.add('opacity-100')
    setTimeout(() => {
        removeClassBox(box)
    }, 500)
}

function randomBox(){
    const $boxes = document.querySelectorAll('.box')
    const randomBox = Math.floor(Math.random() * $boxes.length)
    const box = $boxes[randomBox];
    addClassBox(box)
}


function startGame(){
    const $buttonStart = document.querySelector('#button-start')
    $buttonStart.addEventListener('click', () => {
        randomBox()
    })
}

startGame()

