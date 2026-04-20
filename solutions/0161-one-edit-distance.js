/**
 * One Edit Distance
 * Time Complexity: O(min(s.length, t.length))
 * Space Complexity: O(1)
*/ 
var isOneEditDistance = function(s, t) {
    if (s === t) {
        return false;
    }

    const initialLengthS = s.length;
    const initialLengthT = t.length;

    if (Math.abs(initialLengthS - initialLengthT) > 1) {
        return false;
    }

    let currentStringA = s;
    let currentStringB = t;
    let lengthA = initialLengthS;
    let lengthB = initialLengthT;

    if (lengthA > lengthB) {
        [currentStringA, currentStringB] = [currentStringB, currentStringA];
        [lengthA, lengthB] = [lengthB, lengthA];
    }

    let pointerA = 0;
    let pointerB = 0;
    let foundDifference = false;

    while (pointerA < lengthA && pointerB < lengthB) {
        if (currentStringA[pointerA] !== currentStringB[pointerB]) {
            if (foundDifference) {
                return false;
            }
            foundDifference = true;

            if (lengthA === lengthB) {
                pointerA++;
                pointerB++;
            } else {
                pointerB++;
            }
        } else {
            pointerA++;
            pointerB++;
        }
    }

    return foundDifference || (lengthB - lengthA === 1);
};