/**
 * Queue Reconstruction By Height
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var reconstructQueue = function (people) {
    const sortedPeopleArray = people.sort(([currentHeightOne, currentKValueOne], [nextHeightTwo, nextKValueTwo]) => {
        return nextHeightTwo - currentHeightOne || currentKValueOne - nextKValueTwo;
    });

    const reconstructedResult = sortedPeopleArray.reduce((accumulatedQueue, currentPerson) => {
        const kIndex = currentPerson[1];
        accumulatedQueue.splice(kIndex, 0, currentPerson);
        return accumulatedQueue;
    }, []);

    return reconstructedResult;
};