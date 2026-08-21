/**
 * Lexicographically Smallest String After a Swap
 * Intuition: Only adjacent digits of the same parity may swap, and a single swap is allowed. The lexicographically smallest result comes from the leftmost descent between same-parity digits.
 * Approach: 1. Scan adjacent pairs from left to right. 2. On the first pair with equal parity and left > right, swap them and stop. 3. Return the resulting string.
 * Dry Run:
 *   s = "45320"
 *   4 and 5 different parity; 5 and 3 both odd and 5>3 -> swap to "43520".
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var getSmallestString = function (s) {
  const characters = s.split("");
  for (let currentIndex = 1; currentIndex < characters.length; currentIndex++) {
    const leftDigit = characters[currentIndex - 1];
    const rightDigit = characters[currentIndex];
    if (
      leftDigit.charCodeAt(0) % 2 === rightDigit.charCodeAt(0) % 2 &&
      leftDigit > rightDigit
    ) {
      characters[currentIndex - 1] = rightDigit;
      characters[currentIndex] = leftDigit;
      break;
    }
  }
  return characters.join("");
};
