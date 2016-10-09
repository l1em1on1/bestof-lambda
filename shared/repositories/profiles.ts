/// <reference path="../../typings/index.d.ts" />
import "reflect-metadata";

import { DynamoDB } from "aws-sdk"
import { injectable, inject, named } from "inversify";

import { IRequestCreateProfile, IProfiles, IRepository } from "../interfaces";

@injectable()
export class Profiles implements IProfiles {
    private _repository: IRepository;

    constructor(@inject("DynamoDBRepository") @named("Profiles") repository: IRepository) {
        this._repository = repository;
    }

    getProfiles(): Promise<any> {
        return this._repository.list("username = :username", {":username": "l1em1on1"});
    }


    updateProfile() {

    }

    createProfile(profile: IRequestCreateProfile): Promise<any> {
        console.log(profile);

        return this._repository.add(profile);
    }
}