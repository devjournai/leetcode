/**
 * Video Stitching
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
            1,
          );
        } else if (minClipsToCover[segmentStart] !== Infinity) {
          minClipsToCover[currentPoint] = Math.min(
            minClipsToCover[currentPoint],
            minClipsToCover[segmentStart] + 1,
          );
        }
      }
    }
  }

  return minClipsToCover[time] === Infinity ? -1 : minClipsToCover[time];
};
