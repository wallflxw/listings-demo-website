export function logError(text: string, errorText?: string) {
    const message = errorText ? `[ERROR] ${text}: ${errorText}` : `[ERROR] ${text}`;
    const padding = message.length + 4;
    const tBorder = "\x1b[31m┌" + "─".repeat(padding) + "┐\x1b[0m";
    const bBorder = "\x1b[31m└" + "─".repeat(padding) + "┘\x1b[0m";

    console.log(tBorder);
    console.log("\x1b[31m│ ", message, " │\x1b[0m");
    console.log(bBorder);
}