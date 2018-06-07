export default class FormatDate {
    /**
     * 
     * @param {Date} pDate 
     */
    static toObject(pDate) {
        let lArray = this.toArray(pDate);
        return {
            h:lArray[0],
            m:lArray[1],
            s:lArray[2]
        }
    }

    /**
     * 
     * @param {Date} pDate 
     */
    static toString(pDate) {
        if (pDate == null) pDate = new Date();
        return this.addZero(pDate.getHours()) + ":" + this.addZero(pDate.getMinutes()) + ":" + this.addZero(pDate.getSeconds());
    }

    /**
     * 
     * @param {Date} pDate 
     */
    static toArray(pDate) {
        if (pDate == null) pDate = new Date();
        return [this.addZero(pDate.getHours()), this.addZero(pDate.getMinutes()), this.addZero(pDate.getSeconds())];
    }

    /**
     * 
     * @param {Number} pNumber 
     */
    static addZero(pNumber) {
        let lString = String(pNumber);
        if (pNumber < 10) lString = "0" + lString;
        return lString;
    }

    /**
     * 
     * @param {String} pString
     */
    static strToMs(pString) {
        let lArray = pString.split(":");
        let lLength = lArray.length;
        let lMs = 0;
        lMs += lArray[0] * 3600000;
        if (lLength >= 2) {
            lMs += lArray[1] * 60000;
            if (lLength >= 3) {
                lMs += lArray[2] * 1000;
                if (lLength >= 3) lMs += lArray[3];
            }
        }
        return lMs;
    }
}