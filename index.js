import mongoose from "mongoose"
import { Auth } from "./Auth.js"

export class tzUtils {
    constructor() {
        this.Auth
        this.DB
    }

    /**
     * Sets `tzUtils.Auth` to and initiallizes the class `Auth`, and sets `tzUtils.DB` to `Mongoose.Connection`
     * @param {uri} uri - URI for connecting to mongodb.
     * @param {string} privKey - Private key or secret for the jsonwebtoken.
     * @returns {void} 
     */
    connect(uri, privKey){
        if(typeof window === 'undefined'){

            let h = mongoose.connect(uri)
            this.Auth = new Auth(h, privKey)
            this.DB = h
        } else {
            console.log("You cant use tzUtils.connect inside a browser.")
        }
    }
    

    /**
     * Takes in the unix time and displays a nice time for users.
     * @param {number} timestamp - Unix timestamp.
     * @param {object} options - Currently the only implemented option is `isMDY`, which determines whether or not the date format is DDMMYYYY or MMDDYYYY
     * @returns {string}
     */
    timetampToTime(timestamp, options) {
        if(options == undefined) {
            options = {}
        }
        if(options.isMDY == undefined){
            options.isMDY = false
        }
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
        else if(options.isMDY) {
            return (curDateObj.getMonth() + 1) + "/" + curDateObj.getDate() + "/" + curDateObj.getFullYear()
        }else {
            return  curDateObj.getDate() + "/" + (curDateObj.getMonth() + 1) + "/" + curDateObj.getFullYear()
        }
    }
}