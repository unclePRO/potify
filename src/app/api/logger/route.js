import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
    const body = await request.json();
    const { url, method, ip, userAgent } = body;

    const timestamp = new Date().toISOString();
    const logLine = `${ip} - - [${timestamp}] "${method} ${url} HTTP/1.1" 200 - "-" "${userAgent}"\n`;

    const filePath = path.join(process.cwd(), 'potify-access.log');
  
    try {
        await fs.appendFile(filePath, logLine);
        return new Response('Logged', { status: 200 });
    } catch (error) {
        return new Response('Failed to write log', { status: 500 });
    }
}