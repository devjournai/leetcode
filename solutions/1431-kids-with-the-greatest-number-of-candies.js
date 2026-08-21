/**
 * Kids With The Greatest Number Of Candies
 * Intuition: After giving extraCandies, a kid has the greatest pile iff current + extra >= the current global max.
 * Approach: 1. Scan candies for the maximum. 2. For each kid, push whether kidCandyCount + extraCandies >= that max. 3. Return the boolean array.
 * Dry Run: candies = [2,3,5,1,3], extraCandies = 3
 *   - max = 5
 *   - 2+3=5 >=5 true; 3+3=6 true; 5+3 true; 1+3=4 false; 3+3 true
 *   - [true,true,true,false,true]
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var kidsWithCandies = function (candies, extraCandies) {
  let currentMaxCandies = 0;

  for (let loopIndex = 0; loopIndex < candies.length; loopIndex++) {
    let currentKidCandies = candies[loopIndex];
    if (currentKidCandies > currentMaxCandies) {
      currentMaxCandies = currentKidCandies;
    }
  }

  let finalResultsArray = [];

  for (let candyIndex = 0; candyIndex < candies.length; candyIndex++) {
    let kidCandyCount = candies[candyIndex];
    let totalPossibleCandies = kidCandyCount + extraCandies;
    let isGreatest = totalPossibleCandies >= currentMaxCandies;
    finalResultsArray.push(isGreatest);
  }

  return finalResultsArray;
};
