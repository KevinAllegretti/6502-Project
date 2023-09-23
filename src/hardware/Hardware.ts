//import {System} from "./hardware/Cpu";
export class Hardware{

	public id: number;
	public name: string;
	public debug: boolean;

	constructor(newId: number, newName: string){
		this.debug = true;
		this.id = newId;
		this.name =  newName;

	}

	//log funciton
	public log(message: string){
		
		if (this.debug == true){
			console.log("[HW - " + this.name + " id: " + this.id + "]: " + message)
		}		
	}

	//create hexlog function
	arrayValue: number;
	numLength: number;
	public hexlog(arrayValue, numLength = 2){
			var hexNum : String = arrayValue.toString(16).toUpperCase();

			while(numLength > hexNum.length){
				hexNum = '0' + hexNum;
			}
			return hexNum;
			//console.log(arrayValue.toString(16).substring(0));
		}		


}
