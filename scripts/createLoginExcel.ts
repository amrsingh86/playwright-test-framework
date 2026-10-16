import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

const testData = [
    {
        username: 'standard_user',
        password: 'secret_sauce',
        expectedResult: 'success'
    },
    {
        username: 'locked_out_user',
        password: 'secret_sauce',
        expectedResult: 'locked'
    },
    {
        username: 'invalid_user',
        password: 'wrong_password',
        expectedResult: 'invalid'
    }
];

const worksheet = XLSX.utils.json_to_sheet(testData);

const workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook, worksheet, 'LoginData');

const directory = path.resolve('test-data/excel');

fs.mkdirSync(directory, { recursive: true });

XLSX.writeFile(
    workbook,
    path.join(directory, 'loginData.xlsx')
);

console.log('Excel test data created successfully');