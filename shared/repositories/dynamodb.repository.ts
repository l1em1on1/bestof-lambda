import "reflect-metadata"

import { DynamoDB } from "aws-sdk"
import { injectable, inject, decorate } from "inversify"

import { IRepository, IErrorHandler } from "../interfaces"

@injectable()
export class DynamoDBRepository implements IRepository {
    private _dataClient: DynamoDB.DocumentClient;
    private _errorHandler: IErrorHandler;
    private _tableName: string;

    constructor(
        @inject("DynamoDB.DocumentClient") dataClient: DynamoDB.DocumentClient,
        @inject("DynamoDBErrorHandler") errorHandler: IErrorHandler, 
        @inject("tableName") tableName: string
    ) {
        this._dataClient = dataClient;
        this._errorHandler = errorHandler;
        this._tableName = tableName;
    }

    get(key: {[someKey: string]: any}): Promise<any> {
        var params: DynamoDB.GetParam = {
            TableName: this._tableName,
            Key: key
        }

        return new Promise<any>((resolve, reject) => {
            this._dataClient.get(params, (error: any, data: any) => {
                if (this._errorHandler.isNoError(error, reject)) {
                    resolve(data.Item);
                }
            });
        });
    }

    list(filterExpression?: string, filterKeyValues?: {[key: string]: string}): Promise<any> {
        var params: DynamoDB.QueryParam = {
            TableName: this._tableName,
            KeyConditionExpression: filterExpression,
            ExpressionAttributeValues: filterKeyValues
        }

        return new Promise<any>((resolve, reject) => {
            this._dataClient.query(params, (error: any, data: any) => {
                if (this._errorHandler.isNoError(error, reject)) {
                    resolve(data.Item);
                }
            });
        });
    }

    listAll() : Promise<any> {
        var params: DynamoDB.ScanParam = {
            TableName: this._tableName
        }

        return new Promise<any>((resolve, reject) => {
            this._dataClient.scan(params, (error: any, data: any) => {
                if (this._errorHandler.isNoError(error, reject)) {
                    resolve(data.Item);
                }
            });
        });
    }

    upsert(item: any): Promise<any> {
        var params: DynamoDB.PutParam = {
            TableName: this._tableName,
            Item: item
        };

        return new Promise<any>((resolve, reject) => {
            this._dataClient.put(params, (error: any, data: any) => {
                if (this._errorHandler.isNoError(error, reject)) {
                    resolve(data);
                }
            });
        });
    }

    add(item: any, uniqueKey: string): Promise<any> {
        var params: DynamoDB.PutParam = {
            TableName: this._tableName,
            Item: item,
            ConditionExpression: `attribute_not_exists(${uniqueKey})`
        };

        return new Promise<any>((resolve, reject) => {
            this._dataClient.put(params, (error: any, data: any) => {
                if (this._errorHandler.isNoError(error, reject)) {
                    resolve(data);
                }
            });
        });
    }

    update(item: any, key: {[someKey: string]: any}): Promise<any> {
        return null;
    }

    delete(key: {[someKey: string]: any}): Promise<any> {
        return null;
    }
}