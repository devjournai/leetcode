/**
 * Elimination Game
 * Intuition: The remaining value is always the current first number `currentFinal`. After a pass, the list is every other element with doubled gap `currentJump`; we move `currentFinal` forward when we eliminate from the left, or from the right when the count is odd (the first item is also removed).
 * Approach: 1. Set `currentFinal=1`, `currentElements=n`, `currentJump=1`, `isMovingLeft=true`. 2. While more than one element remains: if left-to-right or `currentElements` is odd, add `currentJump` to `currentFinal`. 3. Halve `currentElements`, flip direction, double `currentJump`. 4. Return `currentFinal`.
 * Dry Run: n = 9, list 1 2 3 4 5 6 7 8 9.
 *   - L→R, odd count: currentFinal=1+1=2, n=4, jump=2, now R→L (2 4 6 8).
 *   - R→L, even: keep 2, n=2, jump=4, L→R (2 6).
 *   - L→R: currentFinal=2+4=6, n=1. Return 6.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var lastRemaining = function (n) {
  let currentFinal = 1;
  let currentElements = n;
  let currentJump = 1;
  let isMovingLeft = true;

  while (currentElements > 1) {
    if (isMovingLeft || currentElements % 2 === 1) {
      currentFinal += currentJump;
    }

    currentElements = Math.floor(currentElements / 2);
    isMovingLeft = !isMovingLeft;
    currentJump *= 2;
  }

  return currentFinal;
};
