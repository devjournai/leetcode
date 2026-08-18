/**
 * Lexicographically Smallest String After Operations With Constraint
 * Approach: 1. For each prefix position, try the smallest letter reachable with remaining distance budget. 2. Distance to a letter is min(|c-t|, 26-|c-t|). 3. Spend the budget as soon as a smaller letter is possible, then continue.
 * Dry Run:
 *   s = "zbbz", k = 3 -> "aaaz" by changing z->a (cost 1) twice and leftover unused on last z? Actually first z to a costs 1, then we can change further. Standard greedy yields "aaaz" or "aaay" depending on remaining; walkccc: change towards 'a' from the left.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var getSmallestString = function (s, k) {
  const resultChars = s.split("");
  let remainingDistance = k;
  for (
    let charIndex = 0;
    charIndex < resultChars.length && remainingDistance > 0;
    charIndex++
  ) {
    const originalCode = resultChars[charIndex].charCodeAt(0) - 97;
    const distanceToA = Math.min(originalCode, 26 - originalCode);
    if (distanceToA <= remainingDistance) {
      resultChars[charIndex] = "a";
      remainingDistance -= distanceToA;
    } else {
      resultChars[charIndex] = String.fromCharCode(
        97 + originalCode - remainingDistance,
      );
      remainingDistance = 0;
    }
  }
  return resultChars.join("");
};
