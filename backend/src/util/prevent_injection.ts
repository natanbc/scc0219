export function onlyStrings(...values: unknown[]): boolean {
    for(const v of values) {
        if(typeof v !== "string") {
            return false;
        }
    }
    return true;
}