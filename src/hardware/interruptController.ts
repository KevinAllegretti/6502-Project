import { Hardware } from "./hardware";

export class interruptController extends Hardware{
    
    //List for interrupt objects and input/output objects
    inputOutputObjects = [];
    interrupts = [];


    constructor(){
        super(0, 'interruptController');

    }

    //Function to push objects to the input output list
    addObjects(tempObject){
        this.inputOutputObjects.push(tempObject);
    }

    //Funciton to push objects to the interrupt list
    addInterrupt(tempObject){
        this.interrupts.push(tempObject);
    }

    //Function to start the interrupts
    startInterrupt(){
        this.interrupts[0].start()
        this.interrupts.shift();
    }


}