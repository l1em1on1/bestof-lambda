/// <reference path="../typings/index.d.ts" />

export interface IErrorHandler {
    handleError(error: any) : any; 
    isNoError(error: any, reject: (reason?: any) => void): boolean;
}

export interface IRequestCreateProfile {
    username: string;
    email: string;
    fullname: string;

    password: string;
}

export interface IRepository {
    get(key: {[someKey: string]: any}): Promise<any>;
    add(item: any): Promise<any>;
    list(filterExpression?: string, filterKeyValues?: {[key: string]: string}): Promise<any>;
    update(): any;
    delete(): any;
}

export interface IProfiles {
    getProfiles(): Promise<any>;
    createProfile(profile: IRequestCreateProfile): Promise<any>;
}

export interface ITopic {
    name: string;
}

export interface IProfile {
    username: string;
    email: string;
    fullname: string;

    topics: ITopic[];
}