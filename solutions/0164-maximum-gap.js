/**
 * Maximum Gap
 * Intuition: The maximum adjacent difference after sorting is at least the pigeonhole gap `(max-min)/(n-1)`. Buckets of that width guarantee the answer is between bucket extremes, not inside a bucket.
 * Approach: 1. If `n < 2`, return 0. 2. Find `overallMinimumValue`/`overallMaximumValue`; if equal, return 0. 3. `calculatedBucketSize = max(1, floor((max-min)/(n-1)))` and allocate min/max/used arrays. 4. Place each value into a bucket and update that bucket's min/max. 5. Scan non-empty buckets, tracking `previousBucketHigh`, and take max of `bucketMin - previousBucketHigh`. 6. Also compare `overallMaximumValue - previousBucketHigh`. Return `maximumGapFound`.
 * Dry Run: nums = [3,6,9,1]
 * min=1, max=9, bucketSize=2. Buckets hold 1, 3, 6, 9. Consecutive occupied max-min gaps: 3-1=2, 6-3=3, 9-6=3
 * Result: 3
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumGap = function (nums) {
  const totalElements = nums.length;
  if (totalElements < 2) {
    return 0;
  }

  let overallMinimumValue = Infinity;
  let overallMaximumValue = -Infinity;

  for (
    let elementScanIndex = 0;
    elementScanIndex < totalElements;
    elementScanIndex++
  ) {
    const currentNumericalValue = nums[elementScanIndex];
    overallMinimumValue = Math.min(overallMinimumValue, currentNumericalValue);
    overallMaximumValue = Math.max(overallMaximumValue, currentNumericalValue);
  }

  if (overallMinimumValue === overallMaximumValue) {
    return 0;
  }

  const calculatedBucketSize = Math.max(
    1,
    Math.floor(
      (overallMaximumValue - overallMinimumValue) / (totalElements - 1)
    )
  );

  const numberOfBuckets =
    Math.floor(
      (overallMaximumValue - overallMinimumValue) / calculatedBucketSize
    ) + 1;

  const bucketMinValueStorage = new Array(numberOfBuckets).fill(Infinity);
  const bucketMaxValueStorage = new Array(numberOfBuckets).fill(-Infinity);
  const bucketContentStatus = new Array(numberOfBuckets).fill(false);

  for (
    let valuePlacementIndex = 0;
    valuePlacementIndex < totalElements;
    valuePlacementIndex++
  ) {
    const valueToDistribute = nums[valuePlacementIndex];

    const bucketDesignation = Math.floor(
      (valueToDistribute - overallMinimumValue) / calculatedBucketSize
    );

    bucketMinValueStorage[bucketDesignation] = Math.min(
      bucketMinValueStorage[bucketDesignation],
      valueToDistribute
    );
    bucketMaxValueStorage[bucketDesignation] = Math.max(
      bucketMaxValueStorage[bucketDesignation],
      valueToDistribute
    );
    bucketContentStatus[bucketDesignation] = true;
  }

  let maximumGapFound = 0;
  let previousBucketHigh = overallMinimumValue;

  for (
    let bucketIterationIndex = 0;
    bucketIterationIndex < numberOfBuckets;
    bucketIterationIndex++
  ) {
    if (!bucketContentStatus[bucketIterationIndex]) {
      continue;
    }

    maximumGapFound = Math.max(
      maximumGapFound,
      bucketMinValueStorage[bucketIterationIndex] - previousBucketHigh
    );
    previousBucketHigh = bucketMaxValueStorage[bucketIterationIndex];
  }

  maximumGapFound = Math.max(
    maximumGapFound,
    overallMaximumValue - previousBucketHigh
  );

  return maximumGapFound;
};
