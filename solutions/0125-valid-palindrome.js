/**
 * Valid Palindrome
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var isPalindrome = function (s) {
    let advanceLeft = 0;
    let retreatRight = s.length - 1;

    const isCharacterAlphanumeric = (testCharacter) => {
        return /^[a-z0-9]$/i.test(testCharacter);
    };

    while (advanceLeft < retreatRight) {
        while (advanceLeft < retreatRight && !isCharacterAlphanumeric(s[advanceLeft])) {
            advanceLeft++;
        }
        while (advanceLeft < retreatRight && !isCharacterAlphanumeric(s[retreatRight])) {
            retreatRight--;
        }

        if (advanceLeft >= retreatRight) {
            break;
        }

        const charAtBeginning = s[advanceLeft].toLowerCase();
        const charAtEnding = s[retreatRight].toLowerCase();

        if (charAtBeginning !== charAtEnding) {
            return false;
        }

        advanceLeft++;
        retreatRight--;
    }

    return true;
};