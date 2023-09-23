import {System} from "../System";
export class Clock{    

    private objectList = [];
    private isRunning: boolean = true;
    
    //Function to push objects into list
    fillList(object){
        this.objectList.push(object);
    }

    //Stop function
    stop(){
        this.isRunning = false;
    }

    //Run Function
    run(interval: number){
        //nested function to start the pulse for each object in the list with an interval
        setInterval(()=>{
            if (this.isRunning == true){

                for (var i = 0; i < this.objectList.length; i++){
                    this.objectList[i].pulse();
                }
            }

        }  
        , interval)
    }

    //setter for clock listeners.
    public set clocklistenerCPU(Cpu: String){
        this.clocklistenerCPU = Cpu;
    }
    
    public set clocklistenerMEMORY(Memory: String){
        this.clocklistenerMEMORY = Memory;
    }

    //Clock method for the interval of time.

    //list of objects to be called

    


}