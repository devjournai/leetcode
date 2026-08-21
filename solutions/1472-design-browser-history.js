/**
 * Design Browser History
 * Intuition: Store history in an array plus a current index. visit truncates anything forward of the cursor; back/forward clamp the index.
 * Approach: 1. Constructor sets pageList empty and visits the homepage. 2. visit splices away forward entries, pushes the url, increments position. 3. back moves currentPosition to max(0, pos-steps). 4. forward moves to min(pos+steps, last index).
 * Dry Run: homepage leetcode.com, visit google.com, visit facebook.com, back 1, back 1, forward 1
 *   - list [leetcode, google, facebook], pos=2
 *   - back -> google, back -> leetcode, forward -> google
 * Time Complexity: O(N)
 * Space Complexity: O(M)
 */
var BrowserHistory = function (homepage) {
  this.pageList = [];
  this.currentPosition = -1;
  this.visit(homepage);
};

BrowserHistory.prototype.visit = function (urlToVisit) {
  this.pageList.splice(
    this.currentPosition + 1,
    this.pageList.length - (this.currentPosition + 1)
  );
  this.pageList.push(urlToVisit);
  this.currentPosition++;
};

BrowserHistory.prototype.back = function (stepsToGoBack) {
  const newPositionBackward = Math.max(0, this.currentPosition - stepsToGoBack);
  this.currentPosition = newPositionBackward;
  return this.pageList[this.currentPosition];
};

BrowserHistory.prototype.forward = function (stepsToAdvance) {
  const maximumIndex = this.pageList.length - 1;
  const newPositionForward = Math.min(
    this.currentPosition + stepsToAdvance,
    maximumIndex
  );
  this.currentPosition = newPositionForward;
  return this.pageList[this.currentPosition];
};
