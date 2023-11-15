#!/usr/bin/env node

// function callback (err, data){
//     if (err /*instanceof ErrorType*/){
//         // handle error
//         return;
//     }
//     //handle success
//     doStuff(data);
// }

function randInt (start,end){
    let scale = Math.abs(end-start);
    let shift = Math.min(start, end);
    return Math.floor(Math.random() * scale + shift);
}

function getUserId(username){
    if (username === "alice") return "1000";
    else if (username === "bob") return "1001";
    else throw new Error(`Username not found error: Username "${username}" was not found in the database.`)
}

function playGame(userId){
    if (userId === "1000") return randInt(1, 10000);
    if (userId === "1001") return randInt(1, 10000);
    else throw new Error(`User id not found error: User id "${userId}" was not found in the database.`);
}

function determineWinner(player1Name, player1Score, player2Name, player2Score){
    if (player1Score <= 0){
        throw new Error(`Negative score error: Player "${player1Name}"nscore of ${player1Score} 
        is invalid. Negative scores not allowed.`);
    }
    if (player2Score <= 0){
        throw new Error(`Negative score error: Player "${player2Name}"nscore of ${player2Score} 
        is invalid. Negative scores not allowed.`);
    } 
    if (player1Score === player2Score){
        console.log(`${player1Name} and ${player2Name} tied with a score of ${player}!`);
    }
    else if (player1Score > player2Score){
        console.log(`${player1Name} (${player1Score}) defeated ${player2Name} (${player2Score})!`);
    }
    else{
        console.log(`${player2Name} (${player2Score}) vanquished ${player1Name} (${player1Score})!`);
    }
}

let aliceUsername, aliceId, aliceScore;
let bobUsername, bobId, bobScore;

console.log("--- sync ---");

aliceUsername = "alice";
aliceId = getUserId(aliceUsername);
aliceScore = playGame(aliceId);

bobUsername = "bob";
bobId = getUserId(bobUsername);
bobScore = playGame(bobId);

determineWinner(aliceUsername, aliceScore, bobUsername, bobScore);

console.log("Game over!")

function asyncify(syncFn, name, time){
    time = time === undefined ? randInt(0,2000) : time;

    let asyncFn = (...args) => {
        let callback = () =>{}
        if (args && typeof args[args.length - 1 ] === "function")
            callback = args.pop();
            console.log(`Starting - ${name}(${args})`);
            setTimeout(() =>{
                console.log(`Running -${name}(${args})`);
                let returnValue;
                try{
                    returnValue = syncFn(...args);
                }
                catch (err){
                    callback(err);
                    return;
                }
                callback(undefined, returnValue);
            }, time);
    };
    return asyncFn;
}

let getUserIdAsync = asyncify(getUserId, "getUserId");
let playGameAsync = asyncify(playGame, "PlayGame");
let determineWinnerAsync = asyncify(determineWinner, "determineWinner");

console.log("--- async ---");

aliceUsername = "alice";
aliceScore = 0;

bobUsername = "bob";
bobScore = 0;

getUserIdAsync(aliceUsername, (err,id) =>{
    if (err) {
        console.error("Bad username!", err);
        process.exit(1);
    }
    playGameAsync(id, (err,score) =>{
        if (err){
            console.error("Bad id!", err);
            process.exit(1);
        }
        aliceScore = score;
        if (bobScore){
            determineWinnerAsync(aliceUsername,aliceScore,bobUsername,bobScore, (err)=>{
                if (err) {
                    console.error("Negative score!", err);
                    process.exit(1);
                }
                console.log("Game over!");
            });
        }
    });
});

getUserIdAsync(bobUsername, (err,id) =>{
    if (err) {
        console.error("Bad username!", err);
        process.exit(1);
    }
    playGameAsync(id, (err,score) =>{
        if (err){
            console.error("Bad id!", err);
            process.exit(1);
        }
        bobScore = score;
        if (aliceScore){
            determineWinnerAsync(aliceUsername,aliceScore,bobUsername,bobScore, (err)=>{
                if (err) {
                    console.error("Negative score!", err);
                    process.exit(1);
                }
                console.log("Game over!");
            });
        }
    });
});
