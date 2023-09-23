"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clock = void 0;
class Clock {
    constructor() {
        this.objectList = [];
        this.isRunning = true;
        //Clock method for the interval of time.
        //list of objects to be called
    }
    //Function to push objects into list
    fillList(object) {
        this.objectList.push(object);
    }
    //Stop function
    stop() {
        this.isRunning = false;
    }
    //Run Function
    run(interval) {
        //nested function to start the pulse for each object in the list with an interval
        setInterval(() => {
            if (this.isRunning == true) {
                for (var i = 0; i < this.objectList.length; i++) {
                    this.objectList[i].pulse();
                }
            }
        }, interval);
    }
    //setter for clock listeners.
    set clocklistenerCPU(Cpu) {
        this.clocklistenerCPU = Cpu;
    }
    set clocklistenerMEMORY(Memory) {
        this.clocklistenerMEMORY = Memory;
    }
}
exports.Clock = Clock;
//# sourceMappingURL=clock.js.map