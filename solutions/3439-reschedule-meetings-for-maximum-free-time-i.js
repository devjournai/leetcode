/**
 * Reschedule Meetings for Maximum Free Time I
 * Intuition: Rescheduling up to k meetings lets you merge k+1 consecutive gaps. The answer is the maximum sliding window of k+1 gaps.
 * Approach: 1. Build gaps: before the first meeting, between meetings, and after the last. 2. Sliding-window sum of length k+1. 3. Return the maximum window.
 * Dry Run: eventTime=10, k=1, meetings [0,2],[4,6]. Gaps = [0,2,4]. Windows of 2: 0+2=2, 2+4=6. Answer 6.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var maxFreeTime = function (eventTime, k, startTime, endTime) {
  const gaps = [startTime[0]];
  for (let index = 1; index < startTime.length; index++) {
    gaps.push(startTime[index] - endTime[index - 1]);
  }
  gaps.push(eventTime - endTime[endTime.length - 1]);

  let windowSum = 0;
  for (let index = 0; index <= k; index++) {
    windowSum += gaps[index];
  }
  let answer = windowSum;
  for (let index = k + 1; index < gaps.length; index++) {
    windowSum += gaps[index] - gaps[index - k - 1];
    answer = Math.max(answer, windowSum);
  }
  return answer;
};
