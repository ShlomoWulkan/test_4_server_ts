import NewBeeperDto from '../DTO/newBeeperDto';
import Beeper from '../models/beeperModel';
import { getFileData, saveFileData } from '../config/fileDataLayer';
import explosion from '../utils/explosion';
import {handleStatusInBody, handleStatusIsDeployed, handleStatusNotInBody } from '../utils/helper';

class BeeperService {

    public static async getAllBeepers(): Promise<Beeper[] | undefined> {
        const beepers: Beeper[] = await getFileData<Beeper>('beepers') as Beeper[];
        if (!beepers)  return undefined;
        return beepers;
    }

    public static async getOneBeeper(id: number): Promise<Beeper | undefined> {
        const beepers: Beeper[] = await getFileData<Beeper>('beepers') as Beeper[];
        if (!beepers)  return undefined;
        return beepers.find(beeper => beeper.id === id);
    }

    public static async createNewBeeper(newBeeper: NewBeeperDto): Promise<boolean> {
        const { name } = newBeeper;
        const beeper: Beeper = new Beeper(
            name
        );
        let beepers: Beeper[] = await getFileData<Beeper>('beepers') as Beeper[];
        if (!beepers)  beepers = [];
        beepers.push(beeper);
        return await saveFileData('beepers', beepers);
    }

    public static async deleteBeeper(id: number): Promise<boolean> {
        let beepers: Beeper[] = await getFileData<Beeper>('beepers') as Beeper[];
        if (!beepers)  return false;
        const beeper = beepers.find(beeper => beeper.id === id);
        if (!beeper)  return false;
        beepers = beepers.filter(beeper => beeper.id !== id);
        return await saveFileData('beepers', beepers);
    }

    public static async updateBeeperStatus(id: number, status?: string, latitude?: number, longitude?: number): Promise<boolean> {
        const beepers: Beeper[] = await getFileData<Beeper>('beepers') as Beeper[];
        if (!beepers)  return false;
        let beeper = beepers.find(beeper => beeper.id === id);
        if (!beeper)  return false;
        if (status)  {
        await handleStatusInBody(beeper, beepers, status, latitude, longitude);
        } else {     
        await handleStatusNotInBody(beeper, beepers, latitude, longitude);       
        await saveFileData('beepers', beepers); 
        }      
        if (beeper.status || status === 'deployed') {
            await handleStatusIsDeployed(beeper, beepers);
        }        
        return await saveFileData('beepers', beepers); 
       
    }

    public static async getBeepersByStatus(status: string): Promise<Beeper[] | undefined> {
        const beepers: Beeper[] = await getFileData<Beeper>('beepers') as Beeper[];
        if (!beepers)  return undefined;
        return beepers.filter(beeper => beeper.status === status);
    }    
}
   

export default BeeperService;
