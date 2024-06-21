/**
 * Hashes the given text using the given algorithm.
 *
 * @param algorithm The algorithm to use.
 * @param text The text to hash.
 * @returns A promise that resolves to the hash of the text.
 */
export function encodeText(algorithm: string, text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    return crypto.subtle.digest(algorithm, data).then((hash) =>
        // Convert ArrayBuffer to array of bytes
        Array.from(new Uint8Array(hash))
            // Convert bytes to hex string
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("")
    );
}

/**
 * Encodes the given password using SHA-256.
 *
 * @param password The password to encode.
 * @returns A promise that resolves to the encoded password.
 */
export function encodePassword(password: string): Promise<string> {
    return encodeText("SHA-256", password);
}
