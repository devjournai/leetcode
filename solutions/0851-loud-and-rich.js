/**
 * Loud And Rich
 * Intuition: Edge richer[a]→ from poorer b to richer a. DFS: the quietest person in x's richer-or-equal set is min(quiet) among x and all superiors (memoized).
 * Approach: 1. Graph: for each [rich,poor] push rich onto `socialNetworkGraph[poor]`. `calculatedResults` = -1. 2. `findOptimalQuietPerson`: recurse superiors, keep least `quiet[]`. 3. Compute for every person. 4. Return array of indices.
 * Dry Run: richer=[[1,0],[2,1]], quiet=[3,2,5]. Person 0 can reach 1 then 2; quietest among {0,1,2} is 1 (quiet 2). Answers include 1 at index 0.
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
