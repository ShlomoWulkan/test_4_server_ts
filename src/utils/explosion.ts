import Beeper from "../models/beeperModel";

const explosion = (beeper: Beeper): Promise<Beeper> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            beeper.status = 'detonated';
            beeper.detonated_at = new Date();
            resolve(beeper);
        }, 10000);
    });
}

export default explosion;
