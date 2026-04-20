/**
 * Wiggle Subsequence
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var wiggleMaxLength = function (nums) {
    if (nums.length === 0) {
        return 0;
    }

    let currentLongestUp = 1;
    let currentLongestDown = 1;

    for (let currentPosition = 1; currentPosition < nums.length; currentPosition++) {
        let valueBefore = nums[currentPosition - 1];
        let valueAtCurrent = nums[currentPosition];

        if (valueAtCurrent > valueBefore) {
            currentLongestUp = currentLongestDown + 1;
        } else if (valueAtCurrent < valueBefore) {
            currentLongestDown = currentLongestUp + 1;
        }
    }

    return Math.max(currentLongestUp, currentLongestDown);
};