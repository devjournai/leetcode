/**
 * Minimum Genetic Mutation
 * Intuition: Each mutation is one nucleotide change that must appear in the bank. BFS from `startGene` finds the shortest path to `endGene`.
 * Approach: 1. If `endGene` is not in the bank set, return -1. 2. Queue `[gene, steps]`, visit `startGene`. 3. For each of 8 positions try A/C/G/T (skip same letter). 4. Enqueue unseen bank strings with steps+1. 5. Return steps on match, else -1 after BFS.
 * Dry Run: start AACCGGTT, end AACCGGTA, bank [AACCGGTA]. One mutation at last base; BFS returns 1.
 * Time Complexity: O(N * L^2).
 * Space Complexity: O(N * L)
 */
var minMutation = function (startGene, endGene, bank) {
  const geneBankSet = new Set(bank);
  if (!geneBankSet.has(endGene)) {
    return -1;
  }

  const bfsPathQueue = [[startGene, 0]];
  const visitedGenesSet = new Set();
  visitedGenesSet.add(startGene);

  const geneLengthValue = 8;
  const possibleNucleotides = ["A", "C", "G", "T"];

  while (bfsPathQueue.length > 0) {
    const currentEntry = bfsPathQueue.shift();
    const currentGeneSequence = currentEntry[0];
    const currentStepCount = currentEntry[1];

    if (currentGeneSequence === endGene) {
      return currentStepCount;
    }

    for (
      let mutationPosition = 0;
      mutationPosition < geneLengthValue;
      mutationPosition++
    ) {
      for (const nucleotideOption of possibleNucleotides) {
        if (nucleotideOption === currentGeneSequence[mutationPosition]) {
          continue;
        }

        const leftSegment = currentGeneSequence.slice(0, mutationPosition);
        const rightSegment = currentGeneSequence.slice(mutationPosition + 1);
        const mutatedCandidateGene =
          leftSegment + nucleotideOption + rightSegment;

        if (
          geneBankSet.has(mutatedCandidateGene) &&
          !visitedGenesSet.has(mutatedCandidateGene)
        ) {
          visitedGenesSet.add(mutatedCandidateGene);
          bfsPathQueue.push([mutatedCandidateGene, currentStepCount + 1]);
        }
      }
    }
  }

  return -1;
};
