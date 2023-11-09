let recipeData;

try {
  const response = await fetch("./utils/recipes.json");
  recipeData = await response.json();
  console.log("recipeData: ", recipeData);
} catch (error) {
  console.error(error);
}

const recipeDataResults = recipeData.results;
const recipeIngredientComponents = recipeDataResults.map((recipe) =>
  recipe.sections[0].components.map((component) => component)
);
const isVisible = "is-visible";

// Function to create a recipe card
function createRecipeCard(recipe) {
  const recipeCardDiv = document.createElement("div");
  recipeCardDiv.classList.add("recipe-card__grid-container__items");

  recipeCardDiv.innerHTML = `
        <img src="${recipe.thumbnail_url}">
        <h2>${recipe.name}</h2>
        <button class="recipe-card__button">Get recipe</button>
    `;
  return recipeCardDiv;
}

// Function to display search results
function displaySearchResults(results) {
  const searchResultsList = document.getElementById("search-results-list");
  const errorMessage = document.getElementById("error-message");
  const searchResultsHeading = document.getElementById(
    "search-results-heading"
  );

  searchResultsList.innerHTML = "";

  if (results.length === 0) {
    errorMessage.style.display = "block";
    searchResultsHeading.style.display = "block";
  } else {
    results.forEach((recipe) => {
      const recipeCardDiv = createRecipeCard(recipe);
      searchResultsList.appendChild(recipeCardDiv);
    });
  }
}

// Event listener for form submission
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const searchTerm = document
    .getElementById("search")
    .value.trim()
    .toLowerCase();
  const searchResultsHeading = document.getElementById(
    "search-results-heading"
  );
  if (searchTerm === "") {
    displaySearchResults(recipeDataResults);
  } else {
    const results = recipeDataResults.filter((recipe) => {
      return recipe.sections.some((section) =>
        section.components.some((component) =>
          component.ingredient.name.toLowerCase().includes(searchTerm)
        )
      );
    });

    displaySearchResults(results);
    searchResultsHeading.style.display = "block";
  }
});

displaySearchResults(recipeDataResults);

// Get recipe - Modal
let recipeModal = document.createElement("section");

// Creates a new HTML element with optional class names and attributes.
function createElement(tagName, classNames = [], attributes = {}) {
  const element = document.createElement(tagName);
  element.classList.add(...classNames);
  for (const [attribute, value] of Object.entries(attributes)) {
    element.setAttribute(attribute, value);
  }
  return element;
}

function createRecipeModal(recipeData) {
  recipeModal.classList.add("recipe-modal");

  let recipeModalContainer = createElement("section", [
    "recipe-modal__container",
  ]);
  let recipeModalCloseButton = createElement("button", [
    "recipe-modal__close-button",
  ]);
  let recipeModalContent = createElement("section", ["recipe-modal__content"]);

  let recipeDetailsSectionContainer = createElement("section");
  let recipeTitleHeader = createElement("h2");
  let recipeName = createElement("p");

  let recipeNutritionSectionContainer = createElement("section");
  let recipeNutritionHeader = createElement("h3");
  let recipeNutrition = createElement("p");
 let recipeNutritionRectanglesContainer = document.createElement("div");

  let recipeIngredientsSectionContainer = createElement("section");
  let recipeIngredientsHeader = createElement("h3");
  let recipeIngredientsUl = createElement("ul");

  let recipeInstructionsSectionContainer = createElement("section");
  let recipeInstructionsHeader = createElement("h3");
  let recipeInstructions = createElement("p");

  let recipeImageSectionContainer = createElement("section");
  let recipeImage = createElement("img");

  let recipeVideoLinkSectionContainer = createElement("section", [
    "recipe-modal__video-container",
  ]);
  let recipeVideoLink = createElement("a", [], {
    target: "_blank",
    rel: "noopener noreferrer",
    href: recipeData.original_video_url,
    "data-title": `'${recipeData.name}' external video link will open on a new tab`,
  });

  recipeModal.appendChild(recipeModalContainer);

  recipeModalContainer.append(recipeModalCloseButton, recipeModalContent);

  recipeModalContent.appendChild(recipeDetailsSectionContainer);

  recipeDetailsSectionContainer.append(
    recipeImageSectionContainer,
    recipeVideoLinkSectionContainer,
    recipeTitleHeader,
    recipeName,
    recipeNutritionSectionContainer,
    recipeIngredientsSectionContainer,
    recipeInstructionsSectionContainer,
    );

  recipeNutritionSectionContainer.append(
    recipeNutritionHeader,
    recipeNutrition
  );

  recipeNutrition.appendChild(recipeNutritionRectanglesContainer);

  recipeIngredientsSectionContainer.append(
    recipeIngredientsHeader,
    recipeIngredientsUl
  );

  recipeInstructionsSectionContainer.append(
    recipeInstructionsHeader,
    recipeInstructions
  );

  recipeImageSectionContainer.appendChild(recipeImage);

  recipeVideoLinkSectionContainer.appendChild(recipeVideoLink);

  recipeModalCloseButton.innerHTML = "X";

  recipeTitleHeader.innerHTML = recipeData.name;

  recipeNutritionHeader.innerHTML = "Nutrition:";
  recipeNutritionRectanglesContainer.classList.add("nutrition-rectangles-container");
  
    const nutritionKeyMap = {
    calories: "Calories",
    carbohydrates: "Carbs",
    sugar: "Sugar",
    fiber: "Fiber",
    fat: "Fat",
    protein: "Protein",
  };
  
 
  const caloriesValue = recipeData.nutrition.calories;
  if (caloriesValue !== undefined) {
    const recipeNutritionRectangle = document.createElement("div");
    recipeNutritionRectangle.classList.add("nutrition-rectangle");
   
  
    const recipeNutritionTitle = document.createElement("div");
    recipeNutritionTitle.classList.add("nutrition-title");
    recipeNutritionTitle.innerText = nutritionKeyMap.calories;
  
    const recipeNutritionAmount = document.createElement("div");
    recipeNutritionAmount.classList.add("nutrition-amount");
    recipeNutritionAmount.innerText = `${caloriesValue}kcals`;
  
    recipeNutritionRectangle.appendChild(recipeNutritionTitle);
    recipeNutritionRectangle.appendChild(recipeNutritionAmount);
    recipeNutritionRectanglesContainer.appendChild(recipeNutritionRectangle);
  }
  
 
  for (const [key, value] of Object.entries(recipeData.nutrition)) {

    if (key === 'updated_at' || key === 'calories') {
      continue;
    }
  
    const recipeNutritionRectangle = document.createElement("div");
    recipeNutritionRectangle.classList.add("nutrition-rectangle");
    
  
    const recipeNutritionTitle = document.createElement("div");
    recipeNutritionTitle.classList.add("nutrition-title");
    recipeNutritionTitle.innerText = nutritionKeyMap[key] || key;
  
    const recipeNutritionAmount = document.createElement("div");
    recipeNutritionAmount.classList.add("nutrition-amount");
    recipeNutritionAmount.innerText = `${value}g`;
  
    recipeNutritionRectangle.appendChild(recipeNutritionTitle);
    recipeNutritionRectangle.appendChild(recipeNutritionAmount);
    recipeNutritionRectanglesContainer.appendChild(recipeNutritionRectangle);

    if (key === 'updated_at') {
      continue;
    }
    let formattedValue = key === 'calories' ? `${value}kcals` : `${value}g`;
    const listItem = document.createElement("li");
    listItem.innerHTML = `&bull; ${key}: ${formattedValue}`; 
    recipeNutritionUl.appendChild(listItem);
  }

  recipeIngredientsHeader.innerHTML = "Ingredients:";

  for (const section of recipeData.sections) {
    for (const component of section.components) {
      const measurement = component.measurements[0];
      const quantity =
        measurement.quantity === "0" ? "-" : measurement.quantity;
      const unit =
        quantity > 1
          ? measurement.unit.display_plural
          : measurement.unit.display_singular;
      const ingredientItem = document.createElement("li");
      const ingredientText = `${quantity} ${unit} ${component.ingredient.name}`;
      ingredientItem.innerText = ingredientText;
      ingredientItem.style.listStyle = "disc";
      recipeIngredientsUl.appendChild(ingredientItem);
    }
  }

  recipeInstructionsHeader.innerHTML = "Instructions:";
  recipeInstructions.innerHTML = recipeData.description;

  recipeImage.innerHTML = "Image:";
  recipeImage.setAttribute("src", recipeData.thumbnail_url);

  recipeVideoLink.innerHTML = "Watch video";
  recipeVideoLink.setAttribute("target", "_blank");
  recipeVideoLink.setAttribute("rel", "noopener noreferrer");
  recipeVideoLink.href = recipeData.original_video_url;
  recipeVideoLink.setAttribute(
    "data-title",
    `'${recipeData.name}' external video link will open on a new tab`
  );
  recipeModalCloseButton.addEventListener("click", onClickCloseRecipeModal);

  return recipeModal;
}

function displayRecipeModalContent(results) {
  // Remove any existing modal content
  const existingModal = document.querySelector(".recipe-modal");
  if (existingModal) {
    existingModal.remove();
  }

  // Create a new recipeModal element
  recipeModal = document.createElement("section");

  const recipeModalSection = createRecipeModal(results);
  document.body.appendChild(recipeModalSection);
}

// Event delegation for recipe cards
document
  .getElementById("search-results-list")
  .addEventListener("click", (event) => {
    const recipeCardButton = event.target.closest(".recipe-card__button");
    if (recipeCardButton) {
      const recipeCardDiv = recipeCardButton.closest(
        ".recipe-card__grid-container__items"
      );
      const index = Array.from(recipeCardDiv.parentNode.children).indexOf(
        recipeCardDiv
      );
      const recipe = recipeDataResults[index];
      onClickHandlerGetRecipeButton(recipe);
    }
  });

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = 'auto';
}

function onClickHandlerGetRecipeButton(recipe) {
  disableScroll();
  displayRecipeModalContent(recipe);
  recipeModal.classList.add(isVisible);
}

function onClickCloseRecipeModal() {
  enableScroll();
  recipeModal.classList.remove(isVisible);
}

document.addEventListener("click", (e) => {
  if (e.target == document.querySelector(".recipe-modal.is-visible")) {
    document
      .querySelector(".recipe-modal.is-visible")
      .classList.remove(isVisible);
    enableScroll();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key == "Escape" && document.querySelector(".recipe-modal.is-visible")) {
    document
      .querySelector(".recipe-modal.is-visible")
      .classList.remove(isVisible);
  }
});

// Event listener for the "Clear" button
document.querySelector("form").addEventListener("reset", () => {
  document.getElementById("search").value = "";
  displaySearchResults(recipeDataResults);
});

// Event listener for the "input" event
document.getElementById("search").addEventListener("input", () => {
  const searchTerm = document
    .getElementById("search")
    .value.trim()
    .toLowerCase();
  if (searchTerm === "") {
    displaySearchResults(recipeDataResults);
  }
});

// Scroll to top
const scrollToTopButton = document.getElementById("scrollToTop");

window.onscroll = function () {
  var button = document.getElementById("scrollToTop");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
};

scrollToTopButton.addEventListener("click", () => {
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
});