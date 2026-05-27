/**
 * Destroying Asteroids
 * Intuition: To successfully destroy all asteroids, the planet's mass must be maximized at every collision. This is best achieved by consuming the smallest asteroids first, as they increase the planet's mass while posing the least immediate threat.
 * Approach: 1. Sort the given asteroids array in non-decreasing order (in-place) to ensure we encounter smaller asteroids first. 2. Initialize a variable to hold the planet's current mass, converting the initial 'mass' to BigInt to prevent potential overflow. 3. Iterate through the sorted asteroids using a standard 'for' loop. 4. For each asteroid, compare its mass with the current planet's mass (also as BigInt). 5. If the planet's mass is ever strictly less than an asteroid's mass, it cannot destroy that asteroid (or any subsequent larger ones), so immediately return false. 6. Otherwise, the planet successfully destroys the asteroid and its mass is added to the planet's mass. 7. If the loop completes, it means all asteroids were processed and destroyed, so return true.
 * Dry Run: mass = 10, asteroids = [3, 9, 20, 15]
 *   1. Sort `asteroids` in-place: `asteroids` becomes `[3, 9, 15, 20]`
 *   2. `currentPlanetPower = BigInt(10)`
 *   3. Loop `asteroidIndex` from 0 to 3:
 *      - `asteroidIndex = 0`, `currentRockMass = 3`: `currentPlanetPower` (10) >= `BigInt(3)`? Yes. `currentPlanetPower = BigInt(10) + BigInt(3) = BigInt(13)`
 *      - `asteroidIndex = 1`, `currentRockMass = 9`: `currentPlanetPower` (13) >= `BigInt(9)`? Yes. `currentPlanetPower = BigInt(13) + BigInt(9) = BigInt(22)`
 *      - `asteroidIndex = 2`, `currentRockMass = 15`: `currentPlanetPower` (22) >= `BigInt(15)`? Yes. `currentPlanetPower = BigInt(22) + BigInt(15) = BigInt(37)`
 *      - `asteroidIndex = 3`, `currentRockMass = 20`: `currentPlanetPower` (37) >= `BigInt(20)`? Yes. `currentPlanetPower = BigInt(37) + BigInt(20) = BigInt(57)`
 *   4. Loop finishes. All asteroids destroyed. Return `true`.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var asteroidsDestroyed = function (mass, asteroids) {
  asteroids.sort((firstElement, secondElement) => firstElement - secondElement);

  let currentPlanetPower = BigInt(mass);
  const numberOfAsteroids = asteroids.length;

  for (
    let asteroidIndex = 0;
    asteroidIndex < numberOfAsteroids;
    ++asteroidIndex
  ) {
    const currentRockMass = asteroids[asteroidIndex];
    if (currentPlanetPower < BigInt(currentRockMass)) {
      return false;
    }
    currentPlanetPower += BigInt(currentRockMass);
  }

  return true;
};
