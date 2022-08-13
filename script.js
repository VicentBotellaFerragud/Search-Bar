//Global variables:
const expressionTemplate = document.querySelector("[data-expression-template]");
const expressionCardsContainer = document.querySelector("[data-expression-cards-container]");
const searchInput = document.querySelector("[data-search]");
let latinExpressions = [];

/**
 * Fetches from the "https://jsonplaceholder.typicode.com/albums" website all the Latin expressions and for each one of them creates in the 
 * expressionCardsContainer a card with its title.
 */
fetch("https://jsonplaceholder.typicode.com/albums").then(res => res.json()).then(data => {

    //The map method more or less mimics the behavior of a typical for loop. A bunch of code is repeated for each data element.
    latinExpressions = data.map(expression => {

        const card = expressionTemplate.content.cloneNode(true).children[0]; //Creates a "card".
        const body = card.querySelector("[data-body]");
        body.textContent = expression.title; //Appends the expression title to the "card" body.
        expressionCardsContainer.append(card); //Appends the "card" to the expressionCardsContainer.

        //Defines the structure of the expression element (each element of the latinExpressions array has this structure) and returns it.
        //It's crucial that each expression element is returned because otherwise no element would be added to the latinExpressions
        //array (and, in order for the following addEventListener to have any effect, it is necessary that the array is not empty). In
        //other words, without the return statement the Latin expressions are displayed but the search bar doesn't work.
        return { title: expression.title, element: card }; 

    });

});

/**
 * Depending on the input value hides or displays Latin expressions (since the Latin expressions are already displayed on the web page when
 * this addEventListener is triggered, it never really displays Latin expressions, it simply hides some and leaves others as they are).
 */
searchInput.addEventListener("input", e => {

    const value = e.target.value.toLowerCase(); //Holds the input value.

    //For each element of the latinExpressions array (for each Latin expression), if the element title doesn't contain/include the
    //input value, the element is hidden. 
    latinExpressions.forEach(expression => {

        //Has a value of "true" if the element title contains/includes the input value and a value of "false" if not.
        const isVisible = expression.title.toLowerCase().includes(value); 

        //Hides the element if the previous "isVisible" variable has a value of "false".
        expression.element.classList.toggle("hide", !isVisible);

    });

});