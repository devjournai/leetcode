/**
 * Non Decreasing Subsequences
 * Time Complexity: O(2^N * N)
 * Space Complexity: O(2^N * N)
 */
var findSubsequences = function (nums) {
    const uniqueSubsequences = new Set();

    function generateSubsequences(currentPosition, currentPath) {
        if (currentPath.length >= 2) {
            uniqueSubsequences.add(currentPath.join(','));
        }

        for (let searchIndex = currentPosition; searchIndex < nums.length; searchIndex++) {
            const candidateValue = nums[searchIndex];
            if (currentPath.length === 0 || candidateValue >= currentPath[currentPath.length - 1]) {
                const nextPath = [...currentPath, candidateValue];
                generateSubsequences(searchIndex + 1, nextPath);
            }
        }
    }

    generateSubsequences(0, []);

    return Array.from(uniqueSubsequences).map(sequenceString => sequenceString.split(',').map(Number));
};