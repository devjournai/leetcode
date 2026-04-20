/**
 * Repeated Dna Sequences
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findRepeatedDnaSequences = function (s) {
    const dnaSequenceLength = 10;
    if (s.length < dnaSequenceLength) {
        return [];
    }

    const discoveredSequences = new Set();
    const repeatingSequences = new Set();

    for (let currentPosition = 0; currentPosition <= s.length - dnaSequenceLength; currentPosition++) {
        const currentDnaSegment = s.substring(currentPosition, currentPosition + dnaSequenceLength);

        if (discoveredSequences.has(currentDnaSegment)) {
            repeatingSequences.add(currentDnaSegment);
        }
        discoveredSequences.add(currentDnaSegment);
    }

    return [...repeatingSequences];
};