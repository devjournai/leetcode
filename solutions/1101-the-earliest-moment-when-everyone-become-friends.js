/**
 * The Earliest Moment When Everyone Become Friends
 * Time Complexity: O(M log M + M α(N))
 * Space Complexity: O(N)
 */
var earliestAcq = function (logEntries, numberOfPeople) {
  logEntries.sort((entryOne, entryTwo) => entryOne[0] - entryTwo[0]);

  const personParents = Array.from(
    { length: numberOfPeople },
    (_, initialIndex) => initialIndex,
  );
  const setRanks = new Array(numberOfPeople).fill(0);
  let activeComponents = numberOfPeople;

  const findSetRepresentative = (entityIndex) => {
    if (personParents[entityIndex] === entityIndex) {
      return entityIndex;
    }
    personParents[entityIndex] = findSetRepresentative(
      personParents[entityIndex],
    );
    return personParents[entityIndex];
  };

  const uniteSets = (elementA, elementB) => {
    const rootA = findSetRepresentative(elementA);
    const rootB = findSetRepresentative(elementB);

    if (rootA === rootB) {
      return false;
    }

    if (setRanks[rootA] < setRanks[rootB]) {
      personParents[rootA] = rootB;
    } else if (setRanks[rootA] > setRanks[rootB]) {
      personParents[rootB] = rootA;
    } else {
      personParents[rootB] = rootA;
      setRanks[rootA]++;
    }

    activeComponents--;
    return true;
  };

  for (const connectionEvent of logEntries) {
    const acquisitionTime = connectionEvent[0];
    const firstPerson = connectionEvent[1];
    const secondPerson = connectionEvent[2];

    uniteSets(firstPerson, secondPerson);

    if (activeComponents === 1) {
      return acquisitionTime;
    }
  }

  return -1;
};
