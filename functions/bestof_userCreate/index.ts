/// <reference path="../../typings/index.d.ts" />

import { Context, Callback } from "aws-lambda"
import { DynamoDB } from "aws-sdk"

import { IProfiles, IRequestUserCreate } from "./shared/interfaces"

import kernel from "./shared/inversify.config"


export function handle(event: IRequestUserCreate, context: Context, callback: Callback) {
    // Check our parameters
    if (event == null) {
        context.fail("No event object");
    }

    var profiles = kernel.get<IProfiles>("Profiles");

    // Success
    context.succeed("Great Success" + profiles.getProfiles());

    callback(null, event);
}