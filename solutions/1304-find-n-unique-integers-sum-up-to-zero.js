/**
 * Find N Unique Integers Sum Up To Zero
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var sumZero = function (n) {
  const generatedNumbers = [];

  if (n % 2 !== 0) {
    generatedNumbers.push(0);
  }

  let halfCount = Math.floor(n / 2);
  for (
    let currentIteration = 1;
    currentIteration <= halfCount;
    currentIteration++
  ) {
    generatedNumbers.push(currentIteration);
    generatedNumbers.push(-currentIteration);
  }

  return generatedNumbers;
};
