/**
 * Eat Pizzas!
 * Intuition: There are `n/4` days. Odd days score the largest pizza eaten that day; even days score the second-largest. Greedily spend the globally largest pizzas on odd-day scores, then take every other remaining pizza for even days (skipping the wasted “largest of four”).
 * Approach: 1. `eatDays = n / 4`. Odd days = ceil(eatDays / 2), even days = the rest. 2. Sort pizzas descending. 3. Add the first `oddDays` values. 4. Then from the next pizza, step by 2 and add `evenDays` values (the second of each leftover pair).
 * Dry Run: pizzas = [1,2,3,4,5,6,7,8], eatDays = 2, odd = 1, even = 1. Sorted [8,7,6,5,4,3,2,1]. Odd takes 8. Even takes 6 (skip 7). Total 14.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var maxWeight = function (pizzas) {
  const eatDays = Math.floor(pizzas.length / 4);
  const oddDays = Math.ceil(eatDays / 2);
  const evenDays = eatDays - oddDays;

  pizzas.sort((left, right) => right - left);

  let totalWeight = 0;
  for (let index = 0; index < oddDays; index++) {
    totalWeight += pizzas[index];
  }

  let evenIndex = oddDays + 1;
  for (let day = 0; day < evenDays; day++, evenIndex += 2) {
    totalWeight += pizzas[evenIndex];
  }

  return totalWeight;
};
