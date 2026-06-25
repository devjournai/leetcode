/**
 * Most Popular Video Creator
 * Intuition: We need to aggregate total views and find the most popular video for each creator, then identify creators with the highest overall popularity.
 * Approach: 1. Iterate through all videos to build a map where keys are creator names and values are objects storing the creator's total views, their most viewed video's ID, and that video's view count. During this pass, handle ties for most viewed video by lexicographical comparison. 2. After populating the map, iterate through its values to find the maximum total view count among all creators. 3. Finally, iterate through the map's entries and collect all creators whose total view count matches the maximum, along with their respective most popular video IDs.
 * Dry Run: creators = ["alice","bob","alice","chris"], ids = ["a","b","c","d"], views = [1,2,3,4]
 * Initial: creatorPerformanceData = Map{}, highestGlobalPopularity = 0, resultOutputArray = []
 *
 * First Pass (idxCurrentVideo from 0 to 3):
 * - idxCurrentVideo = 0: "alice", "a", 1. creatorPerformanceData.set("alice", { aggregateViews: 1, topVideoViews: 1, topVideoIdentification: "a" })
 * - idxCurrentVideo = 1: "bob", "b", 2. creatorPerformanceData.set("bob", { aggregateViews: 2, topVideoViews: 2, topVideoIdentification: "b" })
 * - idxCurrentVideo = 2: "alice", "c", 3. "alice" exists. aggregateViews becomes 1+3=4. 3 > 1, so topVideoViews=3, topVideoIdentification="c". "alice" now: { aggregateViews: 4, topVideoViews: 3, topVideoIdentification: "c" }
 * - idxCurrentVideo = 3: "chris", "d", 4. creatorPerformanceData.set("chris", { aggregateViews: 4, topVideoViews: 4, topVideoIdentification: "d" })
 *
 * After First Pass:
 * creatorPerformanceData = {
 *   "alice": { aggregateViews: 4, topVideoViews: 3, topVideoIdentification: "c" },
 *   "bob": { aggregateViews: 2, topVideoViews: 2, topVideoIdentification: "b" },
 *   "chris": { aggregateViews: 4, topVideoViews: 4, topVideoIdentification: "d" }
 * }
 *
 * Second Pass (creatorStatObject loop):
 * - highestGlobalPopularity starts at 0.
 * - For "alice": creatorStatObject.aggregateViews (4) > highestGlobalPopularity (0). highestGlobalPopularity = 4.
 * - For "bob": creatorStatObject.aggregateViews (2) not > 4.
 * - For "chris": creatorStatObject.aggregateViews (4) not > 4.
 *
 * After Second Pass: highestGlobalPopularity = 4
 *
 * Third Pass (creatorKey, creatorValueData loop):
 * - resultOutputArray = []
 * - For "alice": creatorValueData.aggregateViews (4) === highestGlobalPopularity (4). resultOutputArray.push(["alice", "c"])
 * - For "bob": creatorValueData.aggregateViews (2) not === 4.
 * - For "chris": creatorValueData.aggregateViews (4) === highestGlobalPopularity (4). resultOutputArray.push(["chris", "d"])
 *
 * Final resultOutputArray = [["alice", "c"], ["chris", "d"]]
 * Time Complexity: O(N)
 * Space Complexity: O(M)
 */
var mostPopularCreator = function (creators, ids, views) {
  const creatorPerformanceData = new Map();

  const videoCount = creators.length;
  for (
    let idxCurrentVideo = 0;
    idxCurrentVideo < videoCount;
    idxCurrentVideo++
  ) {
    const currentCreatorString = creators[idxCurrentVideo];
    const currentVideoIdString = ids[idxCurrentVideo];
    const currentVideoViewsCount = views[idxCurrentVideo];

    if (!creatorPerformanceData.has(currentCreatorString)) {
      creatorPerformanceData.set(currentCreatorString, {
        aggregateViews: 0,
        topVideoViews: -1,
        topVideoIdentification: "",
      });
    }

    const currentCreatorStats =
      creatorPerformanceData.get(currentCreatorString);
    currentCreatorStats.aggregateViews += currentVideoViewsCount;

    if (
      currentVideoViewsCount > currentCreatorStats.topVideoViews ||
      (currentVideoViewsCount === currentCreatorStats.topVideoViews &&
        currentVideoIdString < currentCreatorStats.topVideoIdentification)
    ) {
      currentCreatorStats.topVideoViews = currentVideoViewsCount;
      currentCreatorStats.topVideoIdentification = currentVideoIdString;
    }
  }

  let highestGlobalPopularity = 0;
  for (const creatorStatObject of creatorPerformanceData.values()) {
    if (creatorStatObject.aggregateViews > highestGlobalPopularity) {
      highestGlobalPopularity = creatorStatObject.aggregateViews;
    }
  }

  const resultOutputArray = [];
  for (const [creatorKey, creatorValueData] of creatorPerformanceData) {
    if (creatorValueData.aggregateViews === highestGlobalPopularity) {
      resultOutputArray.push([
        creatorKey,
        creatorValueData.topVideoIdentification,
      ]);
    }
  }

  return resultOutputArray;
};
