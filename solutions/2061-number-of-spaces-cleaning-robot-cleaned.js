/**
 * Number Of Spaces Cleaning Robot Cleaned
 * Intuition: The robot's movement is deterministic and the room is finite. This means the robot will eventually revisit a state (current row, current column, current direction) it has been in before. Once a state is repeated, the robot enters an infinite cycle, and all further movements will also be repetitions of previous actions and cleaned cells. Therefore, we can simulate the robot's movement until a state repeats, and count the unique cells cleaned up to that point.
 * Approach: 1. Initialize the robot's starting position (0,0) and initial direction (right). 2. Use two sets: `cleanedLocations` to store unique "row,col" strings representing cleaned cells, and `robotStatesSeen` to store unique "row,col,direction" strings representing visited robot states. 3. Enter an infinite loop to simulate movement. 4. Inside the loop, construct the current robot state string. If this state is already in `robotStatesSeen`, it means a cycle has been detected, so break the loop. 5. Otherwise, add the current robot state to `robotStatesSeen` and the current cell coordinates to `cleanedLocations`. 6. Calculate the next potential cell based on the current direction. 7. Check if the next potential cell is out of bounds or contains an obstacle (room value is 1). 8. If the next step is blocked, the robot turns 90 degrees clockwise by updating its direction. 9. If the next step is clear, the robot moves to that cell by updating its row and column. 10. After the loop terminates, return the total count of unique cells in `cleanedLocations`.
 * Dry Run: roomMatrix = [[0,0,0],[0,0,1],[0,0,0]]
 *   Initial: currentRowPosition=0, currentColPosition=0, currentDirectionIndex=0 (right), cleanedLocations={}, robotStatesSeen={}
 *   Loop 1: State "0,0,0". Add "0,0,0" to robotStatesSeen. Add "0,0" to cleanedLocations. Next is (0,1). Move to (0,1).
 *   Loop 2: State "0,1,0". Add "0,1,0" to robotStatesSeen. Add "0,1" to cleanedLocations. Next is (0,2). Move to (0,2).
 *   Loop 3: State "0,2,0". Add "0,2,0" to robotStatesSeen. Add "0,2" to cleanedLocations. Next is (0,3) (out of bounds). Turn clockwise: currentDirectionIndex=1 (down).
 *   Loop 4: State "0,2,1". Add "0,2,1" to robotStatesSeen. Next is (1,2). roomMatrix[1][2]=1 (obstacle). Turn clockwise: currentDirectionIndex=2 (left).
 *   Loop 5: State "0,2,2". Add "0,2,2" to robotStatesSeen. Next is (0,1). Move to (0,1).
 *   Loop 6: State "0,1,2". Add "0,1,2" to robotStatesSeen. Next is (0,0). Move to (0,0).
 *   Loop 7: State "0,0,2". Add "0,0,2" to robotStatesSeen. Next is (-1,0) (out of bounds). Turn clockwise: currentDirectionIndex=3 (up).
 *   Loop 8: State "0,0,3". Add "0,0,3" to robotStatesSeen. Next is (-1,0) (out of bounds). Turn clockwise: currentDirectionIndex=0 (right).
 *   Loop 9: State "0,0,0". This state is already in robotStatesSeen. Break loop.
 *   Return cleanedLocations.size, which is 3 (cells "0,0", "0,1", "0,2").
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
*/
var numberOfCleanRooms = function (roomMatrix) {
    const totalRows = roomMatrix.length;
    const totalColumns = roomMatrix[0].length;

    const directionDeltas = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    const cleanedLocations = new Set();
    const robotStatesSeen = new Set();

    let currentRowPosition = 0;
    let currentColPosition = 0;
    let currentDirectionIndex = 0;

    while (true) {
        const currentRobotStateKey = `${currentRowPosition},${currentColPosition},${currentDirectionIndex}`;

        if (robotStatesSeen.has(currentRobotStateKey)) {
            break;
        }

        robotStatesSeen.add(currentRobotStateKey);
        cleanedLocations.add(`${currentRowPosition},${currentColPosition}`);

        const deltaRowStep = directionDeltas[currentDirectionIndex][0];
        const deltaColStep = directionDeltas[currentDirectionIndex][1];

        const nextPotentialRow = currentRowPosition + deltaRowStep;
        const nextPotentialColumn = currentColPosition + deltaColStep;

        const isNextStepBlocked = (
            nextPotentialRow < 0 || nextPotentialRow >= totalRows ||
            nextPotentialColumn < 0 || nextPotentialColumn >= totalColumns ||
            roomMatrix[nextPotentialRow][nextPotentialColumn] === 1
        );

        if (isNextStepBlocked) {
            currentDirectionIndex = (currentDirectionIndex + 1) % 4;
        } else {
            currentRowPosition = nextPotentialRow;
            currentColPosition = nextPotentialColumn;
        }
    }

    return cleanedLocations.size;
};