/**
 * Count The Repetitions
 * Time Complexity: O(s1.length * s2.length)
 * Space Complexity: O(s2.length)
 */
var getMaxRepetitions = function (s1, n1, s2, n2) {
    const string1Length = s1.length;
    const string2Length = s2.length;

    const stateMap = {};

    let totalS2MatchedCount = 0;
    let currentS2CharacterPointer = 0;
    let s1RepetitionCounter = 0;

    while (s1RepetitionCounter < n1) {
        let s1CharacterIterator = 0;
        while (s1CharacterIterator < string1Length) {
            if (s1[s1CharacterIterator] === s2[currentS2CharacterPointer]) {
                currentS2CharacterPointer++;
                if (currentS2CharacterPointer === string2Length) {
                    currentS2CharacterPointer = 0;
                    totalS2MatchedCount++;
                }
            }
            s1CharacterIterator++;
        }

        if (stateMap[currentS2CharacterPointer] !== undefined) {
            const priorState = stateMap[currentS2CharacterPointer];
            const priorS1Repetition = priorState[0];
            const priorTotalS2Matched = priorState[1];

            const s1CyclesForPeriod = s1RepetitionCounter - priorS1Repetition;
            const s2GainPerCycle = totalS2MatchedCount - priorTotalS2Matched;

            const remainingS1Loops = n1 - 1 - s1RepetitionCounter;
            const fullCyclesToFastForward = Math.floor(remainingS1Loops / s1CyclesForPeriod);

            totalS2MatchedCount += fullCyclesToFastForward * s2GainPerCycle;
            s1RepetitionCounter += fullCyclesToFastForward * s1CyclesForPeriod;
        } else {
            stateMap[currentS2CharacterPointer] = [s1RepetitionCounter, totalS2MatchedCount];
        }

        s1RepetitionCounter++;
    }

    return Math.floor(totalS2MatchedCount / n2);
};