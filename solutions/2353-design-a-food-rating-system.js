/**
 * Design A Food Rating System
 * Intuition: To efficiently retrieve the highest-rated food for a cuisine, a max-heap (priority queue) is suitable for each cuisine. When a food's rating changes, adding a new entry to the heap and marking old entries as "stale" (by comparing against the current rating stored in a map) avoids costly heap deletions while maintaining correctness.
 * Approach: 1. Initialize three Maps in the constructor: `foodToCuisineMapping` stores each food's cuisine, `foodToActualRating` stores each food's current rating, and `cuisineToRatingHeaps` maps each cuisine to a max-priority queue. 2. The priority queue for each cuisine stores objects `{ food: string, rating: number }` and is ordered first by rating (descending), then by food name (ascending lexicographically for ties). 3. During initialization, populate these maps and enqueue initial food-rating pairs into their respective cuisine's priority queue. 4. For `changeRating(foodToModify, modifiedRatingValue)`: update `foodToActualRating` with the `modifiedRatingValue` and enqueue a new `{ foodToModify, rating: modifiedRatingValue }` entry into the corresponding cuisine's priority queue. This creates a potentially "stale" entry in the heap, which will be handled later. 5. For `highestRated(cuisineToQuery)`: retrieve the priority queue for `cuisineToQuery`. Repeatedly dequeue elements from the front of the queue until an entry `{ food: foodIdentifier, rating: entryRating }` is found where `entryRating` exactly matches `foodToActualRating.get(foodIdentifier)`. This ensures that any stale entries (those with outdated ratings) are skipped, and the first valid entry found is the highest-rated (with tie-breaking handled by the priority queue's comparator).
 * Dry Run:
 * FoodRatings(["apple", "banana"], ["fruit", "fruit"], [10, 5])
 *   - foodToCuisineMapping: {"apple" -> "fruit", "banana" -> "fruit"}
 *   - foodToActualRating: {"apple" -> 10, "banana" -> 5}
 *   - cuisineToRatingHeaps:
 *       "fruit": PQ (comparator: (a,b) => b.rating - a.rating || a.food.localeCompare(b.food))
 *         enqueue {food: "apple", rating: 10}
 *         enqueue {food: "banana", rating: 5}
 *         Heap contents (logical order): [{food: "apple", rating: 10}, {food: "banana", rating: 5}]
 *
 * changeRating("apple", 12)
 *   - cuisineForApple = foodToCuisineMapping.get("apple") -> "fruit"
 *   - foodToActualRating.set("apple", 12) -> {"apple" -> 12, "banana" -> 5}
 *   - cuisineToRatingHeaps.get("fruit").enqueue({food: "apple", rating: 12})
 *     Heap contents (logical order): [{food: "apple", rating: 12 (new)}, {food: "apple", rating: 10 (stale)}, {food: "banana", rating: 5}]
 *
 * highestRated("fruit")
 *   - targetHeap = cuisineToRatingHeaps.get("fruit")
 *   - Loop 1:
 *     - elementAtTop = targetHeap.front() -> {food: "apple", rating: 12}
 *     - currentActualRating = foodToActualRating.get("apple") -> 12
 *     - elementAtTop.rating (12) === currentActualRating (12) -> True.
 *     - Return "apple".
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var FoodRatings = function (foodsArray, cuisinesArray, ratingsArray) {
  this.foodToCuisineMapping = new Map();
  this.foodToActualRating = new Map();
  this.cuisineToRatingHeaps = new Map();

  for (let idx = 0; idx < foodsArray.length; idx++) {
    const currentFood = foodsArray[idx];
    const currentCuisine = cuisinesArray[idx];
    const currentRating = ratingsArray[idx];

    this.foodToCuisineMapping.set(currentFood, currentCuisine);
    this.foodToActualRating.set(currentFood, currentRating);

    if (!this.cuisineToRatingHeaps.has(currentCuisine)) {
      this.cuisineToRatingHeaps.set(
        currentCuisine,
        new PriorityQueue((itemA, itemB) => {
          if (itemA.rating !== itemB.rating) {
            return itemB.rating - itemA.rating;
          }
          return itemA.food.localeCompare(itemB.food);
        }),
      );
    }
    this.cuisineToRatingHeaps
      .get(currentCuisine)
      .enqueue({ food: currentFood, rating: currentRating });
  }
};

FoodRatings.prototype.changeRating = function (
  foodToModify,
  modifiedRatingValue,
) {
  const cuisineAssociated = this.foodToCuisineMapping.get(foodToModify);
  this.foodToActualRating.set(foodToModify, modifiedRatingValue);
  this.cuisineToRatingHeaps
    .get(cuisineAssociated)
    .enqueue({ food: foodToModify, rating: modifiedRatingValue });
};

FoodRatings.prototype.highestRated = function (cuisineToQuery) {
  const relevantFoodHeap = this.cuisineToRatingHeaps.get(cuisineToQuery);

  while (!relevantFoodHeap.isEmpty()) {
    const elementAtTop = relevantFoodHeap.front();
    const currentActualRating = this.foodToActualRating.get(elementAtTop.food);

    if (elementAtTop.rating === currentActualRating) {
      return elementAtTop.food;
    }
    relevantFoodHeap.dequeue();
  }
};
