export default abstract class FormatTime {
    
    public static toObject (pDate:Date):TimeDescriptor;
    public static toObject (pNumber:number):TimeDescriptor;
    public static toObject (pString:string):TimeDescriptor;
    public static toObject (pParam:Date|number|string):TimeDescriptor {
        let lDate:Date = this.makeDate(pParam as any);
        return {
            hours: lDate.getUTCHours(),
            minutes: lDate.getUTCMinutes(),
            seconds: lDate.getUTCSeconds()
        } as TimeDescriptor;
    }

    public static toString (pDate:Date):string;
    public static toString (pNumber:number):string;
    public static toString (pParam:Date|number):string {
        let lDate:Date = this.makeDate(pParam as any);
        return this.addZero(lDate.getUTCHours()) + ":" + this.addZero(lDate.getUTCMinutes()) + ":" + this.addZero(lDate.getUTCSeconds());
    }

    public static toArray (pDate:Date):Array<number>;
    public static toArray (pNumber:number):Array<number>;
    public static toArray (pString:string):Array<number>;
    public static toArray (pParam:Date|number|string):Array<number> {
        let lDate:Date = this.makeDate(pParam as any);
        return [
            lDate.getUTCHours(),
            lDate.getUTCMinutes(),
            lDate.getUTCSeconds()
        ];
    }

    private static makeDate (pDate:Date):Date;
    private static makeDate (pNumber:number):Date;
    private static makeDate (pString:string):Date;
    private static makeDate (pParam:Date|number|string):Date {
        return pParam instanceof Date ? pParam : new Date(pParam);
    }

    private static addZero (pNumber:number):string;
    private static addZero (pString:string):string;
    private static addZero (pParam:number|string):string {
        if (Number(pParam) === NaN) throw ("This parameter cannot be converted into a number: " + pParam);
        let lString = String(pParam);
        if (Number(pParam) < 10) lString = "0" + lString;
        return lString;
    }

}

type TimeDescriptor = {
    hours:number;
    minutes:number;
    seconds:number;
}