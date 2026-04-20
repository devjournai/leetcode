/**
 * Simplify Path
 * Time Complexity: O(L)
 * Space Complexity: O(L)
*/
var simplifyPath = function (path) {
    const directoryStack = [];
    const pathComponents = path.split('/');

    pathComponents.forEach(currentComponent => {
        if (currentComponent === '..') {
            if (directoryStack.length > 0) {
                directoryStack.pop();
            }
        } else if (currentComponent !== '' && currentComponent !== '.') {
            directoryStack.push(currentComponent);
        }
    });

    return `/${directoryStack.join('/')}`;
};