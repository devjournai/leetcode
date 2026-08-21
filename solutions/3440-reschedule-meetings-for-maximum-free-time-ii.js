/**
 * Reschedule Meetings for Maximum Free Time II
 * Intuition: Moving one meeting either slides it between its neighbors (merge two adjacent gaps) or relocates it into some other gap if it fits, adding its duration to that merge.
 * Approach: 1. Build gaps and prefix/suffix maxima. 2. For each meeting, adjacentGaps = gaps[i]+gaps[i+1]. 3. If duration fits in a non-adjacent max gap, add the duration.
 * Dry Run: eventTime=10, meetings [0,2],[4,7]. Gaps [0,2,3]. Meeting 0 duration 2 fits in the right gap 3, so 0+2+2=4. Meeting 1 duration 3 does not fit left gap 0, so 2+3=5. Answer 5.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var maxFreeTime = function (eventTime, startTime, endTime) {
  const n = startTime.length;
  const gaps = [startTime[0]];
  for (let index = 1; index < n; index++) {
    gaps.push(startTime[index] - endTime[index - 1]);
  }
  gaps.push(eventTime - endTime[n - 1]);

  const maxLeft = new Array(n + 1).fill(0);
  const maxRight = new Array(n + 1).fill(0);
  maxLeft[0] = gaps[0];
  maxRight[n] = gaps[n];
  for (let index = 1; index <= n; index++) {
    maxLeft[index] = Math.max(gaps[index], maxLeft[index - 1]);
  }
  for (let index = n - 1; index >= 0; index--) {
    maxRight[index] = Math.max(gaps[index], maxRight[index + 1]);
  }

  let answer = 0;
  for (let index = 0; index < n; index++) {
    const duration = endTime[index] - startTime[index];
    const adjacentGaps = gaps[index] + gaps[index + 1];
    const otherGap = Math.max(
      index > 0 ? maxLeft[index - 1] : 0,
      index + 2 < n + 1 ? maxRight[index + 2] : 0
    );
    const canRelocate = duration <= otherGap;
    answer = Math.max(answer, adjacentGaps + (canRelocate ? duration : 0));
  }
  return answer;
};
