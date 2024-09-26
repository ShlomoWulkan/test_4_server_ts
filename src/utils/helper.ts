import { saveFileData } from "../config/fileDataLayer";
import Beeper from "../models/beeperModel";
import explosion from "./explosion";

const handleStatusInBody =  async (beeper: Beeper, beepers: Beeper[], status: string, latitude?: number, longitude?: number): Promise<boolean> => {
        if (status === 'deployed') {
                beeper.latitude = latitude!;
                beeper.longitude = longitude!;  
                beeper.status = status;
                beeper = await explosion(beeper);
                return await saveFileData('beepers', beepers);              
            }
            beeper.status = status;
            return await saveFileData('beepers', beepers);
    }

const handleStatusNotInBody = async (beeper: Beeper, beepers: Beeper[], latitude?: number, longitude?: number): Promise<Beeper> => {
    switch (beeper.status) {
            case 'manufactured':
                beeper.status = 'assembled';
                break;

            case 'assembled':
                beeper.status = 'shipped';
                break;

            case 'shipped':
                beeper.status = 'deployed';
                beeper.latitude = latitude!;
                beeper.longitude = longitude!;
                break;        
            default:
                break;
        }        
        // const result: boolean = await saveFileData('beepers', beepers);       
        // if (beeper.status === 'deployed') {
        //     beeper = await explosion(beeper);
        //     return await saveFileData('beepers', beepers);
        // }
        return beeper;
}

const handleStatusIsDeployed = async (beeper: Beeper, beepers: Beeper[]): Promise<void> => {
    beeper = await explosion(beeper);
    await saveFileData('beepers', beepers);
}

export {handleStatusInBody, handleStatusNotInBody, handleStatusIsDeployed};