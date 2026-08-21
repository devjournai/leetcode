/**
 * Statistics From A Large Sample
 * Intuition: count[v] is a histogram of values 0–255, so min, max, mean, mode, and median are all scans of 256 buckets using running totals for the middle rank(s).
 * Approach: 1. One pass: min/max, sum, n, mode (highest frequency). 2. Mean = sum/n. 3. Walk frequencies until covering n/2 (and n/2−1 if even) for the median. 4. Return [min,max,mean,median,mode].
 * Dry Run: count with 1 at index 1 and 1 at index 4 (n=2 even). min=1, max=4, mean=2.5, median=2.5, mode=1 (first peak).
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
