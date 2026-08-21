/**
 * The Earliest Moment When Everyone Become Friends
 * Intuition: Friendships union people over time. Sorting logs and union-find merge until one component; that timestamp is the first moment everyone is connected.
 * Approach: 1. Sort logs by time. 2. Union-find with rank; start with n components. 3. Union each pair; on a real merge decrement the component count. 4. When it hits 1, return that time, else -1.
 * Dry Run: n=4, logs at t=0 union 0-1, t=1 union 1-2, t=2 union 2-3. Components 4→3→2→1, answer 2.
 * Time Complexity: O(M log M + M α(N))
 * Space Complexity: O(N)
 */
var earliestAcq = function (logEntries, numberOfPeople) {
  logEntries.sort((entryOne, entryTwo) => entryOne[0] - entryTwo[0]);

  const personParents = Array.from(
    { length: numberOfPeople },
    (_, initialIndex) => initialIndex
  );
  const setRanks = new Array(numberOfPeople).fill(0);
  let activeComponents = numberOfPeople;

  const findSetRepresentative = (entityIndex) => {
    if (personParents[entityIndex] === entityIndex) {
      return entityIndex;
    }
    personParents[entityIndex] = findSetRepresentative(
      personParents[entityIndex]
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
