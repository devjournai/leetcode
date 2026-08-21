/**
 * Exclusive Time Of Functions
 * Intuition: Exclusive time is the intervals a function is on top of the call stack. On start, credit the previous top up to now; on end, credit popped id through this timestamp (inclusive) and resume at timestamp+1.
 * Approach: 1. Parse each log as id, start/end, timestamp. 2. On start, if the stack is non-empty add `actualTimestamp - previousTimestampRecorded` to the current top, then push. 3. On end, pop, add `timestamp - prev + 1`, set prev to timestamp+1. 4. Return `functionTotalExecutionTimes`.
 * Dry Run: n=2, logs=["0:start:0","1:start:2","1:end:5","0:end:6"].
 *   - 0 starts at 0. 1 starts at 2 → 0 gets 2. 1 ends at 5 → 1 gets 4. 0 ends at 6 → 0 gets 1. Return [3,4].
 * Time Complexity: O(M)
 * Space Complexity: O(N)
 */
var exclusiveTime = function (n, logs) {
  const callStackTracker = [];
  const functionTotalExecutionTimes = new Array(n).fill(0);
  let previousTimestampRecorded = 0;

  for (const currentLogRecord of logs) {
    const logParts = currentLogRecord.split(":");
    const functionIdValue = parseInt(logParts[0], 10);
    const eventKind = logParts[1];
    const actualTimestamp = parseInt(logParts[2], 10);

    if (eventKind === "start") {
      if (callStackTracker.length > 0) {
        const currentlyExecutingFunction =
          callStackTracker[callStackTracker.length - 1];
        functionTotalExecutionTimes[currentlyExecutingFunction] +=
          actualTimestamp - previousTimestampRecorded;
      }
      callStackTracker.push(functionIdValue);
      previousTimestampRecorded = actualTimestamp;
    } else {
      // eventKind === 'end'
      const completedFunctionId = callStackTracker.pop();
      functionTotalExecutionTimes[completedFunctionId] +=
        actualTimestamp - previousTimestampRecorded + 1;
      previousTimestampRecorded = actualTimestamp + 1;
    }
  }

  return functionTotalExecutionTimes;
};
