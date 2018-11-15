
    export interface Features {
    }

    export interface Application {
        version: string;
        releaseDate: Date;
        features: Features;
    }

    export interface User {
        name: string;
        surname: string;
        userName: string;
        emailAddress: string;
        id: number;
    }

    export interface GetCurrentLoginInformations {
        application: Application;
        user: User;
        tenant?: any;
    }

