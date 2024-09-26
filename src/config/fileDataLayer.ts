import fs from 'fs';

export const getFileData = async <T> (resource: string): Promise<T[] | void> => {
    try {
        const strData: string = await fs.promises.readFile(`${__dirname}/../../../data/${ resource}.json`, 'utf-8');
        const parsedData: T[] = JSON.parse(strData);
        return parsedData
    } catch (error) {
        console.log(error);        
    }
}
  
export const saveFileData = async <T> (resource: string, data: T[]) => {
    try {
        const stringData: string = JSON.stringify(data);
        await fs.promises.writeFile(`${__dirname}/../../../data/${ resource}.json`, stringData);
        return true
    } catch (error) {
        return false
    }
}
