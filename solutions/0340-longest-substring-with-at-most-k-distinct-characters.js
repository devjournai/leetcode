/**
    * Longest Substring With At Most K Distinct Characters
    * Time Complexity: O(N)
    * Space Complexity: O(K)
*/
var lengthOfLongestSubstringKDistinct = function (inputString, distinctLimit) {
    const charFrequencyMap = new Map();
    let longestAchievedLength = 0;
    let leftPointer = 0;
    let rightPointer = 0;

    while (rightPointer < inputString.length) {
        const currentCharacter = inputString[rightPointer];
        charFrequencyMap.set(currentCharacter, (charFrequencyMap.get(currentCharacter) || 0) + 1);

        for (; charFrequencyMap.size > distinctLimit;) {
            const charToEvict = inputString[leftPointer];
            charFrequencyMap.set(charToEvict, charFrequencyMap.get(charToEvict) - 1);
            if (charFrequencyMap.get(charToEvict) === 0) {
                charFrequencyMap.delete(charToEvict);
            }
            leftPointer++;
        }

        longestAchievedLength = Math.max(longestAchievedLength, rightPointer - leftPointer + 1);
        rightPointer++;
    }

    return longestAchievedLength;
};