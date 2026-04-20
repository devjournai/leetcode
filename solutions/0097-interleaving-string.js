/**
 * Interleaving String
 * Time Complexity: O(s1.length * s2.length)
 * Space Complexity: O(s1.length * s2.length)
 */
var isInterleave = function (s1, s2, s3) {
    const lenS1 = s1.length;
    const lenS2 = s2.length;
    const lenS3 = s3.length;

    if (lenS1 + lenS2 !== lenS3) {
        return false;
    }

    const dpGrid = new Array(lenS1 + 1).fill(false).map(() => new Array(lenS2 + 1).fill(false));

    for (let currentLen1 = 0; currentLen1 <= lenS1; currentLen1++) {
        for (let currentLen2 = 0; currentLen2 <= lenS2; currentLen2++) {
            const combinedCurrentLength = currentLen1 + currentLen2;

            if (currentLen1 === 0 && currentLen2 === 0) {
                dpGrid[currentLen1][currentLen2] = true;
            } else if (currentLen1 === 0) {
                dpGrid[currentLen1][currentLen2] = dpGrid[currentLen1][currentLen2 - 1] && s2[currentLen2 - 1] === s3[combinedCurrentLength - 1];
            } else if (currentLen2 === 0) {
                dpGrid[currentLen1][currentLen2] = dpGrid[currentLen1 - 1][currentLen2] && s1[currentLen1 - 1] === s3[combinedCurrentLength - 1];
            } else {
                const canTakeFromS1 = dpGrid[currentLen1 - 1][currentLen2] && s1[currentLen1 - 1] === s3[combinedCurrentLength - 1];
                const canTakeFromS2 = dpGrid[currentLen1][currentLen2 - 1] && s2[currentLen2 - 1] === s3[combinedCurrentLength - 1];
                dpGrid[currentLen1][currentLen2] = canTakeFromS1 || canTakeFromS2;
            }
        }
    }

    return dpGrid[lenS1][lenS2];
};