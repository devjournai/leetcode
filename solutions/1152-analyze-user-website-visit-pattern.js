/**
 * Analyze User Website Visit Pattern
 * Intuition: Each user’s 3-website sequences (in time order) vote once per unique pattern. The pattern with the most users wins; ties take the lexicographically smallest tuple.
 * Approach: 1. Zip and sort visits by timestamp, group sites per user. 2. For each user with >=3 visits, enumerate all i<j<k triples into a set. 3. Increment a global score per unique pattern. 4. Pick max score, then min string key; split back to three sites.
 * Dry Run: joe and mary both visit home,about,career; james visits home,cart,maps,home.
 *   - Pattern home,about,career scores 2 (joe+mary); other james triples score 1.
 *   - Answer ["home","about","career"].
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^3)
 */
var mostVisitedPattern = function (username, timestamp, website) {
  const visitRecords = username.map((uName, index) => ({
    user: uName,
    timeValue: timestamp[index],
    siteName: website[index],
  }));

  visitRecords.sort((recA, recB) => recA.timeValue - recB.timeValue);

  const userVisitsSequence = new Map();

  for (const singleVisit of visitRecords) {
    if (!userVisitsSequence.has(singleVisit.user)) {
      userVisitsSequence.set(singleVisit.user, []);
    }
    userVisitsSequence.get(singleVisit.user).push(singleVisit.siteName);
  }

  const patternScoreMap = new Map();

  for (const [visitorName, visitedSitesList] of userVisitsSequence) {
    if (visitedSitesList.length < 3) continue;

    const uniqueUserPatterns = new Set();

    const siteListLength = visitedSitesList.length;
    for (let firstIndex = 0; firstIndex < siteListLength - 2; firstIndex++) {
      for (
        let secondIndex = firstIndex + 1;
        secondIndex < siteListLength - 1;
        secondIndex++
      ) {
        for (
          let thirdIndex = secondIndex + 1;
          thirdIndex < siteListLength;
          thirdIndex++
        ) {
          const currentPatternSequence = [
            visitedSitesList[firstIndex],
            visitedSitesList[secondIndex],
            visitedSitesList[thirdIndex],
          ].join(",");
          uniqueUserPatterns.add(currentPatternSequence);
        }
      }
    }

    for (const sequenceKey of uniqueUserPatterns) {
      patternScoreMap.set(
        sequenceKey,
        (patternScoreMap.get(sequenceKey) || 0) + 1
      );
    }
  }

  let highestScoreValue = 0;
  let resultPatternString = "";

  for (const [patternKey, currentPatternScore] of patternScoreMap) {
    if (currentPatternScore > highestScoreValue) {
      highestScoreValue = currentPatternScore;
      resultPatternString = patternKey;
    } else if (currentPatternScore === highestScoreValue) {
      if (patternKey < resultPatternString) {
        resultPatternString = patternKey;
      }
    }
  }

  return resultPatternString.split(",");
};
