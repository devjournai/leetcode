/**
 * Analyze User Website Visit Pattern
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
        (patternScoreMap.get(sequenceKey) || 0) + 1,
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
