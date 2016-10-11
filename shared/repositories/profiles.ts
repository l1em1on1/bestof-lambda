import "reflect-metadata";

import { DynamoDB } from "aws-sdk"
import { injectable, inject, named } from "inversify";

import { IRequestProfileCreate, IProfiles, IProfile, IRepository, IErrorHandler } from "../interfaces";

@injectable()
export class Profiles implements IProfiles {
    private _repository: IRepository;
    private _erroHandler: IErrorHandler;

    constructor(
        @inject("DynamoDBRepository") @named("Profiles") repository: IRepository,
        @inject("GenericErrorHandler") errorHandler: IErrorHandler) {
        this._repository = repository;
    }

    getProfile(username: string): Promise<IProfile> {
        return this._repository.get({"username": username});
    }

    updateProfile() {

    }

    createProfile(profile: IRequestProfileCreate): Promise<IProfile> {
        return this._repository.add(profile).then(addProfile => {
            return this.getProfile(profile.username).then(profileCreated => {
                try {
                    if (profileCreated.username == profile.username) return profile;
                } catch (error) {
                    Promise.reject(this._erroHandler.handleError({"code": "CREATE_PROFILE_FAILED", "data": addProfile }));
                }
            });
        });
    }
}