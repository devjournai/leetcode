/**
 * Find All Numbers Disappeared In An Array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var findDisappearedNumbers = function (nums) {
    const totalLength = nums.length;
    let indexTraversal = 0;

    for (indexTraversal = 0; indexTraversal < totalLength; indexTraversal++) {
        const absoluteValue = Math.abs(nums[indexTraversal]);
        const targetPosition = absoluteValue - 1;

        if (nums[targetPosition] > 0) {
            nums[targetPosition] *= -1;
        }
    }

    const missingElements = [];
    let positionChecker = 0;

    while (positionChecker < totalLength) {
        if (nums[positionChecker] > 0) {
            missingElements.push(positionChecker + 1);
        }
        positionChecker++;
    }

    return missingElements;
};