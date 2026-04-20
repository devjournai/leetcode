/**
 * Number Of Segments In A String
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var countSegments = function (s) {
    let segmentTally = 0;
    let isInNonSpaceSequence = false;
    const stringLength = s.length;

    for (let currentPosition = 0; currentPosition < stringLength; currentPosition++) {
        const currentCharValue = s[currentPosition];

        if (currentCharValue !== ' ') {
            if (!isInNonSpaceSequence) {
                segmentTally++;
                isInNonSpaceSequence = true;
            }
        } else {
            isInNonSpaceSequence = false;
        }
    }

    return segmentTally;
};