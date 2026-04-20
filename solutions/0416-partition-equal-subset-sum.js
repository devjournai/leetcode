/**
 * Partition Equal Subset Sum
 * Time Complexity: O(n * s)
 * Space Complexity: O(s)
 */
var canPartition = function (nums) {
    let entireArraySum = 0;
    for (let currentNumberValue of nums) {
        entireArraySum += currentNumberValue;
    }

    if (entireArraySum % 2 !== 0) {
        return false;
    }

    let targetSubsetSum = entireArraySum / 2;
    let possibleSumsTracker = new Array(targetSubsetSum + 1).fill(false);
    possibleSumsTracker[0] = true;

    for (let currentNumberIndex = 0; currentNumberIndex < nums.length; currentNumberIndex++) {
        let currentArrayElement = nums[currentNumberIndex];
        for (let currentSumPossibility = targetSubsetSum; currentSumPossibility >= currentArrayElement; currentSumPossibility--) {
            possibleSumsTracker[currentSumPossibility] = possibleSumsTracker[currentSumPossibility] || possibleSumsTracker[currentSumPossibility - currentArrayElement];
        }
    }

    return possibleSumsTracker[targetSubsetSum];
};