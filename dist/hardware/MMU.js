"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MMU = void 0;
const hardware_1 = require("./hardware");
class MMU extends hardware_1.Hardware {
    constructor(id, name, Memory) {
        super(id, name);
        this.mem = null;
        this.lowOrderByte = null;
        this.highOrderByte = null;
        this.mem = Memory;
        //Populate the array
        this.mem.initializeArray();
        //Write out all of the instructions passed into write immediate to load into memory
        /*this.writeImmediate(0x0000, 0xA9);
        this.writeImmediate(0x0001, 0x0D);
        this.writeImmediate(0x0002, 0xA9);
        this.writeImmediate(0x0003, 0x1D);
        this.writeImmediate(0x0004, 0xA9);
        this.writeImmediate(0x0005, 0x2D);
        this.writeImmediate(0x0006, 0xA9);
        this.writeImmediate(0x0007, 0x3F);
        this.writeImmediate(0x0008, 0xA9);
        this.writeImmediate(0x0009, 0xFF);
        this.writeImmediate(0x000A, 0x00);
        this.writeImmediate(0x000B, 0x00);
        this.writeImmediate(0x000C, 0x00);
        this.writeImmediate(0x000D, 0x00);
        this.writeImmediate(0x000E, 0x00);
        this.writeImmediate(0x000F, 0x00);
        */
        this.writeImmediate(0x0000, 0xAD);
        this.writeImmediate(0x0001, 0x04);
        this.writeImmediate(0x0002, 0x00);
        this.writeImmediate(0x0003, 0x00);
        this.writeImmediate(0x0004, 0x07);
        //call the memory dump with the first address and last address
        this.memoryDump(0x0000, 0x000F);
    }
    //Need to differentiate the low order byte and high order byte to complete little endian
    //Create low order byte set function 
    setLowOrderByte(lowNum) {
        this.lowOrderByte = lowNum;
    }
    //Create high order byte set function
    setHighOrderByte(highNum) {
        this.highOrderByte = highNum;
    }
    //Create a funciton to combine the two order bytes
    combine() {
        //Display the bytes and store in a variable so it can be passed to memory.
        var Result = this.hexlog(this.highOrderByte) + '' + this.hexlog(this.lowOrderByte);
        //Convert Result to a number from string, pass through to memory.
        this.mem.setMar(parseInt(Result, 16));
    }
    //read function to return the mdr
    read() {
        this.mem.read();
        return this.mem.getMdr();
    }
    write(newData) {
        //Set mdr to the new data
        this.mem.setMdr(newData);
        //implementing new data into memory
        this.mem.write();
    }
    setMdr(Data) {
        this.mem.setMdr(Data);
    }
    getMdr() {
        return this.mem.getMdr();
    }
    //Create write immediate funciton to in order to load instruciton sets or "static" programs
    writeImmediate(Address, Data) {
        //Pass the address to Mar
        this.mem.setMar(Address);
        //Pass the data to Mdr
        this.mem.setMdr(Data);
        //Write the instruciton into memory.
        this.mem.write();
    }
    readImmediate(Address) {
        this.mem.setMar(Address);
        this.mem.read();
        //return the data found at address
        return this.mem.getMdr();
    }
    //Create a memory dump function to display the contents of memory
    memoryDump(fromAddress, toAddress) {
        //Let the user know what is happening 
        this.log('Dumping Memory:');
        //Create a for loop with the starting point as the first address and the ending point as the last address 
        for (var i = fromAddress; i <= toAddress; i++) {
            //Create a string that will be displayed representing the address and the data of the memory.
            var printString = 'Addr ' + this.hexlog(i, 4) + ': | ' + this.hexlog(this.readImmediate(i), 2);
            this.log(printString);
        }
    }
}
exports.MMU = MMU;
//# sourceMappingURL=MMU.js.map