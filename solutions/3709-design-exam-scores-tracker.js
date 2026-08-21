/**
 * Design Exam Scores Tracker
 * Intuition: Records arrive in increasing time, so prefix sums plus binary search answer range totals.
 * Approach: times/pre start with a sentinel 0. record appends time and running score. totalScore finds last index < startTime and last index <= endTime.
 * Dry Run: record(1, 10) then record(3, 20). Query [1, 3] is prefix[2]-prefix[0] = 30.
 * Time Complexity: O(log Q) per query
 * Space Complexity: O(Q)
 */
var ExamTracker = function () {
  this.times = [0];
  this.prefixScores = [0];
};

ExamTracker.prototype.record = function (time, score) {
  this.times.push(time);
  this.prefixScores.push(
    this.prefixScores[this.prefixScores.length - 1] + score
  );
};

ExamTracker.prototype.totalScore = function (startTime, endTime) {
  const left = lowerBound(this.times, startTime) - 1;
  const right = lowerBound(this.times, endTime + 1) - 1;
  return this.prefixScores[right] - this.prefixScores[left];
};

function lowerBound(arr, target) {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}
