import { Auth } from "./Auth.js"

export class tzUtils {
    constructor() {
        this.auth
    }

    connect(uri, privKey){
        this.auth = new Auth(uri, privKey)
    }
    
    timetampToTime(timestamp) {
        var refDateObj = new Date(), curDateObj = new Date(timestamp)
        let isPM = 0
        if (refDateObj.getDate() === curDateObj.getDate() && refDateObj.getMonth() === curDateObj.getMonth() && refDateObj.getFullYear() === curDateObj.getFullYear()) {

            if (curDateObj.getHours() === 0) {
                isPM = 1
                if (curDateObj.getMinutes() < 10) {
                    return "Today at " + (12) + ":0" + curDateObj.getMinutes() + " PM"
                } else {
                    return "Today at " + (12) + ":" + curDateObj.getMinutes() + " PM"
                }
            } else if (curDateObj.getHours() > 12) {
                isPM = 1
                if (curDateObj.getMinutes() < 10) {
                    return "Today at " + (curDateObj.getHours() - 12) + ":0" + curDateObj.getMinutes() + " PM"
                } else {
                    return "Today at " + (curDateObj.getHours() - 12) + ":" + curDateObj.getMinutes() + " PM"
                }
            } else {
                if (curDateObj.getHours() === 12) {
                    if (curDateObj.getMinutes() < 10) {
                        return "Today at " + curDateObj.getHours() + ":0" + curDateObj.getMinutes() + " PM"
                    } else {
                        return "Today at " + curDateObj.getHours() + ":" + curDateObj.getMinutes() + " PM"
                    }
                } else {
                    isPM = 0
                    if (curDateObj.getMinutes() < 10) {
                        return "Today at " + curDateObj.getHours() + ":0" + curDateObj.getMinutes() + " AM"
                    } else {
                        return "Today at " + curDateObj.getHours() + ":" + curDateObj.getMinutes() + " AM"
                    }
                }
            }
        } else if ((refDateObj.getDate() - 1) === curDateObj.getDate() && refDateObj.getMonth() === curDateObj.getMonth() && refDateObj.getFullYear() === curDateObj.getFullYear()) {
            if (curDateObj.getHours() > 12) {
                isPM = 1
                if (curDateObj.getMinutes() < 10) {
                    return "Yesterday at " + (curDateObj.getHours() - 12) + ":0" + curDateObj.getMinutes() + " PM"
                } else {
                    return "Yesterday at " + (curDateObj.getHours() - 12) + ":" + curDateObj.getMinutes() + " PM"
                }
            } else {
                if (curDateObj.getHours() === 12) {
                    if (curDateObj.getMinutes() < 10) {
                        return "Today at " + curDateObj.getHours() + ":0" + curDateObj.getMinutes() + " PM"
                    } else {
                        return "Today at " + curDateObj.getHours() + ":" + curDateObj.getMinutes() + " PM"
                    }
                } else {
                    isPM = 0
                    if (curDateObj.getMinutes() < 10) {
                        return "Today at " + curDateObj.getHours() + ":0" + curDateObj.getMinutes() + " AM"
                    } else {
                        return "Today at " + curDateObj.getHours() + ":" + curDateObj.getMinutes() + " AM"
                    }
                }
            }
        } else if ((refDateObj.getDate() + 1) === curDateObj.getDate() && refDateObj.getMonth() === curDateObj.getMonth() && refDateObj.getFullYear() === curDateObj.getFullYear()) {
            if (curDateObj.getHours() > 12) {
                isPM = 1
                if (curDateObj.getMinutes() < 10) {
                    return "Tomorrow at " + (curDateObj.getHours() - 12) + ":0" + curDateObj.getMinutes() + " PM"
                } else {
                    return "Tomorrow at " + (curDateObj.getHours() - 12) + ":" + curDateObj.getMinutes() + " PM"
                }
            } else {
                if (curDateObj.getHours() === 12) {
                    if (curDateObj.getMinutes() < 10) {
                        return "Today at " + curDateObj.getHours() + ":0" + curDateObj.getMinutes() + " PM"
                    } else {
                        return "Today at " + curDateObj.getHours() + ":" + curDateObj.getMinutes() + " PM"
                    }
                } else {
                    isPM = 0
                    if (curDateObj.getMinutes() < 10) {
                        return "Today at " + curDateObj.getHours() + ":0" + curDateObj.getMinutes() + " AM"
                    } else {
                        return "Today at " + curDateObj.getHours() + ":" + curDateObj.getMinutes() + " AM"
                    }
                }
            }
        }
        else {
            return (curDateObj.getMonth() + 1) + "/" + curDateObj.getDate() + "/" + curDateObj.getFullYear()
        }
    }
}