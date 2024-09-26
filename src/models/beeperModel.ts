class Beeper {
    public id: number;
    public status: string;
    public created_at: Date;
    public detonated_at: Date;
    public latitude: number;
    public longitude: number;

    constructor(
        public name: string,
    ) {
        this.id = parseInt(Math.random().toString().split(".")[1]);
        this.status = 'manufactured';
        this.created_at = new Date();
        this.detonated_at = new Date('0000-00-00T00:00:00');
        this.latitude = 0;
        this.longitude = 0;
    }
}

export default Beeper;
