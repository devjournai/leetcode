/**
 * High Five
 * Intuition: Group scores by student, then the top five after a descending sort give the truncated average. Sorting the (id, avg) pairs yields the required id order.
 * Approach: 1. Map id → score list. 2. Sort each list descending and average the first five (floor). 3. Collect [id, avg] and sort by id.
 * Dry Run: id 1 scores 91,92,93,94,95 → avg 93; id 2 similar. Output [[1,93],[2,...]] by id.
 * Time Complexity: O(N log K)
 * Space Complexity: O(N)
 */
var highFive = function (items) {
  const studentScoresMap = new Map();

  for (const studentItemEntry of items) {
    const studentIdentifier = studentItemEntry[0];
    const individualScore = studentItemEntry[1];

    if (!studentScoresMap.has(studentIdentifier)) {
      studentScoresMap.set(studentIdentifier, []);
    }
    studentScoresMap.get(studentIdentifier).push(individualScore);
  }

  const finalAveragesResult = [];
  for (const [studentIDValue, studentScoresCollection] of studentScoresMap) {
    studentScoresCollection.sort(
      (firstScoreItem, secondScoreItem) => secondScoreItem - firstScoreItem
    );

    const topFiveScoresArray = studentScoresCollection.slice(0, 5);
    const sumOfTopFive = topFiveScoresArray.reduce(
      (currentAccumulator, currentScore) => currentAccumulator + currentScore,
      0
    );

    const calculatedAverage = Math.floor(sumOfTopFive / 5);
    finalAveragesResult.push([studentIDValue, calculatedAverage]);
  }

  finalAveragesResult.sort(
    (firstResultPair, secondResultPair) =>
      firstResultPair[0] - secondResultPair[0]
  );

  return finalAveragesResult;
};
