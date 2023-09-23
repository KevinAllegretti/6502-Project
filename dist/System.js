"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
// import statements for hardware
const clock_1 = require("./hardware/clock");
const Cpu_1 = require("./hardware/Cpu");
const Hardware_1 = require("./hardware/Hardware");
const Memory_1 = require("./hardware/Memory");
const MMU_1 = require("./hardware/MMU");
const interruptController_1 = require("./hardware/interruptController");
const Keyboard_1 = require("./hardware/Keyboard");
/*
    Constants
 */
// Initialization Parameters for Hardware
// Clock cycle interval
const CLOCK_INTERVAL = 500; // This is in ms (milliseconds) so 1000 = 1 second, 100 = 1/10 second
// A setting of 100 is equivalent to 10hz, 1 would be 1,000hz or 1khz,
// .001 would be 1,000,000 or 1mhz. Obviously you will want to keep this
// small, I recommend a setting of 100, if you want to slow things down
// make it larger.
class System extends Hardware_1.Hardware {
    constructor(id, name) {
        //importing each file
        super(id, name);
        this._CPU = null;
        this._memory = null;
        this.running = false;
        this._MMU = null;
        this._Clock = null;
        this._interruptController = null;
        this._Keyboard = null;
        this._Clock = new clock_1.Clock();
        this._memory = new Memory_1.Memory();
        this._MMU = new MMU_1.MMU(0, 'MMU', this._memory);
        this._interruptController = new interruptController_1.interruptController();
        this._CPU = new Cpu_1.Cpu(0, 'Cpu', this._MMU, this._interruptController);
        this._Keyboard = new Keyboard_1.Keyboard(this._interruptController);
        this._interruptController.addObjects(this._Keyboard);
        this._Clock.fillList(this._CPU);
        //Add data to ID/name
        this._CPU.id = 0;
        this._CPU.name = 'CPU';
        //Memory Data
        this._memory.id = 0;
        this._memory.name = "RAM";
        /*
        Start the system (Analogous to pressing the power button and having voltages flow through the components)
        When power is applied to the system clock, it begins sending pulses to all clock observing hardware
        components so they can act on each clock cycle.
         */
        this.startSystem();
    }
    startSystem() {
        //pass message
        this.log("Created");
        this._CPU.log("Created");
        this._memory.log("Created");
        this._Clock.run(CLOCK_INTERVAL);
        this._Keyboard.monitorKeys();
        return true;
    }
    stopSystem() {
        return false;
    }
}
exports.System = System;
let system = new System(0, "System");
//# sourceMappingURL=System.js.map