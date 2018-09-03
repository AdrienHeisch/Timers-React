export default abstract class MathTools {

    public static clamp (pNumber:number, pMin:number = 0, pMax:number = 1) {
        return Math.min(Math.max(pNumber, pMin), pMax);
    }

}