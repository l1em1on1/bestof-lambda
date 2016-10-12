export interface IErrorHandler {
    handleError(error: any) : any; 
    isNoError(error: any, reject: (reason?: any) => void): boolean;
}

export interface IResponse {
    status: string;
    message?: string;
}

export interface IRequestProfileCreate {
    username: string;
    email: string;
    fullname: string;
}

export interface IProfiles {
    getProfile(username: string): Promise<IProfile>;
    createProfile(profile: IRequestProfileCreate): Promise<IProfile>;
}

export interface IRepository {
    get(key: {[someKey: string]: any}): Promise<any>;
    add(item: any, uniqueKey: string): Promise<any>;
    upsert(item: any): Promise<any>;
    list(filterExpression?: string, filterKeyValues?: {[key: string]: string}): Promise<any>;
    update(item: any, key: {[someKey: string]: any}): Promise<any>;
    delete(key: {[someKey: string]: any}): Promise<any>;
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