/// <reference path="../../typings/index.d.ts" />

import { DynamoDB } from "aws-sdk"
import { injectable, inject, decorate } from "inversify";
import "reflect-metadata";

import { IProfiles } from "../interfaces";

export class Profiles implements IProfiles {
    private _dataClient: DynamoDB.DocumentClient;

    constructor(dataClient: DynamoDB.DocumentClient) {
        this._dataClient = dataClient;
    }

    getProfiles(): any {
        return " test " + (this._dataClient == null)

    }
}

decorate(injectable(), Profiles);
decorate(inject("DynamoDB.DocumentClient"), Profiles, 0);