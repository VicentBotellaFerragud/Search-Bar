const expressionTemplate = document.querySelector("[data-expression-template]");
const expressionCardsContainer = document.querySelector("[data-expression-cards-container]");
const searchInput = document.querySelector("[data-search]");

let latinExpressions = [];

/**
 * This function, called on page load, first takes data from the website "https://jsonplaceholder.typicode.com/albums". Then, it transforms 
 * it into a JSON object (which consists of an array of objects) and, finally, it modifies the "latinExpressions" array (actually, it 
 * creates a new one) by adding the "expression" element as many times as there are elements in the array of JSON objects. All "expression" 
 * elements are placed inside the "expressionCardsContainer".
 */
 fetch("https://jsonplaceholder.typicode.com/albums").then(res => res.json()).then(data => {
    latinExpressions = data.map(expression => {
        const card = expressionTemplate.content.cloneNode(true).children[0];
        const body = card.querySelector("[data-body]");
        body.textContent = expression.title;
        expressionCardsContainer.append(card);
        return { title: expression.title, element: card };
    });
});

setTimeout(() => {
    console.log(latinExpressions);
}, 5000);

/**
 * An Event listener is added to the search bar so that every time the user searches for an expression, the following happens.
 */
searchInput.addEventListener("input", e => {
    /**
     * Makes the value target (what is compared to the value) not "case-sensitive", which means that matches between the value and the 
     * elements of the "latinExpressions" array will occur regardless of whether the user types in upper or lower case.
     */
    const value = e.target.value.toLowerCase();
    /**
     * For each element in the "latinExpressions" array, if its title does NOT match the input value (what the user types), the CSS class 
     * "hide" is added to that element. This class is removed from any "expression" element if the input value matches the title of the 
     * "expression" element.
     */
    latinExpressions.forEach(expression => {
        const isVisible = expression.title.toLowerCase().includes(value);
        expression.element.classList.toggle("hide", !isVisible);
    });
});


