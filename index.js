let userSequence = []
let computerSequence = []
let isGameStarted = false

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

function changeUiButton(isGameStarted){
    const $buttonStart = document.querySelector('#button-start')
    if(isGameStarted){
        $buttonStart.textContent = 'Reset Game'
        $buttonStart.className = 'btn btn-danger'
    }
    else{
        $buttonStart.textContent = 'Start Game'
        $buttonStart.className = 'btn btn-primary'    
    }
}

function changeUiSubtitle(value){
    const $subtitleText = document.querySelector('#subtitle-text')
    $subtitleText.textContent = value
}

function changeUiRoundGame(){
    const $roundGame = document.querySelector('#round-game')
    $roundGame.textContent = `Round # - ${computerSequence.length}`
}

function changeUI(isGame, valueSubtitle){
    changeUiButton(isGame)
    changeUiSubtitle(valueSubtitle);
    changeUiRoundGame()
}

function resetGame(){
    userSequence = []
    computerSequence = []
    isGameStarted = false
    blockUserInput()
    changeUI(isGameStarted, 'Tap "Start Playing" to play!')
   
}

function lose(){
    blockUserInput()
    changeUiSubtitle('You lost, Tap "Reset Game"!')
    userSequence = []
}

function checkSequence(){
    for(let i = 0; i < userSequence.length; i++){
        if(userSequence[i] !== computerSequence[i]){
            lose()
        }
    }
}

function showComputerSequence(boxElements){
    const delayBetweenBoxes = 1000
    for (let i = 0; i < computerSequence.length; i++) {
        setTimeout(() => {
            addClassBox(boxElements[computerSequence[i]])
        }, i * delayBetweenBoxes)
    }
}

function addRandomBox(maxIndex){
    const randomBox = Math.floor(Math.random() * maxIndex)
    computerSequence.push(randomBox)
}

function gameInicialized() {
    const $boxElements = document.querySelectorAll('.box')
    isGameStarted = true
    blockUserInput()
    addRandomBox($boxElements.length)
    showComputerSequence($boxElements)
    changeUI(isGameStarted, 'Computer turn')
    
    setTimeout(() => {
        unblockInputUser()
        changeUiSubtitle('User turn')
    }, computerSequence.length * 1000);
}

function userTurn($box,count){
    if(userSequence.length < computerSequence.length){ 
        userSequence.push(count)
        addClassBox($box)
        checkSequence()
        if(userSequence.length === computerSequence.length){
              setTimeout(() => {
                userSequence = []
                gameInicialized()
            }, 1000)
        }
    }
}

function unblockInputUser() {
    document.querySelectorAll('.box').forEach(($box,i) => {
      $box.onclick = (() => {
          userTurn($box,i);
      })
    });
}

function blockUserInput() {
    document.querySelectorAll('.box').forEach(($box) => {
      $box.onclick = () => {
        };
    });
}

function startGame(){
    const $buttonStart = document.querySelector('#button-start')    
    $buttonStart.addEventListener('click', () => {
        if(!isGameStarted){
            gameInicialized()
        }else{
            resetGame()
        }
    })
}

startGame()
