/// <reference path="../typings/index.d.ts" />

import { DynamoDB } from "aws-sdk"
import { Kernel } from "inversify"

import { IProfiles } from "./interfaces"
import { Profiles } from "./repositories/profiles"

var kernel = new Kernel();
kernel.bind<DynamoDB.DocumentClient>("DynamoDB.DocumentClient").toConstantValue(new DynamoDB.DocumentClient());
kernel.bind<IProfiles>("Profiles").to(Profiles);

export default kernel;