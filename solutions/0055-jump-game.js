/**
 * Jump Game
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var canJump = function (nums) {
    const arraySize = nums.length;
    let goalPosition = arraySize - 1;

    for (let currentPosition = arraySize - 2; currentPosition >= 0; currentPosition--) {
        const potentialReach = currentPosition + nums[currentPosition];
        if (potentialReach >= goalPosition) {
            goalPosition = currentPosition;
        }
    }

    return goalPosition === 0;
};