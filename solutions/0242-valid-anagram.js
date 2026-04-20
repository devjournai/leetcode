/**
 * Valid Anagram
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var isAnagram = function (s, t) {
    const stringFirstLength = s.length;
    const stringSecondLength = t.length;

    if (stringFirstLength !== stringSecondLength) {
        return false;
    }

    const characterCounts = new Array(26).fill(0);

    for (let charIndexS = 0; charIndexS < stringFirstLength; charIndexS++) {
        const charCodeS = s.charCodeAt(charIndexS) - 'a'.charCodeAt(0);
        characterCounts[charCodeS]++;
    }

    for (let charIndexT = 0; charIndexT < stringSecondLength; charIndexT++) {
        const charCodeT = t.charCodeAt(charIndexT) - 'a'.charCodeAt(0);
        characterCounts[charCodeT]--;
        if (characterCounts[charCodeT] < 0) {
            return false;
        }
    }

    return true;
};