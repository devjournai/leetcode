/**
 * 3sum
 * Intuition: After sorting, fix one number and two-pointer the rest toward sum 0, skipping duplicate values so each triplet is unique.
 * Approach: 1. Sort `arrayInput`. 2. For each `firstIndex`, skip if it equals the previous value. 3. Two-pointer `secondPointer`/`thirdPointer`. 4. If sum is 0, push the triplet and skip duplicate seconds/thirds; if sum < 0 increment second, else decrement third. 5. Return `tripletsOutput`.
 * Dry Run: arrayInput = [-1, 0, 1, 2] after sort same.
 *   - firstIndex=0 (-1), pointers 1 and 3: -1+0+2=1 > 0 → third--. -1+0+1=0 → push [-1,0,1]. Return that triplet.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var threeSum = function (arrayInput) {
  const tripletsOutput = [];
  arrayInput.sort((elementA, elementB) => elementA - elementB);

  for (let firstIndex = 0; firstIndex < arrayInput.length - 2; firstIndex++) {
    if (
      firstIndex > 0 &&
      arrayInput[firstIndex] === arrayInput[firstIndex - 1]
    ) {
      continue;
    }

    let secondPointer = firstIndex + 1;
    let thirdPointer = arrayInput.length - 1;

    while (secondPointer < thirdPointer) {
      const currentSum =
        arrayInput[firstIndex] +
        arrayInput[secondPointer] +
        arrayInput[thirdPointer];

      if (currentSum === 0) {
        tripletsOutput.push([
          arrayInput[firstIndex],
          arrayInput[secondPointer],
          arrayInput[thirdPointer],
        ]);
        secondPointer++;
        thirdPointer--;

        while (
          secondPointer < thirdPointer &&
          arrayInput[secondPointer] === arrayInput[secondPointer - 1]
        ) {
          secondPointer++;
        }
        while (
          secondPointer < thirdPointer &&
          arrayInput[thirdPointer] === arrayInput[thirdPointer + 1]
        ) {
          thirdPointer--;
        }
      } else if (currentSum < 0) {
        secondPointer++;
      } else {
        thirdPointer--;
      }
    }
  }

  return tripletsOutput;
};
