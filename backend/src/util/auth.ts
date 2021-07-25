import { createSecretKey } from "crypto"
import { SignJWT } from "jose/jwt/sign"
import { jwtVerify } from "jose/jwt/verify"
import { jwtSecret } from "../env.js";

const secretKey = createSecretKey(Buffer.from(jwtSecret, "hex"))

export async function createToken(email: string): Promise<string> {
    return await new SignJWT({ email })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .sign(secretKey)
}

export async function verifyToken(token: string): Promise<string> {
    const res = await jwtVerify(token, secretKey);
    return res.payload["email"] as string;
}
