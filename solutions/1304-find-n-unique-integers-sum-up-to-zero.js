/**
 * Find N Unique Integers Sum Up To Zero
 * Intuition: Pairs (k, -k) cancel. For odd n include 0 so the count matches and the sum stays 0.
 * Approach: 1. If n is odd, push 0. 2. For i from 1 to floor(n/2) push i and -i. 3. Return the list.
 * Dry Run: n = 5. Push 0, then (1,-1), (2,-2) → [0,1,-1,2,-2], sum 0.
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
