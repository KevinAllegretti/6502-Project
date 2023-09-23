"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interruptController = void 0;
const hardware_1 = require("./hardware");
class interruptController extends hardware_1.Hardware {
    constructor() {
        super(0, 'interruptController');
        //List for interrupt objects and input/output objects
        this.inputOutputObjects = [];
        this.interrupts = [];
    }
    //Function to push objects to the input output list
    addObjects(tempObject) {
        this.inputOutputObjects.push(tempObject);
    }
    //Funciton to push objects to the interrupt list
    addInterrupt(tempObject) {
        this.interrupts.push(tempObject);
    }
    //Function to start the interrupts
    startInterrupt() {
        this.interrupts[0].start();
        this.interrupts.shift();
    }
}
exports.interruptController = interruptController;
//# sourceMappingURL=interruptController.js.map