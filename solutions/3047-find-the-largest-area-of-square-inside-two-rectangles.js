/**
 * Find the Largest Area of Square Inside Two Rectangles
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
var largestSquareArea = function (bottomLeft, topRight) {
    const numRectangles = bottomLeft.length;
    let maximumSquareSide = 0;

    for (let firstLoopIndex = 0; firstLoopIndex < numRectangles; firstLoopIndex++) {
        for (let secondLoopIndex = firstLoopIndex + 1; secondLoopIndex < numRectangles; secondLoopIndex++) {
            const firstRectBottomX = bottomLeft[firstLoopIndex][0];
            const firstRectBottomY = bottomLeft[firstLoopIndex][1];
            const firstRectTopX = topRight[firstLoopIndex][0];
            const firstRectTopY = topRight[firstLoopIndex][1];

            const secondRectBottomX = bottomLeft[secondLoopIndex][0];
            const secondRectBottomY = bottomLeft[secondLoopIndex][1];
            const secondRectTopX = topRight[secondLoopIndex][0];
            const secondRectTopY = topRight[secondLoopIndex][1];

            const intersectedLeftX = Math.max(firstRectBottomX, secondRectBottomX);
            const intersectedBottomY = Math.max(firstRectBottomY, secondRectBottomY);
            const intersectedRightX = Math.min(firstRectTopX, secondRectTopX);
            const intersectedTopY = Math.min(firstRectTopY, secondRectTopY);

            if (intersectedLeftX < intersectedRightX && intersectedBottomY < intersectedTopY) {
                const intersectedWidth = intersectedRightX - intersectedLeftX;
                const intersectedHeight = intersectedTopY - intersectedBottomY;
                const currentSquareSide = Math.min(intersectedWidth, intersectedHeight);
                maximumSquareSide = Math.max(maximumSquareSide, currentSquareSide);
            }
        }
    }

    return maximumSquareSide * maximumSquareSide;
};