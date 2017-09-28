export class Track {

    public trackId: number;
    public name: string;
    public description = '';
    public type: string;
    public appreciation: number;
    public timePlayed: number;
    public trackIntersections: { x: number, y: number } [] = [];
    public puddles: { distance: number, offset: number }[] = [];
    public potholes: { distance: number, offset: number } [] = [];
    public boosters: { distance: number, offset: number } [] = [];

    constructor(id: number, name: string, description: string, type: string, appreciation: number, timePlayed: 0) {
        this.trackId = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.appreciation = appreciation;
        this.timePlayed = timePlayed;
    }

    public addIntersections([distance, offset]) {
        this.trackIntersections.push({ 'x': distance, 'y': offset });
    }

    public addPuddles([distance, offset]) {
        this.puddles.push({ 'distance': distance, 'offset': offset });
    }

    public addPotholes([distance, offset]) {
        this.potholes.push({ 'distance': distance, 'offset': offset });
    }

    public addBoosters([distance, offset]) {
        this.boosters.push({ 'distance': distance, 'offset': offset });
    }
}
