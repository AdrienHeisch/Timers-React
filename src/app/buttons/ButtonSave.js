class ButtonSave extends Button {
    /**
     * 
     * @param {TimerTable} pTimerTable 
     */
    constructor(pTimerTable) {
        super();
        this.timerTable = pTimerTable;
        this.html.innerHTML = "Save";
    }

    onClick() {
        this.timerTable.save();
    }
}