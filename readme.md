# tzUtils

tzUtils is a utility library I have made for the convinience of myself for the most part, but if you like it then that is cool!

If you see problems with any of my code please tell me in an issue!

You can install it by running `npm i tz-utils`

# Documentation

# tzUtils

## connect(uri, privKey) ⇒ <code>Void</code>
sets `tzUtils.Auth` to and initiallizes the class `Auth`, and sets `tzUtils.DB` to `Mongoose.Connection`

**Kind**: global function  
**Returns**: <code>Void</code>

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | URI for connecting to mongodb. |
| privKey | <code>string</code> | Private key or secret for the jsonwebtoken. |

## timetampToTime(timestamp, options) ⇒ <code>string</code>
Takes in the unix time and displays a nice time for users.

**Kind**: global function  
**Returns**: <code>string</code>

| Param | Type | Description |
| --- | --- | --- |
| timestamp | <code>number</code> | Unix timestamp. |
| options | <code>object</code> | Currently the only implemented option is `isMDY`, which determines whether or not the date format is DDMMYYYY or MMDDYYYY |

# tzUtils.Auth

## login(email, password) ⇒ <code>Promise<{success: boolean, code:number, token:string?}></code>
Registers the user with the provided information.

**Kind**: global function  
**Returns**: <code>Promise<{success: boolean, code:number, token:string?}></code> - A promise that resolves to the result of logging in.  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | The user's email. |
| password | <code>string</code> | the user's password. |

## register(username, email, password) ⇒ <code>Promise<{success: boolean, code:number, token:string?}></code>
Registers the user with the provided information.

**Kind**: global function  
**Returns**: <code>Promise<{success: boolean, code:number, token:string?}></code> - A promise that resolves to the result of the registration.  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The user's username. |
| email | <code>string</code> | The user's email address. |
| password | <code>string</code> | the user's password. |

## verifyToken(token) ⇒ <code>Object</code>
Verify user token

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | User token to verify. |