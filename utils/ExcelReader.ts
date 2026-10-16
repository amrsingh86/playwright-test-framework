
import * as XLSX from 'xlsx';

export class ExcelReader {

    static readExcel<T extends object>(
        filePath: string,
        sheetName: string
    ): T[] {

        // Open the Excel workbook
        const workbook = XLSX.readFile(filePath);

        // Select the requested worksheet
        const worksheet = workbook.Sheets[sheetName];

        if (!worksheet) {
            throw new Error(
                `Sheet "${sheetName}" not found in ${filePath}`
            );
        }

        // Convert rows to an array of objects
        return XLSX.utils.sheet_to_json<T>(worksheet, {
            defval: ''
        });
    }
}