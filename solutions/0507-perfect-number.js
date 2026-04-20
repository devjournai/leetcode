/**
 * Perfect Number
 * Time Complexity: O(sqrt(num))
 * Space Complexity: O(1)
 */
var checkPerfectNumber = function (num) {
  if (num <= 1) {
    return false;
  }

  let accumulatedSum = 1;

  for (
    let currentFactor = 2;
    currentFactor * currentFactor <= num;
    currentFactor++
  ) {
    if (num % currentFactor === 0) {
      accumulatedSum += currentFactor;
      if (currentFactor * currentFactor !== num) {
        accumulatedSum += num / currentFactor;
      }
    }
  }

  return accumulatedSum === num;
};
