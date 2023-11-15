#!/usr/bin/env node 
import crypto from "crypto"; 

// we are simulating a memoryStore by using Map instead of JS object,
// since we will be adding and removing over and over.
let users = new Map();

    users.set("bob",{
    userId: "123321",
    username: "bob",
    pwHash: "8c75d399bde93a445aa91e5afab53671e7763be9",
    email: "bob@example.com",
    isLoggedIn: false,
    sitePrefernces:{
        darkMode: true,
    },
    shoppingCart: [],
});

users.set("alice",{
    userId: "7890987",
    username: "alice",
    pwHash: "a197b80f033c19c7676caf25a601a05b90ae7169",
    email: "alice@example.com",
    isLoggedIn: false,
    sitePrefernces: {
        darkMode: false,
    }, shoppingCart: [],
});

let items = [
    "gizmo",
    "trinket",
    "doodad",
    "widget",
];

// after 2 seconds the function attempts to find a user with the provided username
// in the 'user' Map, if founded, it updates 'isLoggedIn' to true.
function userLogin(username, pwHash, callback, errorCallback){
    setTimeout(()  => {
        let user;
        try{
            if (!users.has(username)){
                throw new Error(`User "${username}" does not exist.`);
            }
            user = users.get(username);
            if (user.pwHash !== pwHash) {
                throw new Error(`Invalid password hash "${pwHash}" provided for user "${username}".`);
            }
            user.isLoggedIn =true;
        } catch (err){
            if (typeof errorCallback === "function"){
                errorCallback(err);
            }
            return;
        }
        if (typeof callback === "function"){
            callback(user)
        }
    }, 2000);
}

function addToCart(username, item, callback, errorCallback) {
    setTimeout(() => {
        let user;
        try{
            if (!users.has(username)) {
                throw new Error(`User "${username}" does not exist.`);
            }
            if (!items.includes(item)) {
                throw new Error(`Item "${item}" does not exist.`);
            }
            user = users.get(username);
            if (!user.isLoggedIn) {
                throw new Error(`User "${username}" is not logged in.`);
            }
            user.shoppingCart.push(item);
        } catch (err) {
            if (typeof errorCallback === "function"){
                errorCallback(err);
            }
            return;
        }
        if (typeof callback === "function"){
            callback(user);
        }

    }, 1000)
}

function handleLoginSuccess(data){
    console.log("Login success callback!");
    console.log(data);
    addToCart("bob", "gizmo" , handleAddSuccess, handleAddError);

}
function handleLoginError (err){
    console.log("Login error callback!");
    console.error(err);
}
function handleAddSuccess(data){
    console.log("Add success callback!");
    console.log(data);
}
function handleAddError(err){
    console.log("Add error callback!");
    console.error(err);
}

function hashPassword(password){
    const salt = "GeorgeOrwell1984";
    const hash =  crypto.createHash("sha1").update(password+salt).digest("hex");
    return hash;
}

userLogin("bob", "bobsbadpassword", handleLoginSuccess, handleLoginError);
userLogin("Bob", hashPassword("bobsbadpassword"), handleLoginSuccess, handleLoginError);
userLogin("bob", hashPassword("bobsbadpassword"), handleLoginSuccess, handleLoginError);

addToCart("Bob", "gizmo" , handleAddSuccess, handleAddError);
addToCart("bob", "gadet" , handleAddSuccess, handleAddError);
addToCart("bob", "gizmo" , handleAddSuccess, handleAddError);

function nestedHandleLoginSuccess(data){
    console.log("Nested login success callback");
    console.log(data);
    addToCart(data.username, "gizmo", handleAddSuccess, handleAddError);
}
setTimeout(() =>{
    userLogin("alice", hashPassword("alicesbadpassword"), nestedHandleLoginSuccess, handleLoginError);
}, 5000);


