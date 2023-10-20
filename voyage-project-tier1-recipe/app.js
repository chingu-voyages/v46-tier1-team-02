let recipeData;

try {
    recipeData = await fetch("./utils/recipes.json").then(response => response.json()).then(data => data);
    console.log("recipeData: ", recipeData);
}
catch (error) {
    console.error(error);
}

const recipeDataResults = recipeData.results;
const recipeCardContainer = document.getElementById("recipe-card-container");

function onClickHandlerGetRecipeButton() {
    console.log("Get recipe!");
}

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


