/**
 * Top K Frequent Elements
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var topKFrequent = function (numsArray, kValue) {
    const frequencyCounter = new Map();

    for (const numValue of numsArray) {
        const currentCount = frequencyCounter.get(numValue) || 0;
        frequencyCounter.set(numValue, currentCount + 1);
    }

    const bucketCollection = new Array(numsArray.length + 1).fill(null).map(() => []);

    for (const [elementItem, elementFrequency] of frequencyCounter.entries()) {
        bucketCollection[elementFrequency].push(elementItem);
    }

    const resultElements = [];
    for (let frequencyIndex = bucketCollection.length - 1; frequencyIndex >= 0; frequencyIndex--) {
        const elementsAtCurrentFrequency = bucketCollection[frequencyIndex];
        if (elementsAtCurrentFrequency.length > 0) {
            for (const elementToCollect of elementsAtCurrentFrequency) {
                if (resultElements.length < kValue) {
                    resultElements.push(elementToCollect);
                } else {
                    break;
                }
            }
        }
        if (resultElements.length === kValue) {
            break;
        }
    }

    return resultElements;
};