/**
 * H Index
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var hIndex = function (citations) {
    const numPapers = citations.length;
    const citationFrequency = new Array(numPapers + 1).fill(0);

    for (const currentCitationValue of citations) {
        if (currentCitationValue >= numPapers) {
            citationFrequency[numPapers]++;
        } else {
            citationFrequency[currentCitationValue]++;
        }
    }

    let papersWithAtLeastXCitations = 0;
    for (let potentialHIndex = numPapers; potentialHIndex >= 0; potentialHIndex--) {
        papersWithAtLeastXCitations += citationFrequency[potentialHIndex];
        if (papersWithAtLeastXCitations >= potentialHIndex) {
            return potentialHIndex;
        }
    }

    return 0;
};