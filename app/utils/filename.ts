/**
 * Extracts the base filename without extension from a given filename
 * @param filename The full filename including extension
 * @returns The filename without extension
 * @example
 * getBaseFilename('my-api.yaml') // returns 'my-api'
 * getBaseFilename('test.file.json') // returns 'test.file'
 * getBaseFilename('.env') // returns '.env'
 */
export function getBaseFilename(filename: string): string {
    if (!filename) return '';
    // If the file starts with a dot and has no other dots, return as is
    if (filename.startsWith('.') && filename.indexOf('.', 1) === -1) {
        return filename;
    }
    // Remove the last extension
    return filename.replace(/\.[^/.]+$/, '');
} 