/**
 * Contains Duplicate
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var containsDuplicate = function (nums) {
    const encounteredElements = {};

    for (let currentElement of nums) {
        if (encounteredElements[currentElement] !== undefined) {
            return true;
        }
        encounteredElements[currentElement] = true;
    }

    return false;
};