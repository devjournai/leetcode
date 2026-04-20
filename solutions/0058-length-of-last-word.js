/**
 * Length Of Last Word
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var lengthOfLastWord = function (s) {
    let stringTotalLength = s.length;
    let lastWordCount = 0;
    let currentIndex = stringTotalLength - 1;

    while (currentIndex >= 0 && s[currentIndex] === ' ') {
        currentIndex--;
    }

    while (currentIndex >= 0 && s[currentIndex] !== ' ') {
        lastWordCount++;
        currentIndex--;
    }

    return lastWordCount;
};