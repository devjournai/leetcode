/**
 * Prison Cells After N Days
 * Intuition: The 8-cell rule is deterministic and finite, so states cycle. Simulate day-by-day until a `stateIdentifier` repeats, then jump the remaining days by cycle length.
 * Approach: 1. `computeNextStateConfiguration` sets ends to 0 and middle cells to 1 iff neighbors match. 2. For each day, if the joined state was seen, compute `cyclePeriodLength` and return `sequenceOfStates[cycleStartIndex + remaining % period]`. 3. Else store the state. 4. If n is smaller than the cycle, return the last simulated state.
 * Dry Run: cells = [0,1,0,1,1,0,0,1], n=7. Day 1 → 0,1,1,0,0,0,0,0. Continue until a repeat; remaining days index into `sequenceOfStates`. Result [0,0,1,1,0,0,0,0].
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var prisonAfterNDays = function (cells, n) {
  const computeNextStateConfiguration = (currentConfiguration) => {
    const nextConfiguration = new Array(8);
    nextConfiguration[0] = 0;
    nextConfiguration[7] = 0;

    for (let position = 1; position < 7; position++) {
      if (
        currentConfiguration[position - 1] ===
        currentConfiguration[position + 1]
      ) {
        nextConfiguration[position] = 1;
      } else {
        nextConfiguration[position] = 0;
      }
    }
    return nextConfiguration;
  };

  let simulationInputState = [...cells];
  const sequenceOfStates = [];
  const stateToSequenceIndex = new Map();

  for (let dayNumber = 1; dayNumber <= n; dayNumber++) {
    simulationInputState = computeNextStateConfiguration(simulationInputState);
    const stateIdentifier = simulationInputState.join("");

    if (stateToSequenceIndex.has(stateIdentifier)) {
      const cycleStartIndex = stateToSequenceIndex.get(stateIdentifier);
      const cyclePeriodLength = dayNumber - cycleStartIndex;
      const remainingTargetDays = n - dayNumber;
      const finalOffsetInCycle = remainingTargetDays % cyclePeriodLength;

      return sequenceOfStates[cycleStartIndex + finalOffsetInCycle];
    }

    sequenceOfStates.push(simulationInputState);
    stateToSequenceIndex.set(stateIdentifier, sequenceOfStates.length - 1);
  }

  return simulationInputState;
};
