/**
 * Unique Paths
 * Time Complexity: O(m*n)
 * Space Complexity: O(n)
*/
var uniquePaths = function (m, n) {
    const pathsInCurrentRow = new Array(n);

    for (let columnIndex = 0; columnIndex < n; columnIndex++) {
        pathsInCurrentRow[columnIndex] = 1;
    }

    for (let currentRow = 1; currentRow < m; currentRow++) {
        for (let currentColumn = 1; currentColumn < n; currentColumn++) {
            pathsInCurrentRow[currentColumn] += pathsInCurrentRow[currentColumn - 1];
        }
    }

    return pathsInCurrentRow[n - 1];
};