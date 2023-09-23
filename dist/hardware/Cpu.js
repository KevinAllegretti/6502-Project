"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cpu = void 0;
const hardware_1 = require("./hardware");
const Ascii_1 = require("../Ascii");
class Cpu extends hardware_1.Hardware {
    constructor(id, name, mmu, interruptController) {
        super(0, 'CPU');
        //Program counter, IR, AC, Xreg, Yreg, Zflag
        this.programCounter = 0;
        this.instructionRegister = 0;
        this.Accumulator = 0;
        this.Xregister = 0;
        this.Yregister = 0;
        this.Zflag = false;
        this.carryFlag = 0;
        this.Cycle = 1;
        this.mmu = null;
        this.decodeStep = 1;
        this.executeStep = 1;
        this.ascii = null;
        this.interruptController = null;
        //initialize cpuClockCount to zero
        this.cpuClockCount = 0;
        //Need to use MMU for different 
        this.mmu = mmu;
        this.ascii = new Ascii_1.Ascii();
        this.interruptController = interruptController;
    }
    //create a function or in constructor
    pulse() {
        this.cpuClockCount += 1;
        //while the system is on, the clock count is incrimented.
        console.log('received clock pulse - CPU Clock Count:' + this.cpuClockCount);
        //Output all the components
        console.log(' Cycle: ' + this.Cycle + ' Program Counter: ' + this.programCounter +
            ' Instruction Register: ' + this.hexlog(this.instructionRegister) + ' Accumulator: ' + this.Accumulator
            + ' X Register: ' + this.Xregister + ' Y register: ' + this.Yregister + ' Z Flag: ' + this.Zflag
            + ' Carry Flag: ' + this.carryFlag);
        switch (this.Cycle) {
            case (1):
                this.fetch();
                break;
            case (2):
                this.decode();
                break;
            case (3):
                this.execute();
                break;
            case (4):
                this.writeBack();
                break;
            case (5):
                this.interruptCheck();
                break;
        }
    }
    fetch() {
        var temp = this.mmu.readImmediate(this.programCounter);
        this.instructionRegister = temp;
        this.Cycle = 2;
        this.programCounter += 1;
    }
    decode() {
        this.Cycle = 3; //third cycle 
        switch (this.instructionRegister) {
            //1 bit decode
            case (0xA2): //load X register with constant
            case (0xA9): //Load accumulator with a constant 
            case (0xA0): //Load the Y register with a constant
            case (0xD0): //Branch on not equals
                var temp = this.mmu.readImmediate(this.programCounter);
                this.mmu.setMdr(temp);
                this.programCounter += 1;
                break;
            //2 bits
            case (0xAD): //Load accumulator with memory
            case (0x8D): //Store the accumulator with memory
            case (0x6D): //add with carry
            case (0xAE): //load x register from memory
            case (0xAC): //load y register from memory
            case (0xEC): //compare byte in memory to x register
            case (0xEE): //Incriments byte in memory
                var temp = this.mmu.readImmediate(this.programCounter);
                if (this.decodeStep == 1) {
                    this.mmu.setLowOrderByte(temp);
                    this.decodeStep += 1;
                    this.Cycle = 2;
                }
                //second decode step
                else {
                    this.mmu.setHighOrderByte(temp);
                    this.decodeStep = 1;
                    this.mmu.combine();
                }
                this.programCounter += 1;
                break;
            //NO bit decode
            case (0x00): //break
            case (0x8A): //Load accumulator from x register
            case (0x98): //Load accumulator from y register
            case (0xAA): //Load x register from accumulator
            case (0xA8): //Load y register from accumulator
            case (0xEA): //No operation
            case (0xFF): //System Call
                break;
        }
    }
    execute() {
        this.Cycle = 5;
        switch (this.instructionRegister) {
            case (0xA9): //Load accumulator with a constant 
                this.Accumulator = this.mmu.getMdr();
                break;
            case (0xA2): //load X register with constant
                this.Xregister = this.mmu.getMdr();
                break;
            case (0xA0): //Load the Y register with a constant
                this.Yregister = this.mmu.getMdr();
                break;
            case (0xD0): //Branch on not equals
                if (this.Zflag == false) {
                    //variable for how far it will jump
                    var distance = this.mmu.getMdr();
                    //fowards or backwards
                    if (distance < 0x80) {
                        this.programCounter += distance;
                    }
                    else {
                        //represent as a negative number
                        distance = 0x100 - distance;
                        this.programCounter -= distance;
                    }
                }
                break;
            //2 bits
            case (0xAD): //Load accumulator with memory
                this.Accumulator = this.mmu.read();
                break;
            case (0x8D): //Store the accumulator with memory
                this.mmu.write(this.Accumulator);
                break;
            case (0x6D): //add with carry
                var tempRead = this.mmu.read();
                //0x80 = 128
                if (tempRead < 0x80 && this.Accumulator < 0x80) {
                    this.Accumulator += tempRead + this.carryFlag;
                    //Overflow
                    if (this.Accumulator >= 0x80) {
                        this.Accumulator = this.Accumulator - 0x80;
                        this.carryFlag = 1;
                    }
                    else //if the operation doesn't overflow
                     {
                        this.carryFlag = 0;
                    }
                }
                else if (tempRead >= 0x80 && this.Accumulator >= 0x80) //If both numbers are negative
                 {
                    this.Accumulator += tempRead + this.carryFlag;
                    if (this.Accumulator >= 0x100) {
                        this.Accumulator = this.Accumulator - 0x100;
                        this.carryFlag = 1;
                    }
                    else {
                        this.carryFlag = 0;
                    }
                }
                else //if its a negative and a positve 
                 {
                    this.Accumulator += tempRead + this.carryFlag;
                    if (this.Accumulator >= 0x100) {
                        this.Accumulator -= 0x100;
                    }
                }
                break;
            case (0xAE): //load x register from memory
                this.Xregister = this.mmu.read();
                break;
            case (0xAC): //load y register from memory
                this.Yregister = this.mmu.read();
                break;
            case (0xEC): //compare byte in memory to x register
                var tempMem = this.mmu.read();
                if (tempMem == this.Xregister) {
                    this.Zflag = true;
                }
                else {
                    this.Zflag = false;
                }
                break;
            case (0xEE): //Incriments byte in memory 
                //will need multiple execute step numbers
                if (this.executeStep == 1) {
                    //Set the accumulator to the memory
                    this.Accumulator = this.mmu.read();
                    //incriment execute step and repeat the cycle
                    this.executeStep = 2;
                    this.Cycle = 3;
                }
                else {
                    this.Accumulator += 1;
                    if (this.Accumulator > 0xFF) {
                        this.Accumulator = 0;
                    }
                    this.Cycle = 4;
                    this.executeStep = 1;
                }
                break;
            //NO bit decode
            //Add break statement to all cases
            case (0x00): //break Need to tell cpu to run the stop function.
            case (0x8A): //Load accumulator from x register
                this.Accumulator = this.Xregister;
                break;
            case (0x98): //Load accumulator from y register
                this.Accumulator = this.Yregister;
                break;
            case (0xAA): //Load x register from accumulator
                this.Xregister = this.Accumulator;
                break;
            case (0xA8): //Load y register from accumulator
                this.Yregister = this.Accumulator;
                break;
            case (0xEA): //No operation
                break;
            case (0xFF): //System Call
                //If the x register is 1, output the y register
                if (this.Xregister == 1) {
                    this.hexlog(this.Yregister);
                }
                else if (this.Xregister == 2) {
                    var CurrYreg = this.Yregister;
                    //read current y register if not 0, then print out with ascii conversion. If it is 0 then stop.
                    while (this.mmu.readImmediate(CurrYreg) != 0) {
                        this.log(this.ascii.toAscii(this.mmu.readImmediate(CurrYreg)));
                        CurrYreg += 1;
                    }
                }
                else if (this.Xregister == 3) {
                    //Draw out memory location..
                    //hexlog to concatenate
                    var LOB = this.hexlog(this.mmu.readImmediate(this.programCounter));
                    this.programCounter += 1;
                    //hob always after lob
                    var HOB = this.hexlog(this.mmu.readImmediate(this.programCounter));
                    //incriment program couunter
                    this.programCounter += 1;
                    //combine HOB and LOB with parseInt
                    var combineBytes = this.hexlog(HOB) + '' + this.hexlog(LOB);
                    var combineTwo = parseInt(combineBytes);
                    //Print out the HOB and LOB with ascii conversion while the location is not 0
                    while (this.mmu.readImmediate(combineTwo) != 0) {
                        this.log(this.ascii.toAscii(this.mmu.readImmediate(combineTwo)));
                        combineTwo += 1;
                    }
                }
                break;
        }
    }
    //Writeback function writes what is in the accumulator
    writeBack() {
        this.mmu.write(this.Accumulator);
        //change cycle to 5
        this.Cycle = 5;
    }
    interruptCheck() {
        //return cycle back to 1
        this.Cycle = 1;
        //if interrupt list has objects inside, call the start interrupt function
        if (this.interruptController.interrupts.length > 0) {
            this.interruptController.startInterrupt();
        }
    }
}
exports.Cpu = Cpu;
//# sourceMappingURL=Cpu.js.map