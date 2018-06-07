class ButtonTimerControl extends Button {
    /**
     * 
     * @param {Timer} pTimer 
     */
    constructor(pTimer) {
        super();
        this.timer = pTimer;
        this.isOn = false;
        this.html.innerHTML = "Play";
    }

    onClick() {
        this.isOn = !(this.isOn);
        if (this.isOn) {
            this.timer.play();
            this.html.innerHTML = "Stop";
        } else {
            this.timer.stop();
            this.html.innerHTML = "Play";
        }
    }
}