"use strict";

module.exports.handler = async(event) => {
    // TODO implement
    console.log(event[0])
    console.log("\nEvent Name: ", event[0]?.eventName)
    return event
};