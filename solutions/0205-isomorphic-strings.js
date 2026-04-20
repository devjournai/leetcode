/**
 * Isomorphic Strings
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var isIsomorphic = function (s, t) {
    const stringLengthS = s.length;
    const stringLengthT = t.length;

    if (stringLengthS !== stringLengthT) {
        return false;
    }

    const sToTMapping = new Map();
    const tToSMapping = new Map();

    for (let currentPosition = 0; currentPosition < stringLengthS; currentPosition++) {
        const characterFromS = s[currentPosition];
        const characterFromT = t[currentPosition];

        const mappedCharFromS = sToTMapping.get(characterFromS);
        const mappedCharFromT = tToSMapping.get(characterFromT);

        if (mappedCharFromS === undefined && mappedCharFromT === undefined) {
            sToTMapping.set(characterFromS, characterFromT);
            tToSMapping.set(characterFromT, characterFromS);
        } else if (mappedCharFromS !== characterFromT || mappedCharFromT !== characterFromS) {
            return false;
        }
    }

    return true;
};