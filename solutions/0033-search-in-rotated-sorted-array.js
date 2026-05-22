/**
 * Search in Rotated Sorted Array
 * Intuition: Apply binary search by virtually "unrotating" the array. This is achieved by mapping each element's value to an "effective value" that reflects its true sorted position relative to the target, considering the rotation. Elements and the target are categorized based on whether they fall before or after the rotation point (determined by comparing with the first element of the array).
 * Approach: 1. Initialize two pointers, `lowPtr` and `highPtr`, for the binary search range `[0, nums.length)`. 2. In a loop, calculate `midIndex`. 3. Determine `mappedValue` for `nums[midIndex]`: If `nums[midIndex]` and `target` are both in the first sorted segment (values greater than or equal to `nums[0]`) or both in the second sorted segment (values less than `nums[0]`), then `mappedValue` is simply `nums[midIndex]`. 4. If `nums[midIndex]` and `target` are in different segments: if `target` is in the second segment and `nums[midIndex]` is in the first, then `nums[midIndex]` is effectively larger, so `mappedValue` becomes `Infinity`. If `target` is in the first segment and `nums[midIndex]` is in the second, then `nums[midIndex]` is effectively smaller, so `mappedValue` becomes `-Infinity`. 5. Adjust `lowPtr` or `highPtr` based on whether `mappedValue` is less than, greater than, or equal to `target` using standard binary search logic. 6. If `mappedValue` equals `target`, return `midIndex`. 7. If the loop completes without finding the target, return -1.
 * Dry Run: nums = [4,5,6,7,0,1,2], target = 0
 *   - lowPtr = 0, highPtr = 7
 *   - Iteration 1:
 *     - midIndex = 3, nums[midIndex] = 7. firstElement = 4.
 *     - (nums[midIndex] < firstElement) is (7 < 4) = false.
 *     - (target < firstElement) is (0 < 4) = true.
 *     - Different segments. target is in second segment (true), so mappedValue = -Infinity.
 *     - (-Infinity < 0) is true, so lowPtr = 3 + 1 = 4.
 *     - (lowPtr = 4, highPtr = 7)
 *   - Iteration 2:
 *     - midIndex = 5, nums[midIndex] = 1. firstElement = 4.
 *     - (nums[midIndex] < firstElement) is (1 < 4) = true.
 *     - (target < firstElement) is (0 < 4) = true.
 *     - Same segment. mappedValue = nums[midIndex] = 1.
 *     - (1 < 0) is false. (1 > 0) is true, so highPtr = 5.
 *     - (lowPtr = 4, highPtr = 5)
 *   - Iteration 3:
 *     - midIndex = 4, nums[midIndex] = 0. firstElement = 4.
 *     - (nums[midIndex] < firstElement) is (0 < 4) = true.
 *     - (target < firstElement) is (0 < 4) = true.
 *     - Same segment. mappedValue = nums[midIndex] = 0.
 *     - (0 < 0) is false. (0 > 0) is false. (0 === 0) is true.
 *     - Return midIndex = 4.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var search = function (nums, target) {
    let lowPointer = 0;
    let highPointer = nums.length;
    const firstElement = nums[0];

    while (lowPointer < highPointer) {
        const midPoint = Math.floor((lowPointer + highPointer) / 2);
        let effectiveValue;

        const isMidSmall = nums[midPoint] < firstElement;
        const isTargetSmall = target < firstElement;

        if (isMidSmall === isTargetSmall) {
            effectiveValue = nums[midPoint];
        } else if (isTargetSmall) {
            effectiveValue = -Infinity;
        } else {
            effectiveValue = Infinity;
        }

        if (effectiveValue < target) {
            lowPointer = midPoint + 1;
        } else if (effectiveValue > target) {
            highPointer = midPoint;
        } else {
            return midPoint;
        }
    }

    return -1;
};