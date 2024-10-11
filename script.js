let suits = ['♥', '♠', '♦', '♣']
let faceCards = ['J', 'Q', 'K', 'A']
let playerCards = []
let croupierCards = []
let stack = []
let card = {
    suit: '♦',
    number: '6',
    value: 6
   
}
$(document).ready(function () {

    $('.more').on('click', function () {
       getCardForPlayer();
    });
    let count = 0 
    playerCards.map(e => e.value).forEach(e => count += e )
if(count > 21){
    alert("lose")
   
}
$('.stop').on('click', function () {
    let playerValue = countValueCards(playerCards)

    while(countValueCards(croupierCards)+ stack[stack.length - 1].value<= 21){
        getCardForCroupier()
    }
    if(countValueCards(croupierCards) > playerValue){
        alert('Croupier win')
    }
    else alert('Player win')
});
     stack = generateStack()
    stack = shaffle(stack)
    stack.forEach(e => console.log(e))
    console.log(stack.length)

    startGame()

})

function startGame() {
    getCardForPlayer();
    getCardForPlayer();
    getCardForCroupier();
    getCardForCroupier();


}
function getCardForPlayer() {
    playerCards.push(stack.pop());
    drawPlayerCards()
if(countValueCards(playerCards)> 21){
    alert('lose')
}
}


function countValueCards(cards){
    let count = 0 
    cards.map(e => e.value).forEach(e => count += e )
    return count
}
function getCardForCroupier() {
    croupierCards.push(stack.pop());
    drawCroupierCard()
}


function generateHtmlCard(card) {
    let cardElement = document.createElement('div')
    $(cardElement).addClass('card');

    let cardNumberElement = document.createElement('div')
    let cardNumberElement1 = document.createElement('div')
    let cardSuitElement = document.createElement('div')
    let cardSuitElement1 = document.createElement('div')
    let centerElement = document.createElement('div')
    let topElement = document.createElement('div')
    let bottomElement = document.createElement('div')

    cardNumberElement.className = 'number'
    cardNumberElement.innerHTML = card.number

    cardNumberElement1.className = 'number'
    cardNumberElement1.innerHTML = card.number

    cardSuitElement.className = 'suit'
    cardSuitElement.innerHTML = card.suit

    cardSuitElement1.className = 'suit'
    cardSuitElement1.innerHTML = card.suit

    centerElement.className = 'center'
    centerElement.innerHTML = card.suit

    topElement.className = 'top'
    topElement.appendChild(cardNumberElement1)
    topElement.appendChild(cardSuitElement1)

    bottomElement.className = 'bottom'
    bottomElement.appendChild(cardSuitElement)
    bottomElement.appendChild(cardNumberElement)

    cardElement.appendChild(topElement)
    cardElement.appendChild(centerElement)
    cardElement.appendChild(bottomElement)

    if (card.suit === '♦' || card.suit === '♥') {
        $(cardElement).css('color', 'red');
    }

    return cardElement
}


function shaffle(stack) {
    let randomIndexA;
    let randomIndexB;
    let tmp;

    for (let i = 0; i < 100; i++) {
        randomIndexA = Math.floor(Math.random() * stack.length)
        randomIndexB = Math.floor(Math.random() * stack.length)

        tmp = stack[randomIndexA]
        stack[randomIndexA] = stack[randomIndexB]
        stack[randomIndexB] = tmp
    }
    return stack
}


function generateStack() {
    let stack = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j <= 10; j++) {
            stack.push({
                suit: suits[i],
                number: j,
                value: j
            });
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < faceCards.length; j++) {
            stack.push({
                suit: suits[i],
                number: faceCards[j],
                value: 10
            })
        }
    }
    return stack;

    

}

function drawCroupierCard() {
    $(".croupier-hand").html('');
    croupierCards.forEach(e => {
        $(".croupier-hand").html($('.croupier-hand').html().concat(`
        <div class="card" style="color: ${e.suit == '♥' || e.suit == '♦' ? 'red' : 'black'};">
            <div class="top">                                                                                                                                                                                                      
            <div class="number">${e.number}</div>
            <div class="suit">${e.suit}</div>
            </div>
            <div class="center">${e.suit}</div>
            <div class="bottom">
            <div class="suit">${e.suit}</div>
            <div class="number">${e.number}</div>
            </div></div>
              `
        ));
        })
}


function drawPlayerCards() {

    $(".player-hand").html('');
    playerCards.forEach(e => {
        $(".player-hand").html($('.player-hand').html().concat(`
        
        <div class="card" style="color: ${e.suit == '♥' || e.suit == '♦' ? 'red' : 'black'};">
        <div class="top">
            <div class="number">${e.number}</div>
            <div class="suit">${e.suit}</div>
        </div>
        <div class="center">${e.suit}</div>
        <div class="bottom">
            <div class="suit">${e.suit}</div>
            <div class="number">${e.number}</div>
        </div>
    </div>

        `));


    })
    
}
