/**
 * Display Table Of Food Orders In A Restaurant
 * Intuition: Aggregate counts per (table, food), then print tables in numeric order and foods in alphabetical order with a header row.
 * Approach: 1. Scan orders, collecting unique foods and a map table → food → count. 2. Sort food names; header is ["Table", ...foods]. 3. Sort table numbers numerically. 4. For each table, emit the table id and each food count as strings.
 * Dry Run: orders = [["David","3","Ceviche"],["Corina","10","Beef Burrito"],["David","3","Fried Chicken"]].
 *   - Foods sorted Beef Burrito, Ceviche, Fried Chicken. Table 3: 0,1,1; table 10: 1,0,0.
 * Time Complexity: O(N + T*F + F log F + T log T)
 * Space Complexity: O(T*F)
 */
var displayTable = function (orders) {
  const allUniqueFoodItems = new Set();
  const tableSpecificOrderCounts = new Map();

  for (const singleOrderRecord of orders) {
    const tableIdentifier = singleOrderRecord[1];
    const foodTypeOrdered = singleOrderRecord[2];

    allUniqueFoodItems.add(foodTypeOrdered);

    let currentTableFoodMap = tableSpecificOrderCounts.get(tableIdentifier);
    if (!currentTableFoodMap) {
      currentTableFoodMap = new Map();
      tableSpecificOrderCounts.set(tableIdentifier, currentTableFoodMap);
    }

    currentTableFoodMap.set(
      foodTypeOrdered,
      (currentTableFoodMap.get(foodTypeOrdered) || 0) + 1
    );
  }

  const sortedFoodNameArray = [...allUniqueFoodItems].sort();
  const tableSummaryHeader = ["Table", ...sortedFoodNameArray];

  const allTableNumbers = [...tableSpecificOrderCounts.keys()];
  const numericallySortedTableNumbers = allTableNumbers.sort(
    (firstNum, secondNum) => Number(firstNum) - Number(secondNum)
  );

  const finalDisplayMatrix = [tableSummaryHeader];

  for (const currentTableNumber of numericallySortedTableNumbers) {
    const tableRowEntry = [currentTableNumber];
    const currentTableItemCounts =
      tableSpecificOrderCounts.get(currentTableNumber);

    for (const singleFoodItemName of sortedFoodNameArray) {
      const itemCount = currentTableItemCounts.get(singleFoodItemName) || 0;
      tableRowEntry.push(String(itemCount));
    }
    finalDisplayMatrix.push(tableRowEntry);
  }

  return finalDisplayMatrix;
};
