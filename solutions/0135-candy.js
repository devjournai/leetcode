/**
 * Candy
 * Intuition: Each child needs more candy than a lower-rated neighbor. A left-to-right pass enforces increasing ratings to the left; a right-to-left pass enforces the other side, taking the max.
 * Approach: 1. Fill candies with 1. 2. Forward: if ratings[i] > ratings[i-1], candies[i] = candies[i-1]+1. 3. Backward: if ratings[i] > ratings[i+1], candies[i] = max(candies[i], candies[i+1]+1). 4. Sum the array.
 * Dry Run: ratings [1,0,2]. Forward → [1,1,2]. Backward: index 0 vs 0 needs 2. Result [2,1,2], sum 5.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var candy = function (ratings) {
  const totalChildren = ratings.length;
  const candiesGiven = new Array(totalChildren).fill(1);

  for (let childIndex = 1; childIndex < totalChildren; childIndex++) {
    if (ratings[childIndex] > ratings[childIndex - 1]) {
      candiesGiven[childIndex] = candiesGiven[childIndex - 1] + 1;
    }
  }

  for (
    let backwardIndex = totalChildren - 2;
    backwardIndex >= 0;
    backwardIndex--
  ) {
    if (ratings[backwardIndex] > ratings[backwardIndex + 1]) {
      candiesGiven[backwardIndex] = Math.max(
        candiesGiven[backwardIndex],
        candiesGiven[backwardIndex + 1] + 1
      );
    }
  }

  let finalCandySum = 0;
  for (const individualCandy of candiesGiven) {
    finalCandySum += individualCandy;
  }

  return finalCandySum;
};
