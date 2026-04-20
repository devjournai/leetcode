/**
 * Exclusive Time Of Functions
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
