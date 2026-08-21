/**
 * Asteroid Collision
 * Intuition: Only a right-moving stack top (`> 0`) and a left-moving incoming (`< 0`) collide. Compare sizes: smaller explodes; equal both explode; larger survives. Same-direction or left-then-right never collide.
 * Approach: 1. Scan asteroids. 2. While stack top is positive and incoming is negative, pop if top is smaller, explode both if equal, or explode incoming if top is larger. 3. Push incoming unless `didIncomingAsteroidExplode`. Return `survivorsStack`.
 * Dry Run: [5,10,-5] → 10 vs -5, 10 wins → [5,10]. [8,-8] both explode → []. [10,2,-5] 2 explodes then 10 wins → [10].
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
