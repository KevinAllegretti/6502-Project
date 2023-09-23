"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hardware = void 0;
//import {System} from "./hardware/Cpu";
class Hardware {
    constructor(newId, newName) {
        this.debug = true;
        this.id = newId;
        this.name = newName;
    }
    //log funciton
    log(message) {
        if (this.debug == true) {
            console.log("[HW - " + this.name + " id: " + this.id + "]: " + message);
        }
    }
    hexlog(arrayValue, numLength = 2) {
        var hexNum = arrayValue.toString(16).toUpperCase();
        while (numLength > hexNum.length) {
            hexNum = '0' + hexNum;
        }
        return hexNum;
        //console.log(arrayValue.toString(16).substring(0));
    }
}
exports.Hardware = Hardware;
//# sourceMappingURL=hardware.js.map