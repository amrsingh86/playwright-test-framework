import * as fs from 'fs';

export class JsonReader {

    static read(filePath: string): any {
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        return JSON.parse(fileContent);
    }
}