class TrafficLight:
    def __init__(self):
        self.current_road = 1  # road with green light

    def carArrived(self, carId, roadId, direction, turnGreen, crossCar):
        if self.current_road != roadId:
            turnGreen()
            self.current_road = roadId
        crossCar()