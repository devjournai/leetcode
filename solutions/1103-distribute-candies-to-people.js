/**
 * Distribute Candies To People
 * Intuition: Gifts 1,2,3,… wrap around the people until candies run out; the last person may get a remainder smaller than the next triangular amount.
 * Approach: 1. Zero an array of size numPeople. 2. Give min(k, remaining) to person (k-1) mod n. 3. Increase k and decrement remaining until none left.
 * Dry Run: candies=7, numPeople=4. Gifts 1,2,3, then 1 leftover → [1,2,3,1].
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
