/**
 * Minimum Flips To Make A Or B Equal To C
 * Time Complexity: O(log(max(a, b, c)))
 * Space Complexity: O(1)
 */
var minFlips = function (a, b, c) {
  let currentAValue = a;
  let currentBValue = b;
  let currentCValue = c;
  let flipOperations = 0;

  while (currentAValue > 0 || currentBValue > 0 || currentCValue > 0) {
    let bitA = currentAValue & 1;
    let bitB = currentBValue & 1;
    let bitC = currentCValue & 1;

    if ((bitA | bitB) !== bitC) {
      if (bitC === 0) {
        if (bitA === 1) {
          flipOperations++;
        }
        if (bitB === 1) {
          flipOperations++;
        }
      } else {
        flipOperations++;
      }
    }

    currentAValue >>= 1;
    currentBValue >>= 1;
    currentCValue >>= 1;
  }

  return flipOperations;
};
