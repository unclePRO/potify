import fs from 'fs';
import path from 'path';

let isCleaning = false; 

export async function enforceCacheLimit() {
    if (isCleaning) return;

    const limitGB = parseFloat(process.env.MAX_CACHE_GB || '50');
    const maxBytes = limitGB * 1024 * 1024 * 1024;
    const targetBytes = maxBytes * 0.9;

    const cacheDir = path.join(process.cwd(), 'audio_cache');
    if (!fs.existsSync(cacheDir)) return;

    try {
        isCleaning = true;
        
        const files = fs.readdirSync(cacheDir).map(filename => {
            const filePath = path.join(cacheDir, filename);
            const stats = fs.statSync(filePath);
            return {
                filePath,
                size: stats.size,
                lastAccessed: stats.atimeMs
            };
        });

        const totalSize = files.reduce((acc, file) => acc + file.size, 0);

        if (totalSize <= maxBytes) {
            isCleaning = false;
            return;
        }

        console.log(`Cache hit ${totalSize / 1e9}GB (Limit: ${limitGB}GB). Starting cleanup...`);

        files.sort((a, b) => a.lastAccessed - b.lastAccessed);

        let currentSize = totalSize;
        let deletedCount = 0;

        for (const file of files) {
            if (currentSize <= targetBytes) break;
            
            try {
                fs.unlinkSync(file.filePath);
                currentSize -= file.size;
                deletedCount++;
            } catch (err) {
                console.error(`Failed to delete old cache file: ${file.filePath}`);
            }
        }

        console.log(`Cleanup complete. Deleted ${deletedCount} old songs. New size: ${currentSize / 1e9}GB`);

    } catch (err) {
        console.error("Cache manager error:", err);
    } finally {
        isCleaning = false;
    }
}