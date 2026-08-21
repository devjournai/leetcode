/**
 * Get Watched Videos By Your Friends
 * Intuition: Friends form an unweighted graph. BFS to exact depth `level` yields that friend set; then rank their videos by frequency.
 * Approach: 1. BFS from `id`, skipping visited people, for `level` hops. 2. Count videos watched by that frontier. 3. Sort by count then name. 4. Return titles only.
 * Dry Run: id=0, level=1, friends=[[1,2],[0,3],[0,3],[1,2]], videos=[["A"],["B"],["C"],["D"]]. Level-1 friends 1 and 2 → ["B","C"] sorted.
 * Time Complexity: O(P + E + K * V_max + D log D)
 * Space Complexity: O(P + D)
 */
var watchedVideosByFriends = function (watchedVideos, friends, id, level) {
  const peopleSeenTracker = new Set();
  peopleSeenTracker.add(id);

  let currentPeopleQueue = [id];
  let depthCounter = 0;

  while (currentPeopleQueue.length > 0 && depthCounter < level) {
    const nextIterationPeers = [];
    for (const personIdentifier of currentPeopleQueue) {
      for (const friendPerson of friends[personIdentifier]) {
        if (!peopleSeenTracker.has(friendPerson)) {
          peopleSeenTracker.add(friendPerson);
          nextIterationPeers.push(friendPerson);
        }
      }
    }
    currentPeopleQueue = nextIterationPeers;
    depthCounter++;
  }

  const videoCountMap = new Map();
  for (
    let idxOfFriend = 0;
    idxOfFriend < currentPeopleQueue.length;
    idxOfFriend++
  ) {
    const individualFriendId = currentPeopleQueue[idxOfFriend];
    for (const specificVideoTitle of watchedVideos[individualFriendId]) {
      const currentCount = videoCountMap.get(specificVideoTitle) || 0;
      videoCountMap.set(specificVideoTitle, currentCount + 1);
    }
  }

  const videoFrequencyPairs = Array.from(videoCountMap.entries());

  videoFrequencyPairs.sort((videoEntryA, videoEntryB) => {
    if (videoEntryA[1] === videoEntryB[1]) {
      return videoEntryA[0].localeCompare(videoEntryB[0]);
    }
    return videoEntryA[1] - videoEntryB[1];
  });

  return videoFrequencyPairs.map(([videoNameOnly]) => videoNameOnly);
};
