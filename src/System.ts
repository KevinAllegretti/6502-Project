// import statements for hardware
import { Clock } from "./hardware/clock";
import {Cpu} from "./hardware/Cpu";
import {Hardware} from "./hardware/Hardware"
import {Memory} from "./hardware/Memory"
import { MMU } from "./hardware/MMU";
import {interruptController} from "./hardware/interruptController";
import { Keyboard } from "./hardware/Keyboard";


/*
    Constants
 */
// Initialization Parameters for Hardware
// Clock cycle interval
const CLOCK_INTERVAL= 500;               // This is in ms (milliseconds) so 1000 = 1 second, 100 = 1/10 second
                                        // A setting of 100 is equivalent to 10hz, 1 would be 1,000hz or 1khz,
                                        // .001 would be 1,000,000 or 1mhz. Obviously you will want to keep this
                                        // small, I recommend a setting of 100, if you want to slow things down
                                        // make it larger.


export class System extends Hardware{

    private _CPU : Cpu = null;
    private _memory: Memory = null;
    public running: boolean = false;
    private _MMU : MMU = null;
    private _Clock: Clock = null;
    private _interruptController: interruptController = null;
    private _Keyboard: Keyboard = null;
    
    constructor(id: number, name: string) {
        //importing each file
        super(id, name);
        this._Clock = new Clock();
        this._memory = new Memory();
        this._MMU = new MMU(0, 'MMU', this._memory);
        this._interruptController = new interruptController();
        this._CPU = new Cpu(0, 'Cpu', this._MMU, this._interruptController);
        this._Keyboard = new Keyboard(this._interruptController)
        this._interruptController.addObjects(this._Keyboard);
        this._Clock.fillList(this._CPU);

        //Add data to ID/name
        this._CPU.id = 0;
        this._CPU.name = 'CPU'
        //Memory Data
        this._memory.id = 0;
        this._memory.name = "RAM"
        /*
        Start the system (Analogous to pressing the power button and having voltages flow through the components)
        When power is applied to the system clock, it begins sending pulses to all clock observing hardware
        components so they can act on each clock cycle.
         */

        this.startSystem();
    }

    public startSystem(): boolean {
        //pass message
        this.log("Created")
        this._CPU.log("Created")
        this._memory.log("Created")  
        this._Clock.run(CLOCK_INTERVAL);
        this._Keyboard.monitorKeys();
        return true;
    }

    public stopSystem(): boolean {
        return false;
    }
    
}

let system: System = new System(0, "System");
