/**
 * Generate Fibonacci Sequence
 * Intuition: The Fibonacci sequence is defined by the sum of its two preceding numbers. A generator function can efficiently produce these numbers one by one, maintaining only the necessary state (the last two numbers) between yields, without computing the entire sequence upfront.
 * Approach: 1. Initialize two variables, `firstTerm` to 0 and `secondTerm` to 1, representing the first two numbers in the sequence. 2. Enter an infinite loop to continually generate Fibonacci numbers. 3. Inside the loop, `yield` the current `firstTerm`. 4. Calculate the `sumOfTerms` by adding `firstTerm` and `secondTerm`. 5. Update the variables: `firstTerm` takes the value of the old `secondTerm`, and `secondTerm` takes the value of the newly calculated `sumOfTerms`.
 * Dry Run:
 *   - Initial: `firstTerm = 0`, `secondTerm = 1`
 *   - Iteration 1:
 *     - `yield 0`
 *     - `sumOfTerms = 0 + 1 = 1`
 *     - `firstTerm = 1`
 *     - `secondTerm = 1`
 *   - Iteration 2:
 *     - `yield 1`
 *     - `sumOfTerms = 1 + 1 = 2`
 *     - `firstTerm = 1`
 *     - `secondTerm = 2`
 *   - Iteration 3:
 *     - `yield 1`
 *     - `sumOfTerms = 1 + 2 = 3`
 *     - `firstTerm = 2`
 *     - `secondTerm = 3`
 *   - Iteration 4:
 *     - `yield 2`
 *     - `sumOfTerms = 2 + 3 = 5`
 *     - `firstTerm = 3`
 *     - `secondTerm = 5`
 *   ...and so on, generating 0, 1, 1, 2, 3, 5, ...
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var fibGenerator = function* () {
  let firstTerm = 0;
  let secondTerm = 1;

  while (true) {
    yield firstTerm;
    let sumOfTerms = firstTerm + secondTerm;
    firstTerm = secondTerm;
    secondTerm = sumOfTerms;
  }
};
