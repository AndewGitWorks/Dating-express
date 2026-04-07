import crypto from "crypto";

function checkTelegramAuth(data: string, botToken: string) {
    const secret = crypto
        .createHash("sha256")
        .update(botToken)
        .digest();

    const params = new URLSearchParams(data);
    const hash = params.get("hash");
    params.delete("hash");

    const sorted = [...params.entries()]
        .sort()
        .map(([key, val]) => `${key}=${val}`)
        .join("\n");

    const hmac = crypto
        .createHmac("sha256", secret)
        .update(sorted)
        .digest("hex");

    return hmac === hash;
}
export default checkTelegramAuth;