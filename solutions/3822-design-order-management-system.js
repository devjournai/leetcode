/**
 * Design Order Management System
 * Intuition: We use a hash table $\textit{orders}$ to store the type and price information of each order, where the key is the order ID and the value is a tuple $(\textit{orderType}, \textit{price})$. Additionally, we use another hash table $\textit{t}$ to store the list of order IDs corresponding to each $(\textit{orderType}, \textit{price})$, where the key is a tuple $(\textit{orderType}, \textit{price})$ and the value is the list of order IDs. When calling $\texttt{addOrder}$, we add the order information to $\textit{orders}$ and append the order ID to the corresponding list in $\textit{t}$. When calling $\texttt{modifyOrder}$, we first retrieve the order type and old price from $\textit{orders}$, then update the order's price information. Next, we remove the order ID from the corresponding list in $\textit{t}$ and add it to the list corresponding to the new price. When calling $\texttt{cancelOrde...
 * Approach: We use a hash table $\textit{orders}$ to store the type and price information of each order, where the key is the order ID and the value is a tuple $(\textit{orderType}, \textit{price})$. Additionally, we use another hash table $\textit{t}$ to store the list of order IDs corresponding to each $(\textit{orderType}, \textit{price})$, where the key is a tuple $(\textit{orderType}, \textit{price})$ and the value is the list of order IDs. When calling $\texttt{addOrder}$, we add the order information to $\textit{orders}$ and append the order ID to the corresponding list in $\textit{t}$. When calling $\texttt{modifyOrder}$, we first retrieve the order type and old price from $\textit{orders}$, then update the order's price information. Next, we remove the order ID from the corresponding list in $\textit{t}$ and add it to the list corresponding to the new price. When calling $\texttt{cancelOrde...
 * Dry Run: Input: [&quot;OrderManagementSystem&quot;, &quot;addOrder&quot;, &quot;addOrder&quot;, &quot;addOrder&quot;, &quot;getOrdersAtPrice&quot;, &quot;modifyOrder&quot;, &quot;modifyOrder&quot;, &quot;getOrdersAtPrice&quot;, &quot;cancelOrder&quot;, &quot;cancelOrder&quot;, &quot;getOrdersAtPrice&quot;] [[], [1, &quot;buy&quot;, 1], [2, &quot;buy&quot;, 1], [3, &quot;sell&quot;, 2], [&quot;buy&quot;, 1], [1, 3], [2, 1], [&quot;buy&quot;, 1], [3], [2], [&quot;buy&quot;, 1]] => Output: [null, null, null, null, [2, 1], null, null, [2], null, null, []]
 * Time Complexity: O(N)
 * Space Complexity: O(O(m))
 */
var OrderManagementSystem = function () {
  this.orderTypeMap = new Map();
  this.priceMap = new Map();
  this.t = new Map();
};

OrderManagementSystem.prototype.key = function (orderType, price) {
  return `${orderType}#${price}`;
};

OrderManagementSystem.prototype.addOrder = function (
  orderId,
  orderType,
  price
) {
  this.orderTypeMap.set(orderId, orderType);
  this.priceMap.set(orderId, price);

  const k = this.key(orderType, price);
  if (!this.t.has(k)) {
    this.t.set(k, []);
  }
  this.t.get(k).push(orderId);
};

OrderManagementSystem.prototype.modifyOrder = function (orderId, newPrice) {
  const orderType = this.orderTypeMap.get(orderId);
  const oldPrice = this.priceMap.get(orderId);

  this.priceMap.set(orderId, newPrice);

  const oldKey = this.key(orderType, oldPrice);
  const oldList = this.t.get(oldKey);
  const idx = oldList.indexOf(orderId);
  if (idx !== -1) {
    oldList.splice(idx, 1);
  }

  const newKey = this.key(orderType, newPrice);
  if (!this.t.has(newKey)) {
    this.t.set(newKey, []);
  }
  this.t.get(newKey).push(orderId);
};

OrderManagementSystem.prototype.cancelOrder = function (orderId) {
  const orderType = this.orderTypeMap.get(orderId);
  const price = this.priceMap.get(orderId);

  this.orderTypeMap.delete(orderId);
  this.priceMap.delete(orderId);

  const k = this.key(orderType, price);
  const list = this.t.get(k);
  const idx = list.indexOf(orderId);
  if (idx !== -1) {
    list.splice(idx, 1);
  }
};

OrderManagementSystem.prototype.getOrdersAtPrice = function (orderType, price) {
  return this.t.get(this.key(orderType, price)) ?? [];
};

/**
 * Your OrderManagementSystem object will be instantiated and called:
 * var obj = new OrderManagementSystem()
 * obj.addOrder(orderId,orderType,price)
 * obj.modifyOrder(orderId,newPrice)
 * obj.cancelOrder(orderId)
 * var param_4 = obj.getOrdersAtPrice(orderType,price)
 */
