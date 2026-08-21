/**
 * Reverse String II
 * Intuition: Process the string in chunks of `2k`. Reverse only the first `k` characters of each chunk (or whatever remains if fewer than `k` are left) and leave the next `k` untouched.
 * Approach: 1. Split `s` into `charList`. 2. Walk `currentPosition` from 0 by steps of `2k`. 3. For each step, reverse the closed range `[currentPosition, min(currentPosition + k - 1, last index)]` with two pointers. 4. Join `charList` and return.
 * Dry Run: s = "abcdefg", k = 2.
 *   - Reverse [0,1]: "bacdefg"
 *   - Skip next 2, reverse [4,5]: "bacdfeg". Return "bacdfeg".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var reverseStr = function (s, k) {
  const charList = s.split("");
  const totalCharCount = charList.length;
  let currentPosition = 0;

  while (currentPosition < totalCharCount) {
    let blockInitial = currentPosition;
    let blockFinal = Math.min(currentPosition + k - 1, totalCharCount - 1);

    let leftSwapIndex = blockInitial;
    let rightSwapIndex = blockFinal;

    while (leftSwapIndex < rightSwapIndex) {
      let temporaryHolder = charList[leftSwapIndex];
      charList[leftSwapIndex] = charList[rightSwapIndex];
      charList[rightSwapIndex] = temporaryHolder;

      leftSwapIndex++;
      rightSwapIndex--;
    }

    currentPosition += 2 * k;
  }

  return charList.join("");
};
