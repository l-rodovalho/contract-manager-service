import * as envVar from 'env-var';

export interface EnvironmentVariables {
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
}

export const env: EnvironmentVariables = {
    get PORT() { return envVar.get('PORT').required().asPortNumber(); },
    get DB_HOST() { return envVar.get('DB_HOST').required().asString(); },
    get DB_PORT() { return envVar.get('DB_PORT').required().asPortNumber(); },
    get DB_USER() { return envVar.get('DB_USER').required().asString(); },
    get DB_PASSWORD() { return envVar.get('DB_PASSWORD').required().asString(); },
    get DB_NAME() { return envVar.get('DB_NAME').required().asString(); },
};
