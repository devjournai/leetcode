/**
 * Number Of Music Playlists
 * Intuition: dp[len][unique] = playlists of length `len` using exactly `unique` songs. A new song has (n−unique+1) choices; a replay is allowed only when unique > k, with (unique−k) choices.
 * Approach: 1. `dpGrid[0][0]=1`. 2. For playlistIterator 1..goal and uniqueIterator 1..min(len,n): add new-song term from dp[len-1][unique-1]. 3. If unique > k, add replay term from dp[len-1][unique]. 4. Mod 1e9+7. Return dp[goal][n].
 * Dry Run: n=3, goal=3, k=1. Only permutations of all 3 songs: dp[3][3]=6.
 * Time Complexity: O(goal * n)
 * Space Complexity: O(goal * n)
 */
var numMusicPlaylists = function (n, goal, k) {
  const totalSongs = n;
  const targetLength = goal;
  const minDistinctToReplay = k;
  const modConstant = 1000000007;

  const dpGrid = Array(targetLength + 1)
    .fill(null)
    .map(() => Array(totalSongs + 1).fill(0));

  dpGrid[0][0] = 1;

  for (
    let playlistIterator = 1;
    playlistIterator <= targetLength;
    playlistIterator++
  ) {
    for (
      let uniqueIterator = 1;
      uniqueIterator <= Math.min(playlistIterator, totalSongs);
      uniqueIterator++
    ) {
      let availableNewSongChoices = totalSongs - (uniqueIterator - 1);
      let contributionFromNew =
        (dpGrid[playlistIterator - 1][uniqueIterator - 1] *
          availableNewSongChoices) %
        modConstant;

      dpGrid[playlistIterator][uniqueIterator] = contributionFromNew;

      if (uniqueIterator > minDistinctToReplay) {
        let availableOldSongChoices = uniqueIterator - minDistinctToReplay;
        let contributionFromOld =
          (dpGrid[playlistIterator - 1][uniqueIterator] *
            availableOldSongChoices) %
          modConstant;
        dpGrid[playlistIterator][uniqueIterator] =
          (dpGrid[playlistIterator][uniqueIterator] + contributionFromOld) %
          modConstant;
      }
    }
  }

  return dpGrid[targetLength][totalSongs];
};
