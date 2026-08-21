/**
 * Event Emitter
 * Intuition: The core idea is to maintain a mapping from event names to collections of functions. When an event is emitted, all functions associated with that event are executed in their subscription order. Unsubscribing requires identifying and removing a specific function from its respective collection.
 * Approach: 1. Initialize a `Map` in the constructor to store event names (strings) as keys and arrays of callback functions as values. 2. In `subscribe`, first retrieve the array of handlers for the given event name. If no such array exists, create a new empty array and store it in the map. Then, add the provided `subscriptionHandler` to this array. Return an object containing an `unsubscribe` method which, when invoked, finds and removes the specific `subscriptionHandler` from the event's array of handlers. 3. In `emit`, retrieve the array of registered handlers for the `triggerName`. If no handlers are found (or the event name doesn't exist), return an empty array. Otherwise, iterate through the handlers, executing each one with the provided `invocationArguments` and collecting their return values into a new array, which is then returned.
 * Dry Run:
 *  Assume: f1=(a,b)=>a+b, f2=(a,b)=>a*b
 *   ee = new EventEmitter()ee.eventListenersRegistry = Map {}
 *
 *  1. sub1 = ee.subscribe('message', f1)
 *  channelName = 'message', subscriptionHandler = f1
 *  activeListenersList = undefined; activeListenersList becomes []; ee.eventListenersRegistry.set('message', [])
 *  activeListenersList.push(f1) => activeListenersList = [f1]
 *  ee.eventListenersRegistry = Map { 'message' => [f1] }
 *  Returns { unsubscribe: func_unsub1 }
 *
 *  2. sub2 = ee.subscribe('message', f2)
 *  channelName = 'message', subscriptionHandler = f2
 *  activeListenersList = [f1]
 *  activeListenersList.push(f2) => activeListenersList = [f1, f2]
 *  ee.eventListenersRegistry = Map { 'message' => [f1, f2] }
 *  Returns { unsubscribe: func_unsub2 }
 *
 *  3. ee.emit('message', [1, 2])
 *  triggerName = 'message', invocationArguments = [1, 2]
 *  !ee.eventListenersRegistry.has('message') is false
 *  registeredHandlers = [f1, f2]
 *  registeredHandlers.map:
 *    f1(1, 2) => 3
 *    f2(1, 2) => 2
 *  Returns [3, 2]
 *
 *  4. sub1.unsubscribe() (calls func_unsub1)
 *  Inside func_unsub1: activeListenersList (from closure) is [f1, f2]
 *  handlerPosition = activeListenersList.indexOf(f1) => 0
 *  activeListenersList.splice(0, 1) => activeListenersList becomes [f2]
 *  ee.eventListenersRegistry = Map { 'message' => [f2] }
 *
 *  5. ee.emit('message', [3, 4])
 *  triggerName = 'message', invocationArguments = [3, 4]
 *  !ee.eventListenersRegistry.has('message') is false
 *  registeredHandlers = [f2]
 *  registeredHandlers.map:
 *    f2(3, 4) => 12
 *  Returns [12]
 * Time Complexity: O(1)
 * Space Complexity: O(T)
 */
class EventEmitter {
  constructor() {
    this.eventListenersRegistry = new Map();
  }

  subscribe(channelName, subscriptionHandler) {
    let activeListenersList = this.eventListenersRegistry.get(channelName);

    if (activeListenersList === undefined) {
      activeListenersList = [];
      this.eventListenersRegistry.set(channelName, activeListenersList);
    }

    activeListenersList.push(subscriptionHandler);

    return {
      unsubscribe: () => {
        const handlerPosition =
          activeListenersList.indexOf(subscriptionHandler);
        if (handlerPosition !== -1) {
          activeListenersList.splice(handlerPosition, 1);
        }
      },
    };
  }

  emit(triggerName, invocationArguments = []) {
    if (!this.eventListenersRegistry.has(triggerName)) {
      return [];
    }

    const registeredHandlers = this.eventListenersRegistry.get(triggerName);
    return registeredHandlers.map((handlerFunc) =>
      handlerFunc(...invocationArguments)
    );
  }
}
