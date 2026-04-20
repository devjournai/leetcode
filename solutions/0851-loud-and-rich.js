/**
 * Loud And Rich
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var loudAndRich = function (richer, quiet) {
  const socialNetworkGraph = new Array(quiet.length).fill().map(() => []);
  const calculatedResults = new Array(quiet.length).fill(-1);

  for (
    let relationshipIndex = 0;
    relationshipIndex < richer.length;
    relationshipIndex++
  ) {
    const currentRelationship = richer[relationshipIndex];
    const financiallySuperior = currentRelationship[0];
    const financiallyInferior = currentRelationship[1];
    socialNetworkGraph[financiallyInferior].push(financiallySuperior);
  }

  function findOptimalQuietPerson(currentIndividual) {
    if (calculatedResults[currentIndividual] !== -1) {
      return calculatedResults[currentIndividual];
    }

    let leastQuietCandidate = currentIndividual;

    const directSuperiors = socialNetworkGraph[currentIndividual];
    for (
      let superiorIndex = 0;
      superiorIndex < directSuperiors.length;
      superiorIndex++
    ) {
      const superiorIndividual = directSuperiors[superiorIndex];
      const discoveredQuieterOption =
        findOptimalQuietPerson(superiorIndividual);
      if (quiet[discoveredQuieterOption] < quiet[leastQuietCandidate]) {
        leastQuietCandidate = discoveredQuieterOption;
      }
    }

    calculatedResults[currentIndividual] = leastQuietCandidate;
    return leastQuietCandidate;
  }

  for (
    let personIterator = 0;
    personIterator < quiet.length;
    personIterator++
  ) {
    findOptimalQuietPerson(personIterator);
  }

  return calculatedResults;
};
