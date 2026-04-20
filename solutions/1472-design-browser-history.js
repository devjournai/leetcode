/**
 * Design Browser History
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
    this.pageList.length - (this.currentPosition + 1),
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
    maximumIndex,
  );
  this.currentPosition = newPositionForward;
  return this.pageList[this.currentPosition];
};
