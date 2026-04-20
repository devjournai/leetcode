/**
 * Shortest Palindrome
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
*/
var shortestPalindrome = function (s) {
    const initialText = s;
    const initialTextLength = initialText.length;

    if (initialTextLength === 0) {
        return "";
    }

    const invertedText = initialText.split('').reverse().join('');

    const calculateLongestPalindromicPrefixLength = (currentSegmentLength) => {
        if (currentSegmentLength === 0) {
            return 0;
        }

        const segmentFromOriginal = initialText.slice(0, currentSegmentLength);
        const segmentFromInverted = invertedText.slice(initialTextLength - currentSegmentLength);

        if (segmentFromOriginal === segmentFromInverted) {
            return currentSegmentLength;
        } else {
            return calculateLongestPalindromicPrefixLength(currentSegmentLength - 1);
        }
    };

    const longestMatchingPrefixLength = calculateLongestPalindromicPrefixLength(initialTextLength);

    const charactersToPrepend = invertedText.slice(0, initialTextLength - longestMatchingPrefixLength);

    return charactersToPrepend + initialText;
};