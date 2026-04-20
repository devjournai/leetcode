/**
 * Minimum Number Of Arrows To Burst Balloons
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
*/
var findMinArrowShots = function (points) {
    if (points.length === 0) {
        return 0;
    }

    points.sort((firstBalloonItem, secondBalloonItem) => firstBalloonItem[1] - secondBalloonItem[1]);

    let totalArrowsShot = 0;
    let currentBalloonIndex = 0;

    for (currentBalloonIndex = 0; currentBalloonIndex < points.length;) {
        totalArrowsShot++;

        let arrowImpactPosition = points[currentBalloonIndex][1];

        currentBalloonIndex++;

        while (currentBalloonIndex < points.length && points[currentBalloonIndex][0] <= arrowImpactPosition) {
            currentBalloonIndex++;
        }
    }

    return totalArrowsShot;
};