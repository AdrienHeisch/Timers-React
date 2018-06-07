export default class Timer {

    static getNow () {
        return Date.now();
    }

    constructor() {
        this.isRunning = false;

        this.reset();
        this.resume();
    }

    update() {
        this.updateDeltaTime();
        this.elapsedTime += this.deltaTime;
    }

    updateDeltaTime() {
        let lCurrent = Timer.getNow();
        this.deltaTime = this.isRunning ? lCurrent - this.lastDateInMS : 0;
        this.lastDateInMS = lCurrent;
    }

    resume() {
        this.lastDateInMS = Timer.getNow();
        this.isRunning = true;
    }

    stop() {
        this.isRunning = false;
    }

    reset() {
        this.elapsedTime = 0;
        this.deltaTime = 0;
    }

}