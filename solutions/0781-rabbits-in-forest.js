/**
 * Rabbits In Forest
 * Intuition: An answer `x` means a color group of size `x+1`. Rabbits reporting the same `x` pack into as few such groups as `ceil(count / (x+1))`.
 * Approach: 1. Count `answerFrequencies`. 2. For each `[reportValue, observedCount]`, `groupPotentialSize = reportValue + 1`, `requiredGroups = ceil(observedCount / groupPotentialSize)`, add `requiredGroups * groupPotentialSize` to `overallRabbitCount`. 3. Return the sum.
 * Dry Run: answers = [1,1,2].
 *   - Ones: 2 rabbits, group size 2 → 1 group → 2. Twos: 1 rabbit, group size 3 → 1 group → 3. Return 5.
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var numRabbits = function (answers) {
  const answerFrequencies = new Map();

  for (const individualAnswer of answers) {
    answerFrequencies.set(
      individualAnswer,
      (answerFrequencies.get(individualAnswer) || 0) + 1
    );
  }

  let overallRabbitCount = 0;

  for (const [reportValue, observedCount] of answerFrequencies.entries()) {
    const groupPotentialSize = reportValue + 1;
    const requiredGroups = Math.ceil(observedCount / groupPotentialSize);
    overallRabbitCount += requiredGroups * groupPotentialSize;
  }

  return overallRabbitCount;
};
