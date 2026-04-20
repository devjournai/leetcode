/**
 * Majority Element
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var majorityElement = function (nums) {
    let currentMajorityElement = 0;
    let majorityCount = 0;

    for (let currentIndex = 0; currentIndex < nums.length; currentIndex++) {
        const valueAtCurrentIndex = nums[currentIndex];
        if (majorityCount === 0) {
            currentMajorityElement = valueAtCurrentIndex;
            majorityCount = 1;
        } else if (valueAtCurrentIndex === currentMajorityElement) {
            majorityCount++;
        } else {
            majorityCount--;
        }
    }

    return currentMajorityElement;
};