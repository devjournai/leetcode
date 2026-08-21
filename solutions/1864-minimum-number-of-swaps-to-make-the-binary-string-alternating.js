/**
 * Minimum Number Of Swaps To Make The Binary String Alternating
 * Intuition: An alternating string is 0101… or 1010…. If |#0−#1|>1 it is impossible. Each swap fixes two mismatches, so mismatches/2 is the swap count.
 * Approach: 1. Count zeros and ones; return -1 if difference > 1. 2. Count positions that fail the 0101… pattern (`mismatchesForZeroStart`) and 1010… (`mismatchesForOneStart`). 3. If counts equal, take min/2; else only the pattern that matches the majority bit.
 * Dry Run: s="111000". Equal counts; mismatches vs 010101 and 101010; min/2 = 1.
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
