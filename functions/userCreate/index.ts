/// <reference path="../../typings/index.d.ts" />

import { Context, Callback } from "aws-lambda"
import { DynamoDB } from "aws-sdk"

import { IProfiles, IRequestCreateProfile } from "./shared/interfaces"

import kernel from "./shared/inversify.config"

var profiles = kernel.get<IProfiles>("Profiles");

export function handle(event: IRequestCreateProfile, context: Context, callback: Callback) {
    // Check our parameters
    if (event == null) {
        context.fail("No event object");
    }

    profiles.createProfile(event).catch(function(error) {
        context.fail(error);
    }).then(created => {
        return profiles.getProfiles();
    }).catch(function(error) {
       context.fail(error);
    }).then(profiles => {
        callback(null, {
            "profiles": profiles
        });
    })
}