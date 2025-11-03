import crypto from "crypto";

const SECRET = "JOSHUA-SECRET-API-KEY";

export const random = () => crypto.randomBytes(128).toString("hex");
export const authentication = (salt: string| null | undefined, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
}