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

recipeDataResults.forEach((recipe) => {
    let recipeCardDiv = document.createElement("div");
    let recipeCardImage = document.createElement("img");
    let recipeCardHeader = document.createElement("h2");
    let recipeCardButton = document.createElement("button");
    recipeCardContainer.appendChild(recipeCardDiv).classList.add("recipe-card__grid-container__items");

    recipeCardDiv.appendChild(recipeCardImage).setAttribute("src", recipe.thumbnail_url);
    recipeCardDiv.appendChild(recipeCardHeader).innerHTML = recipe.name;
    recipeCardDiv.appendChild(recipeCardButton).classList.add("recipe-card__button");
    recipeCardDiv.appendChild(recipeCardButton).innerHTML = "Get recipe";

    recipeCardButton.addEventListener("click", onClickHandlerGetRecipeButton);
})
