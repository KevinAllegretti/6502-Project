"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keyboard = void 0;
const hardware_1 = require("./hardware");
class Keyboard extends hardware_1.Hardware {
    constructor(interruptController) {
        //Declare all variables
        super(0, 'Keyboard');
        //Import interrupt controller
        this.interruptController = null;
        this.IRQ = 0;
        this.Priority = 0;
        this.deviceName = '';
        this.inputBuffer = [];
        this.outputBuffer = [];
        this.interruptController = interruptController;
    }
    //Import monitor keys from resources
    monitorKeys() {
        /*
        character stream from stdin code (most of the contents of this function) taken from here
        https://stackoverflow.com/questions/5006821/nodejs-how-to-read-keystrokes-from-stdin

        This takes care of the simulation we need to do to capture stdin from the console and retrieve the character.
        Then we can put it in the buffer and trigger the interrupt.
         */
        var stdin = process.stdin;
        // without this, we would only get streams once enter is pressed
        stdin.setRawMode(true);
        // resume stdin in the parent process (node app won't quit all by itself
        // unless an error or process.exit() happens)
        stdin.resume();
        // i don't want binary, do you?
        //stdin.setEncoding( 'utf8' );
        stdin.setEncoding(null);
        stdin.on('data', function (key) {
            //let keyPressed : String = key.charCodeAt(0).toString(2);
            //while(keyPressed.length < 8) keyPressed = "0" + keyPressed;
            let keyPressed = key.toString();
            this.log("Key pressed - " + keyPressed);
            // ctrl-c ( end of text )
            // this let's us break out with ctrl-c
            if (key.toString() === '\u0003') {
                process.exit();
            }
            // write the key to stdout all normal like
            //process.stdout.write( key);
            // put the key value in the buffer
            this.outputBuffer.push(keyPressed);
            // set the interrupt!
            this.interruptController.addInterrupt(this);
            // .bind(this) is required when running an asynchronous process in node that wishes to reference an
            // instance of an object.
        }.bind(this));
    }
    //Function to start for any device
    start() {
        console.log(this.outputBuffer);
        this.outputBuffer = [];
    }
}
exports.Keyboard = Keyboard;
//# sourceMappingURL=Keyboard.js.map