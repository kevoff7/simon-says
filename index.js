function removeClassBox(boxElement){
    boxElement.classList.remove('opacity-100')
}

function addClassBox(boxElement){
    const transitionDuration = 500
    boxElement.classList.add('opacity-100')
     setTimeout(() => {
        removeClassBox(boxElement)
    }, transitionDuration)
}
  

function showComputerSequence(boxElements,sequence){
    const delayBetweenBoxes = 1000
    for (let i = 0; i < sequence.length; i++) {
        setTimeout(() => {
            addClassBox(boxElements[sequence[i]])
        }, i * delayBetweenBoxes)
    }
}

function addRandomBox(sequence, maxIndex){
    const randomBox = Math.floor(Math.random() * maxIndex)
    sequence.push(randomBox)
}

function startGame(){
    const $buttonStart = document.querySelector('#button-start')
    const $boxElements = document.querySelectorAll('.box')

    const computerSequence = []
    $buttonStart.addEventListener('click', () => {
            addRandomBox(computerSequence,$boxElements.length)
            showComputerSequence($boxElements,computerSequence)
    })
}

startGame()
