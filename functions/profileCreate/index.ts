import { Context, Callback } from "aws-lambda"
import { IProfiles, IRequestProfileCreate } from "./shared/interfaces"

import kernel from "./shared/inversify.config"

var profiles = kernel.get<IProfiles>("Profiles");

export function handle(event: IRequestProfileCreate, context: Context, callback: Callback) {
    if (event == null) {
        context.fail("No event object");
    }

    profiles.createProfile(event)
        .then(createdProfile => {
            callback(null, createdProfile);
        })
        .catch(function(error) {
            callback(error, null);
        })
}