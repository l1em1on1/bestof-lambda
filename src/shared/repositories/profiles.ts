/// <reference path="../../../typings/index.d.ts" />
import { DynamoDB } from "aws-sdk"

export class Profiles {
    constructor(private dataClient: DynamoDB.DocumentClient) {
        

    }

    getProfiles(): any {
        return this.dataClient.listTables({});

    }

}