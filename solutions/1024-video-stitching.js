/**
 * Video Stitching
 * Intuition: DP[t] = fewest clips to cover [0,t]. A clip [s,e] covering t can extend a cover of s (or start from 0).
 * Approach: 1. Array of size time+1 filled with Infinity; dp[0]=0. 2. For t=1..time, try every clip that covers t. 3. If start is 0, dp[t]=1; else dp[t]=min(dp[t], dp[start]+1). 4. Return dp[time] or -1.
 * Dry Run: clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], time = 10.
 *   - dp grows: 2 is covered by [0,2] with 1 clip; 10 is covered via [1,9] then [8,10] for 3 clips.
 * Time Complexity: O(time * clips.length)
 * Space Complexity: O(time)
 */
var videoStitching = function (clips, time) {
  const minClipsToCover = new Array(time + 1).fill(Infinity);
  minClipsToCover[0] = 0;

  for (let currentPoint = 1; currentPoint <= time; ++currentPoint) {
    for (const videoSegment of clips) {
      const segmentStart = videoSegment[0];
      const segmentEnd = videoSegment[1];

      if (segmentStart <= currentPoint && segmentEnd >= currentPoint) {
        if (segmentStart === 0) {
          minClipsToCover[currentPoint] = Math.min(
            minClipsToCover[currentPoint],
            1
          );
        } else if (minClipsToCover[segmentStart] !== Infinity) {
          minClipsToCover[currentPoint] = Math.min(
            minClipsToCover[currentPoint],
            minClipsToCover[segmentStart] + 1
          );
        }
      }
    }
  }

  return minClipsToCover[time] === Infinity ? -1 : minClipsToCover[time];
};
