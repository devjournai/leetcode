from threading import Semaphore, Barrier

class H2O:
    def __init__(self):
        self.h_sem = Semaphore(2)
        self.o_sem = Semaphore(1)
        self.barrier = Barrier(3)

    def hydrogen(self, releaseHydrogen: 'Callable[[], None]') -> None:
        self.h_sem.acquire()
        releaseHydrogen()
        self.barrier.wait()
        self.h_sem.release()

    def oxygen(self, releaseOxygen: 'Callable[[], None]') -> None:
        self.o_sem.acquire()
        releaseOxygen()
        self.barrier.wait()
        self.o_sem.release()