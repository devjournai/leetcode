/**
 * 3sum
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
