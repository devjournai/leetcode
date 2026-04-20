/**
 * Design Hit Counter
 * Time Complexity: O(1)
 * Space Complexity: O(1)
*/
var HitCounter = function () {
    this.timeStampsArray = new Array(300).fill(0);
    this.totalCountsArray = new Array(300).fill(0);
};

HitCounter.prototype.hit = function (timestamp) {
    let currentSecondSlot = timestamp % 300;

    if (this.timeStampsArray[currentSecondSlot] === timestamp) {
        this.totalCountsArray[currentSecondSlot]++;
    } else {
        this.timeStampsArray[currentSecondSlot] = timestamp;
        this.totalCountsArray[currentSecondSlot] = 1;
    }
};

HitCounter.prototype.getHits = function (timestamp) {
    let allRecentHits = 0;
    let minimumValidTime = timestamp - 300;

    for (let counterIndex = 0; counterIndex < 300; counterIndex++) {
        let bucketTimestamp = this.timeStampsArray[counterIndex];
        if (bucketTimestamp > minimumValidTime) {
            allRecentHits += this.totalCountsArray[counterIndex];
        }
    }

    return allRecentHits;
};