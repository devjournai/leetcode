/**
 * Contains Duplicate III
 * Intuition: Values within valueDiff fall in the same or adjacent buckets of width valueDiff+1. A map of bucket id → value, keeping only the last indexDiff indices, finds a nearby almost-duplicate in expected O(1) per step.
 * Approach: 1. Reject valueDiff < 0. 2. bucketSpan = valueDiff+1; bucket id = floor(num / span). 3. If this bucket is occupied, or an adjacent bucket holds a value within span, return true. 4. Insert the current value; once i >= indexDiff, delete the bucket of nums[i-indexDiff]. 5. Return false if none match.
 * Dry Run: nums = [1,2,3,1], indexDiff = 3, valueDiff = 0 (span = 1).
 *   - 1,2,3 go to buckets 1,2,3.
 *   - Next 1: bucket 1 already has 1 → true.
 * Time Complexity: O(N)
 * Space Complexity: O(min(N, indexDiff))
 */
var containsNearbyAlmostDuplicate = function (nums, indexDiff, valueDiff) {
  if (valueDiff < 0) {
    return false;
  }

  const numberBucketMap = new Map();
  const bucketSpan = valueDiff + 1;

  for (
    let currentElementPosition = 0;
    currentElementPosition < nums.length;
    currentElementPosition++
  ) {
    const currentNumericalValue = nums[currentElementPosition];
    const currentNumericalBucketIdentifier = Math.floor(
      currentNumericalValue / bucketSpan
    );

    if (numberBucketMap.has(currentNumericalBucketIdentifier)) {
      return true;
    }
    const precedingBucketIdentifier = currentNumericalBucketIdentifier - 1;
    if (numberBucketMap.has(precedingBucketIdentifier)) {
      const valueInPrecedingBucket = numberBucketMap.get(
        precedingBucketIdentifier
      );
      if (
        Math.abs(currentNumericalValue - valueInPrecedingBucket) < bucketSpan
      ) {
        return true;
      }
    }
    const succeedingBucketIdentifier = currentNumericalBucketIdentifier + 1;
    if (numberBucketMap.has(succeedingBucketIdentifier)) {
      const valueInSucceedingBucket = numberBucketMap.get(
        succeedingBucketIdentifier
      );
      if (
        Math.abs(currentNumericalValue - valueInSucceedingBucket) < bucketSpan
      ) {
        return true;
      }
    }

    numberBucketMap.set(
      currentNumericalBucketIdentifier,
      currentNumericalValue
    );

    if (currentElementPosition >= indexDiff) {
      const elementToEvictIndex = currentElementPosition - indexDiff;
      const elementToEvictValue = nums[elementToEvictIndex];
      const elementToEvictBucketIdentifier = Math.floor(
        elementToEvictValue / bucketSpan
      );
      numberBucketMap.delete(elementToEvictBucketIdentifier);
    }
  }

  return false;
};
