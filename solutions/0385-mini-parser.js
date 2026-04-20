/**
 * Mini Parser
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var deserialize = function (s) {
    if (s[0] !== '[') {
        const finalValue = parseInt(s);
        const singleItem = new NestedInteger();
        singleItem.setInteger(finalValue);
        return singleItem;
    }

    const objectStack = [];
    let currentPosition = 0;
    let primaryResult;

    while (currentPosition < s.length) {
        const currentCharacter = s[currentPosition];

        if (currentCharacter === '[') {
            const newListInstance = new NestedInteger();
            if (objectStack.length > 0) {
                const containingList = objectStack[objectStack.length - 1];
                containingList.add(newListInstance);
            }
            objectStack.push(newListInstance);
            if (!primaryResult) {
                primaryResult = newListInstance;
            }
            currentPosition++;
        } else if (currentCharacter === ']') {
            objectStack.pop();
            currentPosition++;
        } else if (currentCharacter === ',') {
            currentPosition++;
        } else {
            let numberStart = currentPosition;
            if (currentCharacter === '-') {
                currentPosition++;
            }
            while (currentPosition < s.length && s[currentPosition] >= '0' && s[currentPosition] <= '9') {
                currentPosition++;
            }
            const numericSegment = s.substring(numberStart, currentPosition);
            const parsedInteger = parseInt(numericSegment);

            const integerWrapper = new NestedInteger();
            integerWrapper.setInteger(parsedInteger);

            if (objectStack.length > 0) {
                const activeParent = objectStack[objectStack.length - 1];
                activeParent.add(integerWrapper);
            }
        }
    }

    return primaryResult;
};