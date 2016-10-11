import { Context, Callback } from "aws-lambda"
import { IProfiles, IRequestProfileCreate } from "./shared/interfaces"

import kernel from "./shared/inversify.config"

var profiles = kernel.get<IProfiles>("Profiles");

export function handle(event: IRequestProfileCreate, context: Context, callback: Callback) {
    if (event == null) {
        context.fail("No event object");
    }

    profiles.createProfile(event).catch(function(error) {
        context.fail(error);
    }).then(created => {
       
    }).catch(function(error) {
       context.fail(error);
    }).then(profiles => {
        callback(null, {
            "profiles": profiles
        });
    })
}