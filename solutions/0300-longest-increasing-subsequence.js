/**
 * Longest Increasing Subsequence
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var lengthOfLIS = function (nums) {
    if (!nums || nums.length === 0) {
        return 0;
    }

    const increasingSubsequenceTails = [];

    for (const currentNumber of nums) {
        let binarySearchLeft = 0;
        let binarySearchRight = increasingSubsequenceTails.length - 1;
        let insertionPoint = increasingSubsequenceTails.length;

        while (binarySearchLeft <= binarySearchRight) {
            const binarySearchMid = Math.floor((binarySearchLeft + binarySearchRight) / 2);
            if (increasingSubsequenceTails[binarySearchMid] < currentNumber) {
                binarySearchLeft = binarySearchMid + 1;
            } else {
                insertionPoint = binarySearchMid;
                binarySearchRight = binarySearchMid - 1;
            }
        }

        if (insertionPoint === increasingSubsequenceTails.length) {
            increasingSubsequenceTails.push(currentNumber);
        } else {
            increasingSubsequenceTails[insertionPoint] = currentNumber;
        }
    }

    return increasingSubsequenceTails.length;
};