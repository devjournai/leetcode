/**
 * Button with Longest Push Time
 * Intuition: Events are already ordered by time. The press duration of an event is `time - previousTime` (previous starts at 0). Keep the longest duration, breaking ties by the smaller button index.
 * Approach: 1. Scan events left to right. 2. duration = time - prevTime. 3. Update answer when duration is larger, or equal and index is smaller. 4. Set prevTime = time.
 * Dry Run: events = [[1,2],[2,5],[3,9],[1,15]].
 *   - Button 1: 2-0=2. Button 2: 3. Button 3: 4. Button 1: 6. Longest is 6 → index 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var buttonWithLongestTime = function (events) {
  let longestButtonIndex = 0;
  let longestDuration = 0;
  let previousTime = 0;

  for (const [buttonIndex, eventTime] of events) {
    const pressDuration = eventTime - previousTime;
    if (
      pressDuration > longestDuration ||
      (pressDuration === longestDuration && buttonIndex < longestButtonIndex)
    ) {
      longestDuration = pressDuration;
      longestButtonIndex = buttonIndex;
    }
    previousTime = eventTime;
  }

  return longestButtonIndex;
};
