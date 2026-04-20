/**
 * Smallest String With A Given Numeric Value
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var getSmallestString = function (n, k) {
  const asciiOfA = 97;
  const maxPossibleIncrease = 25;

  const stringBuilder = new Array(n).fill(String.fromCharCode(asciiOfA));
  let remainingRequiredSum = k - n;

  for (
    let currentForwardIndex = 0;
    currentForwardIndex < n && remainingRequiredSum > 0;
    currentForwardIndex++
  ) {
    const actualStringIndex = n - 1 - currentForwardIndex;

    const currentIncrease = Math.min(maxPossibleIncrease, remainingRequiredSum);
    stringBuilder[actualStringIndex] = String.fromCharCode(
      asciiOfA + currentIncrease,
    );
    remainingRequiredSum -= currentIncrease;
  }

  return stringBuilder.join("");
};
