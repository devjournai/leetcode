/**
 * String Without Aaa Or Bbb
 * Intuition: Greedily append the letter that still has more remaining count, unless the last two chars already match it (`possibleToAppendA`/`possibleToAppendB`).
 * Approach: 1. While a or b remain, compute whether a/b would make "aaa"/"bbb". 2. If counts equal, prefer a after b (or start). 3. If a>b pick a if allowed else b; symmetrically if b>a. 4. Join `finalSequence`.
 * Dry Run: a=1, b=2. More b's: append b, b, then a (cannot third b). Result "bba".
 * Time Complexity: O(a + b)
 * Space Complexity: O(a + b)
 */
var strWithout3a3b = function (a, b) {
  let countForA = a;
  let countForB = b;
  let finalSequence = [];

  const charAlpha = "a";
  const charBeta = "b";

  while (countForA > 0 || countForB > 0) {
    let shouldSelectAlpha = false;
    let shouldSelectBeta = false;

    let possibleToAppendA =
      countForA > 0 &&
      !(
        finalSequence.length >= 2 &&
        finalSequence[finalSequence.length - 1] === charAlpha &&
        finalSequence[finalSequence.length - 2] === charAlpha
      );
    let possibleToAppendB =
      countForB > 0 &&
      !(
        finalSequence.length >= 2 &&
        finalSequence[finalSequence.length - 1] === charBeta &&
        finalSequence[finalSequence.length - 2] === charBeta
      );

    if (countForA === countForB) {
      if (
        possibleToAppendA &&
        (finalSequence.length === 0 ||
          finalSequence[finalSequence.length - 1] === charBeta)
      ) {
        shouldSelectAlpha = true;
      } else if (possibleToAppendB) {
        shouldSelectBeta = true;
      }
    } else if (countForA > countForB) {
      if (possibleToAppendA) {
        shouldSelectAlpha = true;
      } else if (possibleToAppendB) {
        shouldSelectBeta = true;
      }
    } else {
      if (possibleToAppendB) {
        shouldSelectBeta = true;
      } else if (possibleToAppendA) {
        shouldSelectAlpha = true;
      }
    }

    if (shouldSelectAlpha) {
      finalSequence.push(charAlpha);
      countForA--;
    } else if (shouldSelectBeta) {
      finalSequence.push(charBeta);
      countForB--;
    }
  }

  return finalSequence.join("");
};
