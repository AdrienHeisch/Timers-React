class Timer {
    /**
     * 
     * @param {Array} pData 
     */
    constructor(pData) {
        this.time = 0;
        this.refTime = Date.now();
        this.storage = 0;
        this.isPlaying = false;
        this.isDeleted = false;


        this.htmlName = new ButtonTimerRemove(this).html;
        this.htmlTimeDisplay = document.createElement("p");
        this.htmlGoalInput = document.createElement("input");
        this.htmlGoalInput.setAttribute("type", "time");

        this.htmlIsDone = document.createElement("img");
        this.htmlIsDone.setAttribute("src", "img/notOk.png");
        this.htmlIsDone.height *= 0.25;
        this.htmlIsDone.width *= 0.25;

        this.htmlButtonControl = new ButtonTimerControl(this).html;
        this.htmlButtonReset = new ButtonTimerReset(this).html;

        this.loadData(pData);
        this.doPlay();
        this.refresh = function(){};
    }

    /**
     * @param {String} pString
     */
    set name(pString) {
        this.htmlName.innerHTML = pString;
    }
    get name() {
        return this.htmlName.innerHTML;
    }

    /**
     * @param {Number} pNumber
     */
    set goal(pNumber) {
        this.htmlGoalInput.setAttribute("value", pNumber);
    }
    get goal() {
        return this.htmlGoalInput.getAttribute("value");
    }

    getData() {
        return [this.name, this.time, this.goal];
    }

    /**
     * 
     * @param {Array} pData 
     */
    loadData(pData) {
        this.name = pData[0];
        this.time = pData[1];
        this.goal = pData[2];
    }

    play() {
        this.refTime = Date.now();
        this.isPlaying = true;
        this.refresh = this.doPlay;
    }

    doPlay() {
        this.time = this.storage + Date.now() - this.refTime;
        this.htmlTimeDisplay.innerHTML = Time.toString(new Date(this.time));

        var timeGoal = Time.strToMs(this.htmlGoalInput.value);
        if (this.time >= timeGoal && timeGoal != 0) {
            if (this.htmlIsDone.getAttribute("src") != "img/isOk.png") {
                this.htmlIsDone.setAttribute("src", "img/isOk.png");
                this.isDone = true;
            }
        } else if (this.htmlIsDone.getAttribute("src") != "img/notOk.png") {
            this.htmlIsDone.setAttribute("src", "img/notOk.png");
            this.isDone = false;
        }
    }

    stop() {
        this.storage = this.time;
        this.isPlaying = false;
        this.refresh = function(){};
    }

    reset() {
        this.htmlButtonControl.click();
        if (this.isPlaying == true) this.htmlButtonControl.click();
        
        this.storage = 0;
        this.refTime = Date.now();
        this.doPlay();
    }

    destroy() {
        this.isDeleted = true;
    }
    
}