class ButtonTimerAdd extends Button {
    /**
     * 
     * @param {TimerTable} pTimerTable 
     */
    constructor(pTimerTable) {
        super();
        this.timerTable = pTimerTable;
        this.html.innerHTML = "Add Timer";
    }

    onClick() {
        var lInput = prompt("Name : ", "Timer");
        if (lInput != null && lInput != "") {
            this.timerTable.addTimer([lInput]);
        }
    }
}