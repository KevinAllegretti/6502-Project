import { NumberLiteralType } from "typescript";

export interface Interrupt {
    //Interrupts need the IRQ, Priority status, names for device, and an input output buffer.
    IRQ: number;
    Priority: number;
    deviceName: String;
    inputBuffer: String[];
    outputBuffer: String[];

}