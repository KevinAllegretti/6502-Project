"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memory = void 0;
const hardware_1 = require("./hardware");
class Memory extends hardware_1.Hardware {
    constructor() {
        super(0, 'Memory');
        this.mar = 0x0000;
        this.mdr = 0x00;
        //keep variables up top
        //Declare array
        this.memoryArray = new Array(0xFFFF + 1);
    }
    //initialize array 
    initializeArray() {
        //for loop push hex into
        for (let i = 0x0000; i < 0xFFFF; i++) {
            this.memoryArray[i] = 0x00;
        }
    }
    displayMemory() {
        //iterate through memory array.
        for (let i = 0x00; i < 0x14; i++) {
            //incriment values
            //call log and hexlog
            console.log(this.log("") + "Address" + this.hexlog(i, 4) + "Contains" + this.hexlog(this.memoryArray[i], 2));
            this.memoryArray[i] + 1;
        }
    }
    //part d, another edit to this, augment it so it can be any area of memory to display
    //pulse function
    pusle() {
        console.log("Received clock pulse");
    }
    reset() {
        for (let i = 0x0000; i < 0xFFFF; i++) {
            this.memoryArray[i] = 0x0;
        }
    }
    //setting the memory address register to a 16 bit address
    //Address = 0x0000;
    setMar(mar) {
        this.mar = mar;
    }
    //funciton that returns the memory address register
    getMar() {
        return this.mar;
    }
    //setting the memory data register to a 8 bit data instruction
    //Data = 0x00;
    setMdr(mdr) {
        this.mdr = mdr;
    }
    //function that returns the memory data register
    getMdr() {
        return this.mdr;
    }
    //read memory location in the MAR and update the MDR
    read() {
        this.mdr = this.memoryArray[this.mar];
    }
    //write the contents of the MDR to memory at the location indiciated by the MAR
    write() {
        this.memoryArray[this.mar] = this.mdr;
    }
}
exports.Memory = Memory;
//# sourceMappingURL=Memory.js.map