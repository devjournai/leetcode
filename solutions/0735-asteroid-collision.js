/**
 * Asteroid Collision
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var asteroidCollision = function (asteroids) {
  const survivorsStack = [];
  let currentAsteroidScanIndex = 0;
  const totalAsteroidCount = asteroids.length;

  while (currentAsteroidScanIndex < totalAsteroidCount) {
    const currentIncomingAsteroid = asteroids[currentAsteroidScanIndex];
    let didIncomingAsteroidExplode = false;

    while (
      survivorsStack.length > 0 &&
      survivorsStack[survivorsStack.length - 1] > 0 &&
      currentIncomingAsteroid < 0
    ) {
      const stackTopAsteroid = survivorsStack[survivorsStack.length - 1];
      const incomingAsteroidAbsoluteSize = Math.abs(currentIncomingAsteroid);

      if (stackTopAsteroid === incomingAsteroidAbsoluteSize) {
        survivorsStack.pop();
        didIncomingAsteroidExplode = true;
        break;
      } else if (stackTopAsteroid < incomingAsteroidAbsoluteSize) {
        survivorsStack.pop();
      } else {
        didIncomingAsteroidExplode = true;
        break;
      }
    }

    if (!didIncomingAsteroidExplode) {
      survivorsStack.push(currentIncomingAsteroid);
    }

    currentAsteroidScanIndex++;
  }

  return survivorsStack;
};
