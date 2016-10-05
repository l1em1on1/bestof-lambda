/// <reference path="../../../typings/index.d.ts" />

import { Context, Callback } from "aws-lambda"
import { DynamoDB } from "aws-sdk"

import infuse = require("infuse.js");

import { Group } from "../../shared/models/group"


interface Request {
    name: string,
    email: string,
    password: string
}

export function handle(event: Request, context: Context, callback: Callback) {
    // Check our parameters
    if (event == null) {
        context.fail("No event object");
    }

    
    // Success
    context.succeed("Great Success");


    callback(null, event);
}

function setDependencies() {
    var injector = new infuse.Injector();
}