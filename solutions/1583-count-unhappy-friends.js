/**
 * Count Unhappy Friends
 * Intuition: x is unhappy if some preferred y (over x's partner) also prefers x over y's partner.
 * Approach: 1. Rank matrix from preferences. 2. Store pairs. 3. For each x, scan prefs until partner; if any y ranks x better than y's partner, count x once.
 * Dry Run: n = 4, pairs = [[0,1],[2,3]] with the standard preference tables.
 *   - Two people have a mutually preferred alternative → 2.
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
