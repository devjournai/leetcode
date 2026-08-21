/**
 * Count The Repetitions
 * Intuition: Each full pass over `s1` advances a pointer in `s2` and may complete more `s2` copies. The pointer into `s2` after a pass is a small state; seeing it again means a cycle of `s1` copies that can be fast-forwarded for the leftover `n1`.
 * Approach: 1. Walk `n1` copies of `s1`. On each character, if it matches `s2[currentS2CharacterPointer]`, advance; wrapping the pointer increments `totalS2MatchedCount`. 2. After a copy, if `stateMap` already stored this pointer, take prior `(s1Repetition, matches)`, compute period length and `s2` gain, then skip `fullCyclesToFastForward` remaining copies. 3. Otherwise record `[s1RepetitionCounter, totalS2MatchedCount]`. 4. Answer is `floor(totalS2MatchedCount / n2)`.
 * Dry Run: s1 = "acb", n1 = 4, s2 = "ab", n2 = 2.
 *   - Copy 0: a matches a, c skip, b matches b → one `s2`, pointer 0. Map 0 → [0, 1]. Counter becomes 1.
 *   - Copy 1: another `s2` (total 2). Pointer 0 is already in the map. Period 1 copy, gain 1. Remaining loops = 4-1-1 = 2; fast-forward 2 → matches 4, repetition 3, then ++ to 4.
 *   - floor(4/2) = 2.
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
      const fullCyclesToFastForward = Math.floor(
        remainingS1Loops / s1CyclesForPeriod
      );

      totalS2MatchedCount += fullCyclesToFastForward * s2GainPerCycle;
      s1RepetitionCounter += fullCyclesToFastForward * s1CyclesForPeriod;
    } else {
      stateMap[currentS2CharacterPointer] = [
        s1RepetitionCounter,
        totalS2MatchedCount,
      ];
    }

    s1RepetitionCounter++;
  }

  return Math.floor(totalS2MatchedCount / n2);
};
