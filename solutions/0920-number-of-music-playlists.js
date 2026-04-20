/**
 * Number Of Music Playlists
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
