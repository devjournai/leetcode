/**
    * Next Greater Element I
    * Time Complexity: O(N + M)
    * Space Complexity: O(M)
*/
var nextGreaterElement = function (nums1, nums2) {
    const nextGreaterMappings = new Map();
    const decreasingStack = [];

    for (let currentIterator = 0; currentIterator < nums2.length; currentIterator++) {
        let currentElement = nums2[currentIterator];
        while (decreasingStack.length > 0 && currentElement > decreasingStack[decreasingStack.length - 1]) {
            let poppedValue = decreasingStack.pop();
            nextGreaterMappings.set(poppedValue, currentElement);
        }
        decreasingStack.push(currentElement);
    }

    while (decreasingStack.length > 0) {
        let remainingElement = decreasingStack.pop();
        nextGreaterMappings.set(remainingElement, -1);
    }

    const finalAnswer = nums1.map(queryNumber => {
        return nextGreaterMappings.get(queryNumber);
    });

    return finalAnswer;
};