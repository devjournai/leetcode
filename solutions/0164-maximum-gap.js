/**
 * Maximum Gap
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/ 
var maximumGap = function(nums) {
    const totalElements = nums.length;
    if (totalElements < 2) {
        return 0;
    }

    let overallMinimumValue = Infinity;
    let overallMaximumValue = -Infinity;

    for (let elementScanIndex = 0; elementScanIndex < totalElements; elementScanIndex++) {
        const currentNumericalValue = nums[elementScanIndex];
        overallMinimumValue = Math.min(overallMinimumValue, currentNumericalValue);
        overallMaximumValue = Math.max(overallMaximumValue, currentNumericalValue);
    }

    if (overallMinimumValue === overallMaximumValue) {
        return 0;
    }

    const calculatedBucketSize = Math.max(1, Math.floor((overallMaximumValue - overallMinimumValue) / (totalElements - 1)));

    const numberOfBuckets = Math.floor((overallMaximumValue - overallMinimumValue) / calculatedBucketSize) + 1;

    const bucketMinValueStorage = new Array(numberOfBuckets).fill(Infinity);
    const bucketMaxValueStorage = new Array(numberOfBuckets).fill(-Infinity);
    const bucketContentStatus = new Array(numberOfBuckets).fill(false);

    for (let valuePlacementIndex = 0; valuePlacementIndex < totalElements; valuePlacementIndex++) {
        const valueToDistribute = nums[valuePlacementIndex];
        
        const bucketDesignation = Math.floor((valueToDistribute - overallMinimumValue) / calculatedBucketSize);
        
        bucketMinValueStorage[bucketDesignation] = Math.min(bucketMinValueStorage[bucketDesignation], valueToDistribute);
        bucketMaxValueStorage[bucketDesignation] = Math.max(bucketMaxValueStorage[bucketDesignation], valueToDistribute);
        bucketContentStatus[bucketDesignation] = true;
    }

    let maximumGapFound = 0;
    let previousBucketHigh = overallMinimumValue;

    for (let bucketIterationIndex = 0; bucketIterationIndex < numberOfBuckets; bucketIterationIndex++) {
        if (!bucketContentStatus[bucketIterationIndex]) {
            continue;
        }

        maximumGapFound = Math.max(maximumGapFound, bucketMinValueStorage[bucketIterationIndex] - previousBucketHigh);
        previousBucketHigh = bucketMaxValueStorage[bucketIterationIndex];
    }
    
    maximumGapFound = Math.max(maximumGapFound, overallMaximumValue - previousBucketHigh);

    return maximumGapFound;
};