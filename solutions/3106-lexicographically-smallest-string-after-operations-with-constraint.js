/**
 * Lexicographically Smallest String After Operations With Constraint
 * Intuition: The lexicographically smallest string is made by turning left characters into 'a' as soon as the circular distance budget allows.
 * Approach: 1. For each prefix position, try the smallest letter reachable with remaining distance budget. 2. Distance to a letter is min(|c-t|, 26-|c-t|). 3. If distance to 'a' fits, set 'a' and spend that cost; otherwise decrease the letter by the leftover budget and stop.
 * Dry Run: s = "zbbz", k = 3. z->a costs 1 (k=2), b->a costs 1 (k=1), b->a costs 1 (k=0), last z stays; result "aaaz".
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
        97 + originalCode - remainingDistance
      );
      remainingDistance = 0;
    }
  }
  return resultChars.join("");
};
