/**
 * Sort Features By Popularity
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
    }),
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
    (sortedEntry) => sortedEntry.featureIdentifier,
  );

  return finalSortedFeatures;
};
