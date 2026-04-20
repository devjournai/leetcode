/**
 * Kids With The Greatest Number Of Candies
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
