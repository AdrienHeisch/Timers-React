class ButtonTimerRemove extends Button {
    /**
     * 
     * @param {Timer} pTimer 
     */
    constructor(pTimer) {
        super();
        this.timer = pTimer;
    }

    onClick() {
        if (confirm('Do you want to remove the "' + this.timer.name + '" timer ?')) this.timer.destroy();
    }
}