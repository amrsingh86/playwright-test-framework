
export class Logger {

    private static log(
        level: string,
        message: string
    ): void {
        const timestamp = new Date().toISOString();

        console.log(`[${timestamp}] [${level}] ${message}`);
    }

    // General information
    static info(message: string): void {
        this.log('INFO', message);
    }

    // Warning messages
    static warn(message: string): void {
        this.log('WARN', message);
    }

    // Error messages
    static error(message: string): void {
        this.log('ERROR', message);
    }

    // Detailed debugging messages
    static debug(message: string): void {
        this.log('DEBUG', message);
    }
}