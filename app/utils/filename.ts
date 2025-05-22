// Copyright 2025 Daniel Maas
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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