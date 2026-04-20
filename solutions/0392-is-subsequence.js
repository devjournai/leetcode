/**
 * Is Subsequence
 * Time Complexity: O(t.length)
 * Space Complexity: O(1)
*/
var isSubsequence = function (s, t) {
    const sLengthValue = s.length;
    const tLengthValue = t.length;

    if (sLengthValue > tLengthValue) {
        return false;
    }

    let sPointerPosition = 0;
    let tCurrentPosition = 0;

    while (sPointerPosition < sLengthValue && tCurrentPosition < tLengthValue) {
        if (s[sPointerPosition] === t[tCurrentPosition]) {
            sPointerPosition++;
        }
        tCurrentPosition++;
    }

    return sPointerPosition === sLengthValue;
};