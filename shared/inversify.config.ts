import { DynamoDB } from "aws-sdk"
import { Kernel, decorate, injectable } from "inversify"

import { IProfiles, IErrorHandler, IRepository }  from "./interfaces"
import { Profiles } from "./repositories/profiles"
import { DynamoDBRepository } from "./repositories/dynamodb.repository"
import { DynamoDBErrorHandler, GenericErrorHandler } from "./infrastructure/error.handler"

var kernel = new Kernel();

//decorate(injectable(), DynamoDB.DocumentClient);
kernel.bind<DynamoDB.DocumentClient>("DynamoDB.DocumentClient").toConstantValue(new DynamoDB.DocumentClient());

kernel.bind<IProfiles>("Profiles").to(Profiles);
kernel.bind<string>("tableName").toConstantValue("BestOf_Profiles").whenParentNamed("Profiles");

kernel.bind<IRepository>("DynamoDBRepository").to(DynamoDBRepository);
kernel.bind<IErrorHandler>("DynamoDBErrorHandler").to(DynamoDBErrorHandler);

kernel.bind<IErrorHandler>("GenericErrorHandler").to(GenericErrorHandler);

export default kernel;