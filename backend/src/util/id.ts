import { UniqueID } from "nodejs-snowflake";

const generator = new UniqueID({
    returnNumber: false,
    machineID: 1,
});

export function generateID(): string {
    return generator.getUniqueID() as string;
}