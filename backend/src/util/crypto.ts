import { randomBytes, scryptSync } from "crypto"

export function hashPassword(password: string): string {
    const salt = randomBytes(32).toString("hex");
    const hash = scryptSync(password, salt, 64).toString("hex");
    return `${salt}:${hash}`;
}

export function verifyPassword(password: string, hash: string): boolean {
    const [salt, correctHash] = hash.split(":");
    if(!salt || !correctHash) throw new Error("Invalid password hash");
    return scryptSync(password, salt, 64).toString("hex") === correctHash;
}
