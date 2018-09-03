export default class Timer {

    static getNow ():number {
        return Date.now();
    } 

    protected _isRunning:boolean = false;
    public get isRunning () { return this._isRunning; }
    
    protected _elapsedTime:number;
    public get elapsedTime () { return this._elapsedTime; }

    protected _deltaTime:number;
    public get deltaTime () { return this._deltaTime; }

    protected lastDateInMS:number;

    constructor () {
        this.reset();
    }

    public update ():void {
        let lCurrent:number = Timer.getNow();
        this._deltaTime = this._isRunning ? lCurrent - this.lastDateInMS : 0;
        this.lastDateInMS = lCurrent;
        this._elapsedTime += this.deltaTime;
    }

    public resume ():void {
        this.lastDateInMS = Timer.getNow();
        this._isRunning = true;
    }

    public pause ():void {
        this._isRunning = false;
    }

    public reset () {
        this._elapsedTime = 0;
        this._deltaTime = 0;
    }

}