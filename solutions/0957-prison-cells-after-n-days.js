/**
 * Prison Cells After N Days
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
