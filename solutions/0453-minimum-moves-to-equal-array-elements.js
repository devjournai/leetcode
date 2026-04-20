/**
 * Minimum Moves To Equal Array Elements
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var minMoves = function (nums) {
    if (nums.length === 0) {
        return 0;
    }

    let minimumElement = nums[0];
    for (let elementIndex = 1; elementIndex < nums.length; elementIndex++) {
        if (nums[elementIndex] < minimumElement) {
            minimumElement = nums[elementIndex];
        }
    }

    let totalMovesCount = 0;
    for (let currentArrayValue of nums) {
        totalMovesCount += currentArrayValue - minimumElement;
    }

    return totalMovesCount;
};