/**
 * Palindrome Partitioning
 * Time Complexity: O(N^2 * 2^N)
 * Space Complexity: O(N * 2^N)
 */
var partition = function(s) {
    const allPartitionResults = [];

    const isInputPalindrome = (checkingString) => {
        let startPointer = 0;
        let endPointer = checkingString.length - 1;

        while (startPointer < endPointer) {
            if (checkingString[startPointer] !== checkingString[endPointer]) {
                return false;
            }
            startPointer++;
            endPointer--;
        }
        return true;
    };

    const findPartitions = (currentProcessedParts, remainingSubstring) => {
        if (!remainingSubstring.length) {
            allPartitionResults.push(currentProcessedParts);
            return;
        }

        for (let splitIndex = 1; splitIndex <= remainingSubstring.length; splitIndex++) {
            const candidatePalindrome = remainingSubstring.slice(0, splitIndex);
            if (isInputPalindrome(candidatePalindrome)) {
                findPartitions([...currentProcessedParts, candidatePalindrome], remainingSubstring.slice(splitIndex));
            }
        }
    };

    findPartitions([], s);
    return allPartitionResults;
};