/**
 * Repeated Substring Pattern
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var repeatedSubstringPattern = function (s) {
    const stringOverallLength = s.length;

    for (let patternCandidateLength = 1; patternCandidateLength <= Math.floor(stringOverallLength / 2); patternCandidateLength++) {
        if (stringOverallLength % patternCandidateLength === 0) {
            const potentialSubpattern = s.substring(0, patternCandidateLength);
            const totalRepetitions = stringOverallLength / patternCandidateLength;

            const constructedFullString = potentialSubpattern.repeat(totalRepetitions);

            if (constructedFullString === s) {
                return true;
            }
        }
    }

    return false;
};