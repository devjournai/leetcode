/**
 * Count Unhappy Friends
 * Time Complexity: O(n^2)
 * Space Complexity: O(n^2)
 */
var unhappyFriends = function (n, preferences, pairs) {
  const preferenceRanks = Array.from({ length: n }, () => new Array(n).fill(0));
  const currentPairings = new Array(n).fill(-1);

  for (let personIndexOne = 0; personIndexOne < n; personIndexOne++) {
    for (let prefIndex = 0; prefIndex < n - 1; prefIndex++) {
      preferenceRanks[personIndexOne][preferences[personIndexOne][prefIndex]] =
        prefIndex;
    }
  }

  for (const currentPair of pairs) {
    const firstFriend = currentPair[0];
    const secondFriend = currentPair[1];
    currentPairings[firstFriend] = secondFriend;
    currentPairings[secondFriend] = firstFriend;
  }

  let unhappyCount = 0;

  for (let unhappyCandidate = 0; unhappyCandidate < n; unhappyCandidate++) {
    const candidatePartner = currentPairings[unhappyCandidate];

    for (const friendFromPrefs of preferences[unhappyCandidate]) {
      if (friendFromPrefs === candidatePartner) {
        break;
      }

      const preferredPartner = currentPairings[friendFromPrefs];

      if (
        preferenceRanks[friendFromPrefs][unhappyCandidate] <
        preferenceRanks[friendFromPrefs][preferredPartner]
      ) {
        unhappyCount++;
        break;
      }
    }
  }

  return unhappyCount;
};
