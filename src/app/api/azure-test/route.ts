
import { msDatabase, azureConfig } from "../../../../backend";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        console.log('pass');
        const poolConnection = await msDatabase.connect(azureConfig);
        console.log('pass2')
        const resultSet = await poolConnection.request().query(`
            INSERT INTO first_table (column1, column2, column3)
                VALUES (12, 'else like', GETDATE());
                `);
        poolConnection.close();
        console.log(resultSet.recordset);
        return new NextResponse(JSON.stringify({ message: 'Data sent' }), {
            status: 200,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    } catch (e) {
        console.log(e);
        return new NextResponse(JSON.stringify({ error: 'GET request received' }), {
            status: 400,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    }
}