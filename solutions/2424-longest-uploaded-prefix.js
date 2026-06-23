/**
 * Longest Uploaded Prefix
 *
 * Intuition: A prefix of length i exists only if every video from 1 to i has already been uploaded. Instead of checking the entire range every time longest() is called, we maintain:
 * 1. A boolean array to mark uploaded videos.
 * 2. A pointer representing the current longest prefix.
 *
 * Whenever a new video is uploaded, we check whether it helps
 * extend the current prefix. If yes, we keep moving the pointer
 * forward until we find a missing video.
 *
 * This ensures each video is processed only once.
 *
 * Approach:
 * 1. Create a boolean array uploaded[] of size n + 1.
 * 2. Maintain longestPrefix = 0.
 * 3. upload(video):
 *      - Mark uploaded[video] = true.
 *      - While next video in sequence exists:
 *            longestPrefix++
 * 4. longest():
 *      - Return longestPrefix.
 *
 * Dry Run:
 *
 * n = 4
 *
 * uploaded = [false,false,false,false,false]
 * longestPrefix = 0
 *
 * upload(3)
 *
 * uploaded = [false,false,false,true,false]
 *
 * uploaded[1] = false
 *
 * Cannot move pointer.
 *
 * longest() => 0
 *
 * --------------------------------
 *
 * upload(1)
 *
 * uploaded = [false,true,false,true,false]
 *
 * uploaded[1] = true
 *
 * Move pointer:
 *
 * longestPrefix = 1
 *
 * uploaded[2] = false
 *
 * Stop.
 *
 * longest() => 1
 *
 * --------------------------------
 *
 * upload(2)
 *
 * uploaded = [false,true,true,true,false]
 *
 * uploaded[2] = true
 *
 * Move pointer:
 *
 * longestPrefix = 2
 *
 * uploaded[3] = true
 *
 * longestPrefix = 3
 *
 * uploaded[4] = false
 *
 * Stop.
 *
 * longest() => 3
 *
 * --------------------------------
 *
 * Final Answer:
 *
 * [null,null,0,null,1,null,3]
 *
 * Why does the while loop not become O(N²)?
 *
 * Because every video advances the pointer at most once.
 *
 * Example:
 *
 * 0 -> 1 -> 2 -> 3 -> ... -> n
 *
 * Across all uploads,
 * pointer moves only n times.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var LUPrefix = function (n) {
  this.uploaded = new Array(n + 1).fill(false);
  this.longestPrefix = 0;
};

LUPrefix.prototype.upload = function (video) {
  this.uploaded[video] = true;

  while (this.uploaded[this.longestPrefix + 1]) {
    this.longestPrefix++;
  }
};

LUPrefix.prototype.longest = function () {
  return this.longestPrefix;
};
