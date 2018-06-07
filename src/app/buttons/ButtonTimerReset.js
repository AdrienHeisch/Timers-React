class ButtonTimerReset extends Button {
    /**
     * 
     * @param {Timer} pTimer 
     */
    constructor(pTimer) {
        super();
        this.isOn = true;
        this.timer = pTimer;
        this.html.innerHTML = "Reset";
    }

    onClick() {
        if (confirm('Do you want to reset the "' + this.timer.name + '" timer ?')) this.timer.reset();;
    }
}