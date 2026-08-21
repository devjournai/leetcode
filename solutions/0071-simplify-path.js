/**
 * Simplify Path
 * Intuition: A Unix path is a sequence of components split by `/`; treat `.` as stay, `..` as pop one directory, and skip empty pieces from extra slashes, then rebuild an absolute path from the remaining names.
 * Approach: 1. Split `path` on `/` into components. 2. Walk them with a stack: pop on `..` (if the stack is non-empty), ignore `''` and `.`, otherwise push the name. 3. Join the stack with `/` and prefix a leading `/`.
 * Dry Run: path="/a/./b/../../c/" → components a, ., b, .., .., c, '' → stack [a] → [a] → [a,b] → [a] → [] → [c] → "/c"
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var simplifyPath = function (path) {
  const directoryStack = [];
  const pathComponents = path.split("/");

  pathComponents.forEach((currentComponent) => {
    if (currentComponent === "..") {
      if (directoryStack.length > 0) {
        directoryStack.pop();
      }
    } else if (currentComponent !== "" && currentComponent !== ".") {
      directoryStack.push(currentComponent);
    }
  });

  return `/${directoryStack.join("/")}`;
};
