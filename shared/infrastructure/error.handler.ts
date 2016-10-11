import "reflect-metadata";

import { injectable } from "inversify"
import { IErrorHandler } from "../interfaces"

@injectable()
export class DynamoDBErrorHandler implements IErrorHandler {
    //TODO: implement error structure and logs possibly in other generic class
    handleError(error: any) : any {
        console.log(error);
        
        return error;
    }

    isNoError(error: any, reject: (reason?: any) => void): boolean {
        if (error == null) return true;

        reject(this.handleError(error));

        return false;
    }
}

@injectable()
export class GenericErrorHandler implements IErrorHandler {
    handleError(error: any) : any {
        console.log(error);
        
        return error;
    }

    isNoError(error: any, reject: (reason?: any) => void): boolean {
        if (error == null) return true;

        reject(this.handleError(error));

        return false;
    }
}