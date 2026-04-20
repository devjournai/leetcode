/**
 * String Without Aaa Or Bbb
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
