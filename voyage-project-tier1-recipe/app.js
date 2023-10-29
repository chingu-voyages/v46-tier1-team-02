let recipeData;

try {
    recipeData = await fetch("./utils/recipes.json").then(response => response.json()).then(data => data);
    console.log("recipeData: ", recipeData);
}
catch (error) {
    console.error(error);
}

const recipeDataResults = recipeData.results;
const recipeIngredientComponents = recipeDataResults.map(recipe => recipe.sections[0].components.map(component => component));
const isVisible = "is-visible";

// Function to create a recipe card
function createRecipeCard(recipe) {
    let recipeCardDiv = document.createElement("div");
    let recipeCardImage = document.createElement("img");
    let recipeCardHeader = document.createElement("h2");
    let recipeCardButton = document.createElement("button");
    recipeCardDiv.classList.add("recipe-card__grid-container__items");

    recipeCardImage.src = recipe.thumbnail_url;
    recipeCardHeader.innerHTML = recipe.name;
    recipeCardButton.classList.add("recipe-card__button");
    recipeCardButton.innerHTML = "Get recipe";

    recipeCardDiv.appendChild(recipeCardImage);
    recipeCardDiv.appendChild(recipeCardHeader);
    recipeCardDiv.appendChild(recipeCardButton);

    recipeCardButton.addEventListener("click", function () {
        onClickHandlerGetRecipeButton(recipe);
    }, false);

    return recipeCardDiv;  // Return the completed recipe card
}

// Function to display search results
function displaySearchResults(results) {
    const searchResultsList = document.getElementById("search-results-list");
    const errorMessage = document.getElementById("error-message");
    const searchResultsHeading = document.getElementById("search-results-heading");

    searchResultsList.innerHTML = "";

    if (results.length === 0) {
        errorMessage.style.display = "block";// Display the error message if there are no results
        searchResultsHeading.style.display = "block"; // Make the hidden heading visible
    } else {
        results.forEach((recipe) => {
            const recipeCardDiv = createRecipeCard(recipe);
            searchResultsList.appendChild(recipeCardDiv);
        });
    }
}

// Event listener for form submission
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    const searchTerm = document.getElementById("search").value.trim().toLowerCase();
    const searchResultsHeading = document.getElementById("search-results-heading");
    if (searchTerm === "") {
        displaySearchResults(recipeDataResults); // Display all recipes when the search term is empty
    } else {
        const results = recipeDataResults.filter((recipe) => {
            // Check if the ingredient list of the recipe contains the search term
            return recipe.sections.some((section) =>
                section.components.some(
                    (component) =>
                        component.ingredient.name.toLowerCase().includes(searchTerm)
                )
            );
        });

        displaySearchResults(results); // Display the filtered results
        searchResultsHeading.style.display = "block"; // Make the hidden heading visible
    }
});

displaySearchResults(recipeDataResults);

// Get recipe - Modal
let recipeModal = document.createElement("section");
const recipeIngredientArray = recipeDataResults.map(recipe => recipe.sections[0].components.map(component => component));

Object.values(recipeIngredientArray).forEach(val => {
    val.forEach(ingredient => {
        // log ingredients
        console.log("ingredient: ", ingredient);
    })
});

function createRecipeModal(recipeData) {
    recipeModal.classList.add("recipe-modal");

    let recipeModalContainer = document.createElement("section");
    recipeModalContainer.classList.add("recipe-modal__container");

    let recipeModalCloseButton = document.createElement("button");
    recipeModalCloseButton.classList.add("recipe-modal__close-button");

    let recipeModalContent = document.createElement("section");
    recipeModalContent.classList.add("recipe-modal__content");

    let recipeDetailsSectionContainer = document.createElement("section");
    let recipeTitleHeader = document.createElement("h2");
    let recipeName = document.createElement("p");

    let recipeNutritionSectionContainer = document.createElement("section");
    let recipeNutritionHeader = document.createElement("h3");
    let recipeNutrition = document.createElement("p");
    let recipeNutritionUl = document.createElement("ul");

    let recipeIngredientsSectionContainer = document.createElement("section");
    let recipeIngredientsHeader = document.createElement("h3");
    let recipeIngredientsUl = document.createElement("ul");

    let recipeInstructionsSectionContainer = document.createElement("section");
    let recipeInstructionsHeader = document.createElement("h3");
    let recipeInstructions = document.createElement("p");

    let recipeImageSectionContainer = document.createElement("section");
    let recipeImage = document.createElement("img");

    let recipeVideoLinkSectionContainer = document.createElement("section");
    recipeVideoLinkSectionContainer.classList.add("recipe-modal__video-container");
    let recipeVideoLink = document.createElement("a");

    recipeModal.appendChild(recipeModalContainer);

    recipeModalContainer.appendChild(recipeModalCloseButton);
    recipeModalContainer.appendChild(recipeModalContent);

    recipeModalContent.appendChild(recipeDetailsSectionContainer);

    recipeDetailsSectionContainer.appendChild(recipeTitleHeader);
    recipeDetailsSectionContainer.appendChild(recipeName);
    recipeDetailsSectionContainer.appendChild(recipeNutritionSectionContainer);
    recipeDetailsSectionContainer.appendChild(recipeIngredientsSectionContainer);
    recipeDetailsSectionContainer.appendChild(recipeInstructionsSectionContainer);
    recipeDetailsSectionContainer.appendChild(recipeImageSectionContainer);
    recipeDetailsSectionContainer.appendChild(recipeVideoLinkSectionContainer);

    recipeNutritionSectionContainer.appendChild(recipeNutritionHeader);
    recipeNutritionSectionContainer.appendChild(recipeNutrition);
    recipeNutrition.appendChild(recipeNutritionUl);

    recipeIngredientsSectionContainer.appendChild(recipeIngredientsHeader);
    recipeIngredientsSectionContainer.appendChild(recipeIngredientsUl);

    recipeInstructionsSectionContainer.appendChild(recipeInstructionsHeader);
    recipeInstructionsSectionContainer.appendChild(recipeInstructions);

    recipeImageSectionContainer.appendChild(recipeImage);

    recipeVideoLinkSectionContainer.appendChild(recipeVideoLink);

    recipeModalCloseButton.innerHTML = "X";

    recipeTitleHeader.innerHTML = recipeData.name;

    recipeNutritionHeader.innerHTML = "Nutrition:";
    for (const [key, value] of Object.entries(recipeData.nutrition)) {
        console.log(`${key} ${value}`);
        recipeNutritionUl.innerHTML += '<li>' + `${key}: ${value}` + '</li>';
    }

    recipeIngredientsHeader.innerHTML = "Ingredients:";
    // TODO: display ingredients

    recipeInstructionsHeader.innerHTML = "Instructions:";
    recipeInstructions.innerHTML = recipeData.description;

    recipeImage.innerHTML = "Image:";
    recipeImage.setAttribute("src", recipeData.thumbnail_url);

    recipeVideoLink.innerHTML = "Watch video";
    recipeVideoLink.setAttribute("target", "_blank");
    recipeVideoLink.setAttribute("rel", "noopener noreferrer");
    recipeVideoLink.setAttribute("href", recipeData.original_video_url);
    recipeVideoLink.setAttribute("data-title", `'${recipeData.name}' external video link will open on a new tab`);

    recipeModalCloseButton.addEventListener("click", onClickCloseRecipeModal);

    return recipeModal;
}

function displayRecipeModalContent(results) {
    const recipeModalSection = createRecipeModal(results);
    document.body.appendChild(recipeModalSection);
}

function onClickHandlerGetRecipeButton(recipe) {
    displayRecipeModalContent(recipe);
    recipeModal.classList.add(isVisible);
}

function onClickCloseRecipeModal() {
    recipeModal.classList.remove(isVisible);
}

document.addEventListener("click", e => {
    if (e.target == document.querySelector(".recipe-modal.is-visible")) {
        document.querySelector(".recipe-modal.is-visible").classList.remove(isVisible);
    }
});

document.addEventListener("keyup", e => {
    if (e.key == "Escape" && document.querySelector(".recipe-modal.is-visible")) {
        document.querySelector(".recipe-modal.is-visible").classList.remove(isVisible);
    }
});