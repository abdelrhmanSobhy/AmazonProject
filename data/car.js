class Car {
  #brand;
  #model;
  speed = 0;
  isTrunckOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  go() {
    if (!this.isTrunckOpen) {
      this.speed += 5;
    }
    if (this.speed > 100) {
      this.speed = 0; // Max speed limit
    }
  }

  brake() {
    this.speed -= 5;
    if (this.speed < 0) {
      this.speed = 0; // Min speed limit
    }
  }

  openTrunck() {
    // if the car moving don't open the trunk
    if (!this.speed > 0) {
      this.isTrunckOpen = true;
    }
  }
  closeTrunck() {
    this.isTrunckOpen = false;
  }

  displayInfo() {
    return `Car Brand: ${this.#brand}, Model: ${this.#model} - Speed: ${
      this.speed
    } km/h - Trunk info: ${this.isTrunckOpen ? "Open" : "Closed"}`;
  }
}

const car1 = new Car("Toyota", "Corolla");
const car2 = new Car("Tesla", "Model 3");

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;
    if (this.speed > 300) {
      this.speed = 300; // Max speed limit
    }
  }

  openTrunk() {
    console.log("Race cars do not have a trunk.");
  }

  closeTrunk() {
    console.log("Race cars do not have a trunk.");
  }
}

const race = new RaceCar({
  brand: "Ferrari",
  model: "F8",
  acceleration: 20,
});

race.go();
race.go();
race.go();

console.log(race.displayInfo());
