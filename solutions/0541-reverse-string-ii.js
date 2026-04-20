/**
 * Reverse String II
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
