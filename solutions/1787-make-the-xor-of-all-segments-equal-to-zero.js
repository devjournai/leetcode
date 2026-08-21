/**
 * Make The Xor Of All Segments Equal To Zero
 * Intuition: Every length-k window XOR being 0 forces the array to be periodic with period k and the k residues XOR to 0. DP over columns chooses a value (or a full rewrite) to reach each prefix XOR.
 * Approach: 1. Group indices i%k into `frequencyMaps`. 2. `minimumChangesDp[xor]` is min changes to reach that XOR after processed columns. 3. For each column, try keeping existing values (cost = column size minus frequency) or changing everything using the previous min. 4. Answer is `minimumChangesDp[0]`.
 * Dry Run: nums = [1,2,0,3,0], k = 1.
 *   - One column; make every value 0. Frequencies of 0 already 2 of 5 → 3 changes.
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
      (frequencyMaps[columnIdentifier].get(currentNumber) || 0) + 1
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
          costForThisOption
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
        smallestPreviousChangeCount + columnElementCount
      );
    }
  }

  return minimumChangesDp[0];
};
