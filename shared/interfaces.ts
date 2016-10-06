export interface IRequestUserCreate {
    name: string,
    email: string,
    password: string
}

export interface IProfiles {
    getProfiles(): any;
}

export interface IGroup {
    name: string
}

export interface IProfile {
    name: string,
    email: string,
    groups: IGroup[]
}