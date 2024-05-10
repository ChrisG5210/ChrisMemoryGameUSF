const section = document.querySelector("#cards");
const attempts = document.querySelector("span");
let playerAttempts = 9;
attempts.textContent = playerAttempts;

//creating my images selction. 
//made this an array so its more organized.
const img = () => [
    {imgSrc: "ACDC.jpg" , name: "ACDC"},
    {imgSrc: "ACDC2.jpg" , name: "ACDC2"},
    {imgSrc: "MegadethCTDE.jpg" , name: "MegadethCTDE"},
    {imgSrc: "Megadeath-1.jpg" , name: "Megadeath-1"},
    {imgSrc: "Megadeth-Youthanasia.jpg" , name: "Megadeth-2"},
    {imgSrc: "MegadethRustInPeace.jpg" , name: "Megadeth-3"},
    {imgSrc: "Metallica.jpg" , name: "Metallica"},
    {imgSrc: "MetallicaRTL.jpg" , name: "Metallica-2"},
    {imgSrc: "ACDC.jpg" , name: "ACDC"},
    {imgSrc: "ACDC2.jpg" , name: "ACDC2"},
    {imgSrc: "MegadethCTDE.jpg" , name: "MegadethCTDE"},
    {imgSrc: "Megadeath-1.jpg" , name: "Megadeath-1"},
    {imgSrc: "Megadeth-Youthanasia.jpg" , name: "Megadeth-2"},
    {imgSrc: "MegadethRustInPeace.jpg" , name: "Megadeth-3"},
    {imgSrc: "Metallica.jpg" , name: "Metallica"},
    {imgSrc: "MetallicaRTL.jpg" , name: "Metallica-2"},
];
//Randomizing my images here. and returning a new array so it logs a different pattern. 
const random = () => {
    const imgData = img();
    imgData.sort (() => Math.random() - 0.5);
    return imgData;
}
//looping through the imgData to populate multiple cards.
//also made two divs to have a front and back of card. appended it to my playing section of the game. 
const cardRandomizer = () => {
    const imgData = random();
    imgData.forEach ((item) => {
        const card = document.createElement("div");
        const front = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        front.classList = "front";
        back.classList = "back";
        section.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
        //put my images to the card. 
        front.src = item.imgSrc;
        //attach the name to the cards 
        card.setAttribute('name' , item.name); 
        //create the click function on my cards
        card.addEventListener('click' , function(event){
            card.classList.toggle('toggleCard');
            cardValid(event);
        });
    });
};
//make sure all cards match.  
//using .target so we can capture the data from out click event listener.
//in the toggle section ^^ we are going to make sure the cards are actually valid. 
const cardValid = function (event){
    console.log(event)
    const clickedCard = event.target 
    clickedCard.classList.add('flipped');
    const flippedCard = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');
    console.log(flippedCard)
    //create the logic behind this function. 
    //meaning IF the card does not match ELSE IF do this., 
    if(flippedCard.length === 2){
        if(flippedCard[0].getAttribute('name') ===
         flippedCard[1].getAttribute('name')){
            console.log('match');
            flippedCard.forEach((card) => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            });
         }
         else{
            //remove the flipped affect so we can click on other cards. 
            console.log('wrong');
            flippedCard.forEach((card) => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('toggleCard') , 1000);
            });
            playerAttempts--;
            attempts.textContent = playerAttempts;
            if(playerAttempts === 0){
                reset("Good Try - Play Again!");
            };
         };  
    };
    //check to see if we won or lost.
 if(toggleCard.length === 16){
     reset("CONGRATULATIONS YOU WIN!");
 };
};

//Create a reset function if player uses max attempts. 
const reset = (text) => {
    let imgData = random();
    let front = document.querySelectorAll('.front');
    let deck = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    //loop over each card and remove the class list. 
    imgData.forEach((item , index) => {
       deck[index].classList.remove('toggleCard');
       //re-randomize all cards after reset so player does not cheat due to cards staying in same position
       setTimeout (() => {
        deck[index].style.pointerEvents = 'all';
        front[index].src = item.imgSrc;
        deck[index].setAttribute('name' , item.name);
        section.style.pointerEvents = 'all';
       },1000);
    });
    playerAttempts = 9;
    attempts.textContent = playerAttempts;
    setTimeout(() => window.alert(text), 100);
}


cardRandomizer();