/**
 * Divide an Array Into Subarrays With Minimum Cost I
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var minimumCost = function (nums) {
    const arrayLength = nums.length;
    const firstElementCost = nums[0];

    let minimumFirstCandidate = Infinity;
    let minimumSecondCandidate = Infinity;

    for (let indexVal = 1; indexVal < arrayLength; indexVal++) {
        const currentElement = nums[indexVal];
        if (currentElement < minimumFirstCandidate) {
            minimumSecondCandidate = minimumFirstCandidate;
            minimumFirstCandidate = currentElement;
        } else if (currentElement < minimumSecondCandidate) {
            minimumSecondCandidate = currentElement;
        }
    }

    const totalMinimumCost = firstElementCost + minimumFirstCandidate + minimumSecondCandidate;
    return totalMinimumCost;
};