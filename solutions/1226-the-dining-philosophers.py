from threading import Lock

class DiningPhilosophers:
    def __init__(self):
        self.locks = [Lock() for _ in range(5)]

    def wantsToEat(self,
                   philosopher: int,
                   pickLeftFork: 'Callable[[], None]',
                   pickRightFork: 'Callable[[], None]',
                   eat: 'Callable[[], None]',
                   putLeftFork: 'Callable[[], None]',
                   putRightFork: 'Callable[[], None]') -> None:
        
        left_fork_idx = philosopher
        right_fork_idx = (philosopher + 1) % 5
        
        first_lock_idx = min(left_fork_idx, right_fork_idx)
        second_lock_idx = max(left_fork_idx, right_fork_idx)
        
        with self.locks[first_lock_idx]:
            with self.locks[second_lock_idx]:
                pickLeftFork()
                pickRightFork()
                
                eat()
                
                putLeftFork()
                putRightFork()