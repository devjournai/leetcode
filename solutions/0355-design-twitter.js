/**
 * Design Twitter
 * Time Complexity: O(T + U)
 * Space Complexity: O(T + U + F)
 */
var Twitter = function () {
  this.allTweets = [];
  this.followGraph = new Map();
  this.tweetTimestampCounter = 0;
};

Twitter.prototype.postTweet = function (userId, tweetId) {
  this.tweetTimestampCounter++;
  let currentTimestamp = this.tweetTimestampCounter;
  let posterIdentifier = userId;
  let postedTweetIdentifier = tweetId;
  let newTweetRecord = [
    currentTimestamp,
    postedTweetIdentifier,
    posterIdentifier,
  ];
  this.allTweets.push(newTweetRecord);
};

Twitter.prototype.getNewsFeed = function (userId) {
  let requestingUser = userId;
  let newsFeedResult = [];
  const MAX_FEED_SIZE = 10;

  let usersToMonitor = new Set();
  usersToMonitor.add(requestingUser);

  let currentFollowees = this.followGraph.get(requestingUser);
  if (currentFollowees) {
    for (let oneFollowee of currentFollowees) {
      usersToMonitor.add(oneFollowee);
    }
  }

  let tweetPointer = this.allTweets.length - 1;
  while (tweetPointer >= 0 && newsFeedResult.length < MAX_FEED_SIZE) {
    let currentTweetEntry = this.allTweets[tweetPointer];
    let tweetCreatorId = currentTweetEntry[2];

    if (usersToMonitor.has(tweetCreatorId)) {
      let extractedTweetId = currentTweetEntry[1];
      newsFeedResult.push(extractedTweetId);
    }
    tweetPointer--;
  }
  return newsFeedResult;
};

Twitter.prototype.follow = function (followerId, followeeId) {
  let personA = followerId;
  let personB = followeeId;

  switch (true) {
    case personA === personB:
      return;
  }

  let userFollowersRef = this.followGraph.get(personA);
  userFollowersRef ||
    this.followGraph.set(personA, (userFollowersRef = new Set()));

  userFollowersRef.add(personB);
};

Twitter.prototype.unfollow = function (followerId, followeeId) {
  let userA = followerId;
  let userB = followeeId;

  this.followGraph.has(userA) && this.followGraph.get(userA).delete(userB);
};
