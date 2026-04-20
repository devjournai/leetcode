/**
 * Rabbits In Forest
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var numRabbits = function (answers) {
  const answerFrequencies = new Map();

  for (const individualAnswer of answers) {
    answerFrequencies.set(
      individualAnswer,
      (answerFrequencies.get(individualAnswer) || 0) + 1,
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
