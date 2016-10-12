import "reflect-metadata";

import { DynamoDB } from "aws-sdk"
import { injectable, inject, named } from "inversify";

import { IRequestProfileCreate, IProfiles, IProfile, IRepository, IErrorHandler } from "../interfaces";

@injectable()
export class Profiles implements IProfiles {
    private _repository: IRepository;
    private _errorHandler: IErrorHandler;

    public readonly UNIQUE_KEY_NAME: string = "username";

    constructor(
        @inject("DynamoDBRepository") @named("Profiles") repository: IRepository,
        @inject("GenericErrorHandler") errorHandler: IErrorHandler) {
        this._repository = repository;
        this._errorHandler = errorHandler;
    }

    getProfile(username: string): Promise<IProfile> {
        var query = {};
        query[this.UNIQUE_KEY_NAME] = username;

        return this._repository.get(query);
    }

    updateProfile() {

    }

    createProfile(profile: IRequestProfileCreate): Promise<IProfile> {
        return this._repository.add(profile, this.UNIQUE_KEY_NAME).then(console.log).catch(reason => {
            if (reason.code == "ConditionalCheckFailedException") return Promise.reject(this._errorHandler.handleError("PROFILE_ALREADY_EXISTED"));
        }).then(result => {
            return this.getProfile(profile.username);
        });
    }
}