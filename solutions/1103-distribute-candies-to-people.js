/**
 * Distribute Candies To People
 * Time Complexity: O(sqrt(candies))
 * Space Complexity: O(num_people)
 */
var distributeCandies = function (candies, numPeople) {
  let finalArrangement = new Array(numPeople).fill(0);
  let currentGiftCount = 1;
  let currentPersonSpot = 0;
  let totalCandiesLeft = candies;

  while (totalCandiesLeft > 0) {
    let actualGiftGiven = Math.min(currentGiftCount, totalCandiesLeft);
    finalArrangement[currentPersonSpot] += actualGiftGiven;
    totalCandiesLeft -= actualGiftGiven;
    currentGiftCount++;
    currentPersonSpot = (currentPersonSpot + 1) % numPeople;
  }

  return finalArrangement;
};
