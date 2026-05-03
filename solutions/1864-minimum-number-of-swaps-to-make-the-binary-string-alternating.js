/**
 * Minimum Number Of Swaps To Make The Binary String Alternating
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minSwaps = function (s) {
  const stringLength = s.length;
  let zeroCount = 0;
  let oneCount = 0;

  for (
    let characterIterator = 0;
    characterIterator < stringLength;
    characterIterator++
  ) {
    const currentChar = s[characterIterator];
    if (currentChar === "0") {
      zeroCount++;
    } else {
      oneCount++;
    }
  }

  const countDifference = Math.abs(zeroCount - oneCount);
  if (countDifference > 1) {
    return -1;
  }

  let mismatchesForZeroStart = 0;
  let mismatchesForOneStart = 0;

  for (let positionIndex = 0; positionIndex < stringLength; positionIndex++) {
    const currentSymbol = s[positionIndex];

    if (positionIndex % 2 === 0) {
      if (currentSymbol !== "0") {
        mismatchesForZeroStart++;
      }
    } else {
      if (currentSymbol !== "1") {
        mismatchesForZeroStart++;
      }
    }

    if (positionIndex % 2 === 0) {
      if (currentSymbol !== "1") {
        mismatchesForOneStart++;
      }
    } else {
      if (currentSymbol !== "0") {
        mismatchesForOneStart++;
      }
    }
  }

  let minimumSwapsNeeded;

  if (zeroCount === oneCount) {
    minimumSwapsNeeded =
      Math.min(mismatchesForZeroStart, mismatchesForOneStart) >> 1;
  } else if (zeroCount > oneCount) {
    minimumSwapsNeeded = mismatchesForZeroStart >> 1;
  } else {
    minimumSwapsNeeded = mismatchesForOneStart >> 1;
  }

  return minimumSwapsNeeded;
};
