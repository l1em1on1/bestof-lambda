import { Context, Callback } from "aws-lambda"
import { IProfiles, IRequestProfileCreate, IErrorHandler } from "./shared/interfaces"

import kernel from "./shared/inversify.config"

var profiles = kernel.get<IProfiles>("Profiles");
var errorHandler = kernel.get<IErrorHandler>("GenericErrorHandler");

export function handle(event: IRequestProfileCreate, context: Context, callback: Callback) {
    if (Object.keys(event).length === 0) {
        callback(errorHandler.handleError("PROFILE_CREATE_REQUEST_MISSING_INPUT"), null);
    }

    profiles.createProfile(event)
        .then(createdProfile => {
            callback(null, createdProfile);
        })
        .catch(function(error) {
            callback(error, null);
        })
}