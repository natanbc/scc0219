import { UniqueID } from "nodejs-snowflake";

const generator = new UniqueID({
    returnNumber: false,
    machineID: 1,
});

export function generateID(): string {
    return generator.getUniqueID() as string;
}

export function isValidID(id: string): boolean {
    try {
        BigInt(id);
        return true;
    } catch {
        return false;
    }
}