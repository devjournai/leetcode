/**
 * Group The People Given The Group Size They Belong To
 * Intuition: Bucket people by required group size. Whenever a bucket reaches that size, emit it as a finished group.
 * Approach: 1. Map designatedSize -> currentBucket of person ids. 2. Push each person; if bucket length equals designatedSize, push that array to resultantClusters and delete the map entry. 3. Return the clusters.
 * Dry Run: groupSizes = [3,3,3,3,3,1,3]
 *   size 3 fills [0,1,2] then [3,4,6]; size 1 fills [5]. Return those three groups.
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
