/**
 * Make The Xor Of All Segments Equal To Zero
 * Time Complexity: O(N * (1 << 10))
 * Space Complexity: O(N + (1 << 10))
 */
var minChanges = function (nums, k) {
  const arrayLength = nums.length;
  const maximumXorValue = 1 << 10;

  const frequencyMaps = new Array(k).fill(null).map(() => new Map());

  for (
    let currentElementIndex = 0;
    currentElementIndex < arrayLength;
    currentElementIndex++
  ) {
    const columnIdentifier = currentElementIndex % k;
    const currentNumber = nums[currentElementIndex];
    frequencyMaps[columnIdentifier].set(
      currentNumber,
      (frequencyMaps[columnIdentifier].get(currentNumber) || 0) + 1,
    );
  }

  const minimumChangesDp = new Array(maximumXorValue).fill(arrayLength);
  minimumChangesDp[0] = 0;

  for (
    let currentGroupColumn = 0;
    currentGroupColumn < k;
    currentGroupColumn++
  ) {
    const previousMinimumChanges = Array.from(minimumChangesDp);
    minimumChangesDp.fill(arrayLength);

    const columnElementCount =
      Math.floor(arrayLength / k) +
      (currentGroupColumn < arrayLength % k ? 1 : 0);

    let smallestPreviousChangeCount = arrayLength;
    for (let dpIndex = 0; dpIndex < maximumXorValue; dpIndex++) {
      if (previousMinimumChanges[dpIndex] < smallestPreviousChangeCount) {
        smallestPreviousChangeCount = previousMinimumChanges[dpIndex];
      }
    }

    const currentGroupMap = frequencyMaps[currentGroupColumn];
    currentGroupMap.forEach((valueFrequency, elementValue) => {
      for (
        let prevXorResult = 0;
        prevXorResult < maximumXorValue;
        prevXorResult++
      ) {
        if (previousMinimumChanges[prevXorResult] === arrayLength) {
          continue;
        }
        const newXorResult = prevXorResult ^ elementValue;
        const costForThisOption =
          previousMinimumChanges[prevXorResult] +
          columnElementCount -
          valueFrequency;
        minimumChangesDp[newXorResult] = Math.min(
          minimumChangesDp[newXorResult],
          costForThisOption,
        );
      }
    });

    for (
      let targetXorValue = 0;
      targetXorValue < maximumXorValue;
      targetXorValue++
    ) {
      minimumChangesDp[targetXorValue] = Math.min(
        minimumChangesDp[targetXorValue],
        smallestPreviousChangeCount + columnElementCount,
      );
    }
  }

  return minimumChangesDp[0];
};
