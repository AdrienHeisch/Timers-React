class TimerTable {
    constructor() {
        document.createElement("table");
        this.html = document.createElement("table");
        this.content = [];
        this.list = [];

        if (localStorage.getItem("data")) this.load();
        else this.generate();
    }

    /**
     * 
     * @param {Array} pData 
     */
    addTimer(pData) {
        var lTimer = new Timer(pData);
        this.list.push(lTimer);
        this.generate();
    }

    /**
     * 
     * @param {Timer} pTimer 
     */
    removeTimer(pTimer) {
        this.list.splice(this.list.indexOf(pTimer), 1);
        this.generate();
    }

    save() {
        this.generateContent();
        var lDataString = "{";
        var lLength = this.list.length;
        for (var i = 0; i < lLength; i++) {
            lDataString += '"timer' + i + '":"[' + this.list[i].getData() + ']"';
            if (i < lLength - 1) lDataString += ",";
        }
        lDataString += "}";
        localStorage.setItem("data", lDataString);
    }

    load() {
        this.list = [];
        var lDataObject = JSON.parse(localStorage.getItem("data"));
        var lLength = Object.keys(lDataObject).length;
        var lTimer;
        for (var i = 0; i < lLength; i++) {
            this.addTimer(Tools.stringToArray(lDataObject["timer" + i]));
        }
        
        this.generate();
    }

    refresh() {
        var lTimer;
        var lLength = this.list.length;
        for (var i = 0; i < lLength; i++) {
            lTimer = this.list[i];
            if (lTimer.isDeleted) {
                this.removeTimer(lTimer);
                return;
            }
            lTimer.refresh();
        }
    }

    generate() {
        this.generateContent();
        this.generateHTML();
    }

    generateContent() {
        this.content = [
            ["Timer Name", "Time Spent Today", "Daily Goal", "Goal Reached ?", "Control"]
        ];
        var lLength = this.list.length;
        var lTimer;
        for (var i = 0; i < lLength; i++) {
            lTimer = this.list[i];
            this.content.push([
                lTimer.htmlName, lTimer.htmlTimeDisplay, lTimer.htmlGoalInput, lTimer.htmlIsDone, [lTimer.htmlButtonControl, lTimer.htmlButtonReset]
            ]);
        }
        this.content.push([new ButtonTimerAdd(this).html, "--:--:--", "--:--:--", "-", "-"]);
    }

    generateHTML() {
        var lLength = this.content.length;
        this.html.innerHTML = "";
        var row;
        var data;
        var j;
        for (var i = 0; i < lLength; i++) {
            this.html.appendChild(row = document.createElement("tr"));
            for (j = 0; j < this.content[i].length; j++) {
                row.appendChild(data = document.createElement("td"));
                if (typeof this.content[i][j] == "object") {
                    Tools.applyToArray(this.content[i][j], function(pObject) {
                        data.appendChild(pObject);
                    });
                } else {
                    data.innerHTML = this.content[i][j];
                }
            }
        }
    }
}