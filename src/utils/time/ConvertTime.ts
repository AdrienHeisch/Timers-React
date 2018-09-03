export default abstract class ConvertTime {

    public static msToSeconds (pMs:number):number {
        return pMs / 1000;
    }

    public static msToMinutes (pMs:number):number {
        return pMs / 60000;
    }

    public static msToHours (pMs:number):number {
        return pMs / 3600000;
    }

    public static secondsToMs (pSeconds:number):number {
        return pSeconds * 1000;
    }

    public static secondsToMinutes (pSeconds:number):number {
        return pSeconds / 60;
    }

    public static secondsToHours (pSeconds:number):number {
        return pSeconds / 3600;
    }

    public static minutesToMs (pMinutes:number):number {
        return pMinutes * 60000;
    }

    public static minutesToSeconds (pMinutes:number):number {
        return pMinutes * 60;
    }

    public static minutesToHours (pMinutes:number):number {
        return pMinutes / 60;
    }

    public static hoursToMs (pHours:number):number {
        return pHours * 3600000;
    }

    public static hoursToSeconds (pHours:number):number {
        return pHours * 3600;
    }

    public static hoursToMinutes (pHours:number):number {
        return pHours * 60;
    }

}