/**
 * Serialize And Deserialize Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var serialize = function (rootNode) {
    if (!rootNode) {
        return "N";
    }

    const serializationParts = [];
    const nodeTraversalQueue = [rootNode];

    while (nodeTraversalQueue.length > 0) {
        const currentDequeuedNode = nodeTraversalQueue.shift();

        if (currentDequeuedNode === null) {
            serializationParts.push("N");
        } else {
            serializationParts.push(currentDequeuedNode.val);
            nodeTraversalQueue.push(currentDequeuedNode.left);
            nodeTraversalQueue.push(currentDequeuedNode.right);
        }
    }

    const stringValue = serializationParts.join(",");
    return stringValue;
};

var deserialize = function (inputDataString) {
    if (inputDataString === "N") {
        return null;
    }

    const nodeValuesArray = inputDataString.split(",");

    const rootValueString = nodeValuesArray[0];
    const initialRootNode = new TreeNode(Number(rootValueString));

    const buildQueue = [initialRootNode];
    let valueIndex = 1;

    while (buildQueue.length > 0 && valueIndex < nodeValuesArray.length) {
        const currentParentNode = buildQueue.shift();

        const leftValueString = nodeValuesArray[valueIndex];
        valueIndex++;

        if (leftValueString !== "N") {
            const leftTreeNode = new TreeNode(Number(leftValueString));
            currentParentNode.left = leftTreeNode;
            buildQueue.push(leftTreeNode);
        }

        if (valueIndex < nodeValuesArray.length) {
            const rightValueString = nodeValuesArray[valueIndex];
            valueIndex++;

            if (rightValueString !== "N") {
                const rightTreeNode = new TreeNode(Number(rightValueString));
                currentParentNode.right = rightTreeNode;
                buildQueue.push(rightTreeNode);
            }
        }
    }

    return initialRootNode;
};