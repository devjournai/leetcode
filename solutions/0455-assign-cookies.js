/**
 * Assign Cookies
 * Time Complexity: O(g.length log g.length + s.length log s.length)
 * Space Complexity: O(1)
*/
var findContentChildren = function (g, s) {
    g.sort((firstElement, secondElement) => firstElement - secondElement);
    s.sort((initialValue, subsequentValue) => initialValue - subsequentValue);

    let childPointer = 0;
    let cookiePointer = 0;
    let contentChildrenCount = 0;

    while (childPointer < g.length && cookiePointer < s.length) {
        if (s[cookiePointer] >= g[childPointer]) {
            contentChildrenCount++;
            childPointer++;
        }
        cookiePointer++;
    }

    return contentChildrenCount;
};