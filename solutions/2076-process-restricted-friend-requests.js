/**
* Process Restricted Friend Requests
* Intuition: Manage friendships using a Disjoint Set Union (DSU) data structure. For each friend request, simulate a potential union and check if it violates any restrictions before making the union permanent.
* Approach: 1. Initialize a DSU structure where each person is in their own set. 2. Iterate through each friend request in the given order. 3. For each request `[personA, personB]`, determine their current set representatives (`rootA`, `rootB`). 4. Assume the request is initially successful. 5. Iterate through all `restrictions`, where each restriction is `[forbiddenPersonX, forbiddenPersonY]`. 6. For each restriction, find the current set representatives of `forbiddenPersonX` and `forbiddenPersonY` (`rootForbiddenX`, `rootForbiddenY`). 7. Check if merging `rootA` and `rootB` would cause `rootForbiddenX` and `rootForbiddenY` to end up in the same set. This occurs if (`rootA` is `rootForbiddenX` AND `rootB` is `rootForbiddenY`) OR (`rootA` is `rootForbiddenY` AND `rootB` is `rootForbiddenX`). 8. If a violation is found, mark the request as unsuccessful and stop checking further restrictions for this request. 9. Store the success status for the current request. 10. If the request was successful, perform the DSU union operation for `personA` and `personB`, merging their sets. 11. Return the array of success statuses for all requests.
* Dry Run: N = 3, restrictions = [[0,1]], requests = [[0,2], [1,2]]
* Initial: `parentArray = [0,1,2]`, `friendshipOutcomes = []`
* Request 1: `[0,2]` (`requestIndex = 0`)
* `personA = 0`, `personB = 2`. `rootOfPersonA = 0`, `rootOfPersonB = 2`. `canMergeGroups = true`.
*   Restriction `[0,1]`: `forbiddenPersonX = 0`, `forbiddenPersonY = 1`. `rootForbiddenX = 0`, `rootForbiddenY = 1`.
*   Check: `(0===0 && 2===1) || (0===1 && 2===0)` -> `(T && F) || (F && F)` -> `false`. No violation.
*   `friendshipOutcomes[0] = true`. `uniteSets(0,2)` -> `parentArray` becomes `[2,1,2]` (e.g., 0 points to 2).
* Request 2: `[1,2]` (`requestIndex = 1`)
* `personA = 1`, `personB = 2`. `rootOfPersonA = findSetRepresentative(1)` -> 1. `rootOfPersonB = findSetRepresentative(2)` -> 2. `canMergeGroups = true`.
* Restriction `[0,1]`: `forbiddenPersonX = 0`, `forbiddenPersonY = 1`. `rootForbiddenX = findSetRepresentative(0)` -> 2 (0's root is now 2). `rootForbiddenY = findSetRepresentative(1)` -> 1.
* Check: `(1===2 && 2===1) || (1===1 && 2===2)` -> `(F && F) || (T && T)` -> `true`. Violation detected! `canMergeGroups = false`. Break restriction loop.
* `friendshipOutcomes[1] = false`. No union performed.
* Result: `[true, false]`.
* Time Complexity: O(R * M * α(N))
* Space Complexity: O(N + R)
*/
var friendRequests = function (totalPeople, restrictedPairs, friendRequestsList) {
    const parentArray = Array.from({ length: totalPeople }, (_, indexIdentifier) => indexIdentifier);

    const findSetRepresentative = (memberIdentifier) => {
        if (parentArray[memberIdentifier] === memberIdentifier) {
            return memberIdentifier;
        }
        parentArray[memberIdentifier] = findSetRepresentative(parentArray[memberIdentifier]);
        return parentArray[memberIdentifier];
    };

    const uniteSets = (firstMember, secondMember) => {
        const rootOfFirst = findSetRepresentative(firstMember);
        const rootOfSecond = findSetRepresentative(secondMember);
        if (rootOfFirst !== rootOfSecond) {
            parentArray[rootOfFirst] = rootOfSecond;
        }
    };

    const friendshipOutcomes = new Array(friendRequestsList.length);

    for (let requestCounter = 0; requestCounter < friendRequestsList.length; ++requestCounter) {
        const [personOne, personTwo] = friendRequestsList[requestCounter];

        const rootOfPersonOne = findSetRepresentative(personOne);
        const rootOfPersonTwo = findSetRepresentative(personTwo);

        let canMergeGroups = true;

        for (let restrictionIterator = 0; restrictionIterator < restrictedPairs.length; ++restrictionIterator) {
            const [forbiddenPersonX, forbiddenPersonY] = restrictedPairs[restrictionIterator];
            const rootForbiddenX = findSetRepresentative(forbiddenPersonX);
            const rootForbiddenY = findSetRepresentative(forbiddenPersonY);

            if ((rootOfPersonOne === rootForbiddenX && rootOfPersonTwo === rootForbiddenY) ||
                (rootOfPersonOne === rootForbiddenY && rootOfPersonTwo === rootForbiddenX)) {
                canMergeGroups = false;
                break;
            }
        }

        friendshipOutcomes[requestCounter] = canMergeGroups;

        if (canMergeGroups) {
            uniteSets(personOne, personTwo);
        }
    }

    return friendshipOutcomes;
};