/**
 * Tweet Counts Per Frequency
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
  endTime,
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
          (tweetTimestamp - startTime) / periodGranularity,
        );
        resultBuckets[targetBucket]++;
      }
    }
  }

  return resultBuckets;
};
