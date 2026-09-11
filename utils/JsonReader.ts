import * as fs from 'fs';

export class JsonReader {

    static read<T>(filePath: string): T {
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        return JSON.parse(fileContent) as T;
    }
}