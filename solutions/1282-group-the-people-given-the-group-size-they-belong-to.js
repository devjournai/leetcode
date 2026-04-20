/**
 * Group The People Given The Group Size They Belong To
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var groupThePeople = function (groupSizes) {
  const resultantClusters = [];
  const pendingPeopleBuckets = new Map();

  groupSizes.forEach((designatedSize, personIdentifier) => {
    let currentBucket = pendingPeopleBuckets.get(designatedSize);

    if (!currentBucket) {
      currentBucket = [];
      pendingPeopleBuckets.set(designatedSize, currentBucket);
    }

    currentBucket.push(personIdentifier);

    if (currentBucket.length === designatedSize) {
      resultantClusters.push(currentBucket);
      pendingPeopleBuckets.delete(designatedSize);
    }
  });

  return resultantClusters;
};
