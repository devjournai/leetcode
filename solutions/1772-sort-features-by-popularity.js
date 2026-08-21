/**
 * Sort Features By Popularity
 * Intuition: A feature's popularity is how many responses mention it at least once. Sort by that count descending, breaking ties by original feature order.
 * Approach: 1. Seed `featurePopularityMap` with zeros. 2. For each response, split into a set of words and increment matching features. 3. Build records with popularity and `originalIndexPosition`, sort, and map back to names.
 * Dry Run: features = ["cooler","lock","touch"], responses = ["i like cooler cooler","lock touch cool","locker like touch"].
 *   - cooler 1, lock 1, touch 2 → ["touch","cooler","lock"].
 * Time Complexity: O(N_R * (L_R + W_R * L_F) + N_F * L_F + N_F log N_F)
 * Space Complexity: O(N_F * L_F + W_R * L_F)
 */
var sortFeatures = function (features, responses) {
  let featurePopularityMap = new Map();

  for (
    let initialFeatureIndex = 0;
    initialFeatureIndex < features.length;
    initialFeatureIndex++
  ) {
    let currentFeatureName = features[initialFeatureIndex];
    featurePopularityMap.set(currentFeatureName, 0);
  }

  for (const currentResponseString of responses) {
    let distinctWordsInResponse = new Set(currentResponseString.split(" "));
    for (const singleWord of distinctWordsInResponse) {
      if (featurePopularityMap.has(singleWord)) {
        let currentPopularityCount = featurePopularityMap.get(singleWord);
        featurePopularityMap.set(singleWord, currentPopularityCount + 1);
      }
    }
  }

  let featureDataCollection = features.map(
    (featureKey, originalFeatureIndex) => ({
      featureIdentifier: featureKey,
      featurePopularity: featurePopularityMap.get(featureKey),
      originalIndexPosition: originalFeatureIndex,
    })
  );

  featureDataCollection.sort((featureRecordA, featureRecordB) => {
    if (featureRecordA.featurePopularity !== featureRecordB.featurePopularity) {
      return (
        featureRecordB.featurePopularity - featureRecordA.featurePopularity
      );
    }
    return (
      featureRecordA.originalIndexPosition -
      featureRecordB.originalIndexPosition
    );
  });

  let finalSortedFeatures = featureDataCollection.map(
    (sortedEntry) => sortedEntry.featureIdentifier
  );

  return finalSortedFeatures;
};
