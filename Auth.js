import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class Auth {
    constructor(uri, privKey) {
        this.privKey = privKey
        this.mongoose = mongoose
        this.mongoose.connect(uri)
        this.userSchema = this.userSchema()
        this.userModel = this.mongoose.model("Users", this.userSchema)

    }

    /**
     * Registers the user with the provided information.
     * 
     * @async
     * @function login
     * @param {string} email - The user's email.
     * @param {string} password - the user's password.
     * @returns {Promise<{success: boolean, code:number, token:string?}>} A promise that resolves to the result of the registration.
     */
    async login(email, password) {
        try {
            if (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email) != true) {
                return { success: false, code: 2061 }
            }
            if (password == undefined || password == null || !password || password == "") {
                return { success: false, code: 2071 }
            }

            let search = await this.userModel.findOne({ email })
            if (search == null || search.length == 0) {
                return { success: false, code: 2081 }
            }

            let token = jwt.sign({
                id: search._id,
                username: search.username,
                email: search.email
            }, this.privKey)
            
            return { success: true, code: 2551, token: token }
        }catch(e){
            console.log(e)
            return { success: false, code: 2000 }
        }
    }

    /**
     * Registers the user with the provided information.
     * 
     * @async
     * @function register
     * @param {string} username - The user's username.
     * @param {string} email - The user's email address.
     * @param {string} password - the user's password.
     * @returns {Promise<{success: boolean, code:number, token:string?}>} A promise that resolves to the result of the registration.
     */
    async register(username, email, password) {
        try {
            if (/^[a-zA-Z0-9]{3,12}$/.test(username) != true) {
                return { success: false, code: 1051 }
            }
            if (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email) != true) {
                return { success: false, code: 1061 }
            }
            if (!password) {
                return { success: false, code: 1071 }
            }

            let search = await this.userModel.exists({ username })
            if (search != null) {
                return { success: false, code: 1081 }
            }

            let user = new this.userModel({
                username,
                email,
                password: bcrypt.hashSync(password, 12)
            })

            await user.save()

            let token = jwt.sign({
                id: search._id,
                username: search.username,
                email: search.email
            }, this.privKey)

            return { success: true, code: 1551,  token: token}

        } catch (e) {
            console.log(e)
            return { success: false, code: 1000 }
        }
    }

    /**
     * Verify user token
     * @function verifyToken
     * @param {string} token - User token to verify.
     * @returns {{success: boolean, code:number, tokenData:{id:string, username:string, email:string}?}}
     */
    verifyToken(token){
        let result = jwt.verify(token, this.privKey)
        if(typeof result == undefined || !result){
            return { success: false, code: 3051}
        }else{
            return { success: true, code: 1551,  tokenData: result}
        }
        
    }

    userSchema() {
        return new this.mongoose.Schema({
            username: { type: String, match: /[a-zA-Z0-9]{3,10}/, required: true },
            email: { type: String, match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, required: true },
            password: { type: String, required: true },
            emailVerified: { type: Boolean, default: false },
            created: { type: Number, default: Date.now }
        })
    }
}