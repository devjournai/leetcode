/**
 * Tweet Counts Per Frequency
 * Intuition: Store timestamps per tweet name. A frequency query buckets [start,end] into minute/hour/day bins.
 * Approach: 1. recordTweet appends time to a name list. 2. getTweetCountsPerFrequency sizes buckets by freq seconds. 3. For each stored time in range, increment floor((t-start)/chunk). 4. Return the bucket array.
 * Dry Run: record tweet3 at 0,60,10. get minute 0..59 → [2]; hour 0..59 → [2]; minute 0..60 → [2,1].
 * Time Complexity: O((endTime - startTime) / freq_interval + M)
 * Space Complexity: O(N)
 */
var TweetCounts = function () {
  this.tweetRegistrations = new Map();
};

TweetCounts.prototype.recordTweet = function (tweetName, time) {
  let momentList = this.tweetRegistrations.get(tweetName);
  if (!momentList) {
    momentList = [];
    this.tweetRegistrations.set(tweetName, momentList);
  }
  momentList.push(time);
};

TweetCounts.prototype.getTweetCountsPerFrequency = function (
  freq,
  tweetName,
  startTime,
  endTime
) {
  const durationMap = { minute: 60, hour: 3600, day: 86400 };
  let periodGranularity = durationMap[freq];

  const queryRange = endTime - startTime;
  const bucketCount = Math.floor(queryRange / periodGranularity) + 1;
  const resultBuckets = new Array(bucketCount).fill(0);

  const relevantTweets = this.tweetRegistrations.get(tweetName);

  if (relevantTweets) {
    for (let tweetIndex = 0; tweetIndex < relevantTweets.length; tweetIndex++) {
      const tweetTimestamp = relevantTweets[tweetIndex];
      if (tweetTimestamp >= startTime && tweetTimestamp <= endTime) {
        const targetBucket = Math.floor(
          (tweetTimestamp - startTime) / periodGranularity
        );
        resultBuckets[targetBucket]++;
      }
    }
  }

  return resultBuckets;
};
