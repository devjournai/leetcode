/**
 * Contains Duplicate III
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
      currentNumericalValue / bucketSpan,
    );

    if (numberBucketMap.has(currentNumericalBucketIdentifier)) {
      return true;
    }
    const precedingBucketIdentifier = currentNumericalBucketIdentifier - 1;
    if (numberBucketMap.has(precedingBucketIdentifier)) {
      const valueInPrecedingBucket = numberBucketMap.get(
        precedingBucketIdentifier,
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
        succeedingBucketIdentifier,
      );
      if (
        Math.abs(currentNumericalValue - valueInSucceedingBucket) < bucketSpan
      ) {
        return true;
      }
    }

    numberBucketMap.set(
      currentNumericalBucketIdentifier,
      currentNumericalValue,
    );

    if (currentElementPosition >= indexDiff) {
      const elementToEvictIndex = currentElementPosition - indexDiff;
      const elementToEvictValue = nums[elementToEvictIndex];
      const elementToEvictBucketIdentifier = Math.floor(
        elementToEvictValue / bucketSpan,
      );
      numberBucketMap.delete(elementToEvictBucketIdentifier);
    }
  }

  return false;
};
