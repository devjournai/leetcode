/**
 * Statistics From A Large Sample
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var sampleStats = function (count) {
  let minimumSampleValue = 256;
  let maximumSampleValue = -1;
  let overallSum = 0;
  let totalObservationCount = 0;
  let mostFrequentEntry = 0;
  let peakFrequency = 0;

  for (let sampleIndex = 0; sampleIndex < 256; sampleIndex++) {
    const currentEntryFrequency = count[sampleIndex];
    if (currentEntryFrequency > 0) {
      if (sampleIndex < minimumSampleValue) {
        minimumSampleValue = sampleIndex;
      }
      if (sampleIndex > maximumSampleValue) {
        maximumSampleValue = sampleIndex;
      }
      overallSum += sampleIndex * currentEntryFrequency;
      totalObservationCount += currentEntryFrequency;

      if (currentEntryFrequency > peakFrequency) {
        peakFrequency = currentEntryFrequency;
        mostFrequentEntry = sampleIndex;
      }
    }
  }

  const calculatedMean =
    totalObservationCount === 0 ? 0 : overallSum / totalObservationCount;

  let medianValueResult;
  const isObservationCountOdd = totalObservationCount % 2 === 1;
  let cumulativeObservationTracker = 0;
  let firstMedianCandidate = -1;

  for (
    let currentNumericValue = 0;
    currentNumericValue < 256;
    currentNumericValue++
  ) {
    const currentNumericalFrequency = count[currentNumericValue];
    if (currentNumericalFrequency === 0) {
      continue;
    }

    if (isObservationCountOdd) {
      const medianTargetPositionOdd = Math.floor(totalObservationCount / 2);
      if (
        cumulativeObservationTracker <= medianTargetPositionOdd &&
        cumulativeObservationTracker + currentNumericalFrequency >
          medianTargetPositionOdd
      ) {
        medianValueResult = currentNumericValue;
        break;
      }
    } else {
      const medianTargetPositionOne = totalObservationCount / 2 - 1;
      const medianTargetPositionTwo = totalObservationCount / 2;

      if (
        firstMedianCandidate === -1 &&
        cumulativeObservationTracker <= medianTargetPositionOne &&
        cumulativeObservationTracker + currentNumericalFrequency >
          medianTargetPositionOne
      ) {
        firstMedianCandidate = currentNumericValue;
      }

      if (
        cumulativeObservationTracker <= medianTargetPositionTwo &&
        cumulativeObservationTracker + currentNumericalFrequency >
          medianTargetPositionTwo
      ) {
        if (firstMedianCandidate === -1) {
          firstMedianCandidate = currentNumericValue;
        }
        medianValueResult = (firstMedianCandidate + currentNumericValue) / 2;
        break;
      }
    }
    cumulativeObservationTracker += currentNumericalFrequency;
  }

  return [
    minimumSampleValue,
    maximumSampleValue,
    calculatedMean,
    medianValueResult,
    mostFrequentEntry,
  ];
};
