/**
 * Find All Possible Recipes From Given Supplies
 * Intuition: A recipe can be made if all its ingredients are available. If an ingredient is itself a recipe, it must first be made. This creates a dependency chain, which can be resolved using a topological sort.
 * Approach:
 * 1. Initialize a set `initialProvisions` with all given `supplies` for efficient lookup of available items.
 * 2. Create two maps: `ingredientToRecipeMap` to represent a graph where keys are items (ingredients or recipes) and values are lists of recipes that require that item. Also, create `recipeIngredientCounts` to store the number of prerequisites (ingredients) each recipe still needs before it can be made.
 * 3. Populate these maps: Iterate through each recipe and its ingredients. For each recipe, set its initial unmet ingredient count in `recipeIngredientCounts` to its total number of ingredients. For each of its ingredients, add the current recipe name to the list in `ingredientToRecipeMap` associated with that ingredient.
 * 4. Initialize a queue `cookableItems`. Iterate through `initialProvisions`. For each `presentSupply`, if it is an ingredient for any recipe (i.e., it exists as a key in `ingredientToRecipeMap`), decrement the corresponding `recipeIngredientCounts` for all recipes that depend on this `presentSupply`. If any recipe's count drops to zero, add that recipe to `cookableItems`.
 * 5. Process `cookableItems`: While the queue is not empty, dequeue an `activeRecipe`. Add this `activeRecipe` to `finalRecipes`. Then, treat this `activeRecipe` as a newly available supply. Check `ingredientToRecipeMap` for any recipes that use `activeRecipe` as an ingredient. For each `consumingRecipe`, decrement its `recipeIngredientCounts`. If `consumingRecipe`'s count becomes zero, enqueue it into `cookableItems`.
 * 6. Return the `finalRecipes` list, which contains all recipes that can be made.
 * Dry Run:
 * recipes = ["bread"]
 * ingredients = [["yeast","flour"]]
 * supplies = ["yeast","flour","salt"]
 *
 * 1. initialProvisions = {"yeast", "flour", "salt"}
 * 2. ingredientToRecipeMap = new Map()
 *    recipeIngredientCounts = new Map()
 * 3. Loop `recipeIndex` from 0 to 0 (for "bread"):
 *    `currentRecipeName` = "bread"
 *    `requiredComponents` = ["yeast", "flour"]
 *    `recipeIngredientCounts`.set("bread", 2)
 *    For `singleComponent` in `requiredComponents`:
 *      - `singleComponent` = "yeast": `ingredientToRecipeMap`.set("yeast", ["bread"])
 *      - `singleComponent` = "flour": `ingredientToRecipeMap`.set("flour", ["bread"])
 *    State: `ingredientToRecipeMap` = {"yeast": ["bread"], "flour": ["bread"]}, `recipeIngredientCounts` = {"bread": 2}
 *
 * 4. `cookableItems` = []
 *    For `presentSupply` in `initialProvisions`:
 *      - `presentSupply` = "yeast": `ingredientToRecipeMap` has "yeast".
 *        `recipesDependentOnSupply` = ["bread"]
 *        For `subsequentRecipe` in `recipesDependentOnSupply`:
 *          `subsequentRecipe` = "bread"
 *          `remainingDependencies` = `recipeIngredientCounts`.get("bread") - 1 = 2 - 1 = 1
 *          `recipeIngredientCounts`.set("bread", 1) (1 != 0, so "bread" not enqueued)
 *      - `presentSupply` = "flour": `ingredientToRecipeMap` has "flour".
 *        `recipesDependentOnSupply` = ["bread"]
 *        For `subsequentRecipe` in `recipesDependentOnSupply`:
 *          `subsequentRecipe` = "bread"
 *          `remainingDependencies` = `recipeIngredientCounts`.get("bread") - 1 = 1 - 1 = 0
 *          `recipeIngredientCounts`.set("bread", 0) (0 == 0, so `cookableItems`.push("bread"))
 *      - `presentSupply` = "salt": `ingredientToRecipeMap` does not have "salt".
 *    State: `cookableItems` = ["bread"], `recipeIngredientCounts` = {"bread": 0}
 *
 * 5. `finalRecipes` = []
 *    While `cookableItems.length > 0`:
 *      `activeRecipe` = `cookableItems`.shift() -> "bread"
 *      `finalRecipes`.push("bread")
 *      `ingredientToRecipeMap` does not have "bread" as a key (meaning no other recipes use "bread" as an ingredient in this example).
 *    `cookableItems` is now empty. Loop ends.
 *
 * 6. Return `finalRecipes` = ["bread"].
 * Time Complexity: O(R + I + S)
 * Space Complexity: O(R + I + S)
 */
var findAllRecipes = function (recipes, ingredients, supplies) {
  const initialProvisions = new Set(supplies);
  const ingredientToRecipeMap = new Map();
  const recipeIngredientCounts = new Map();
  const cookableItems = [];
  const finalRecipes = [];

  for (let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
    const currentRecipeName = recipes[recipeIndex];
    const requiredComponents = ingredients[recipeIndex];
    recipeIngredientCounts.set(currentRecipeName, requiredComponents.length);

    for (const singleComponent of requiredComponents) {
      if (!ingredientToRecipeMap.has(singleComponent)) {
        ingredientToRecipeMap.set(singleComponent, []);
      }
      ingredientToRecipeMap.get(singleComponent).push(currentRecipeName);
    }
  }

  for (const presentSupply of initialProvisions) {
    if (ingredientToRecipeMap.has(presentSupply)) {
      const recipesDependentOnSupply = ingredientToRecipeMap.get(presentSupply);
      for (const subsequentRecipe of recipesDependentOnSupply) {
        let remainingDependencies =
          recipeIngredientCounts.get(subsequentRecipe) - 1;
        recipeIngredientCounts.set(subsequentRecipe, remainingDependencies);
        if (remainingDependencies === 0) {
          cookableItems.push(subsequentRecipe);
        }
      }
    }
  }

  while (cookableItems.length > 0) {
    const activeRecipe = cookableItems.shift();
    finalRecipes.push(activeRecipe);

    if (ingredientToRecipeMap.has(activeRecipe)) {
      const recipesUsingActive = ingredientToRecipeMap.get(activeRecipe);
      for (const consumingRecipe of recipesUsingActive) {
        let currentDependencyCount =
          recipeIngredientCounts.get(consumingRecipe) - 1;
        recipeIngredientCounts.set(consumingRecipe, currentDependencyCount);
        if (currentDependencyCount === 0) {
          cookableItems.push(consumingRecipe);
        }
      }
    }
  }

  return finalRecipes;
};
