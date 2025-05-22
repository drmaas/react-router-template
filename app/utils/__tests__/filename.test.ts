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

import { getBaseFilename } from '../filename';

describe('getBaseFilename', () => {
  it('should remove the extension from a simple filename', () => {
    expect(getBaseFilename('my-api.yaml')).toBe('my-api');
    expect(getBaseFilename('document.pdf')).toBe('document');
    expect(getBaseFilename('image.png')).toBe('image');
  });

  it('should handle filenames with multiple dots', () => {
    expect(getBaseFilename('test.file.json')).toBe('test.file');
    expect(getBaseFilename('my.complex.file.name.txt')).toBe('my.complex.file.name');
  });

  it('should handle filenames without extension', () => {
    expect(getBaseFilename('README')).toBe('README');
    expect(getBaseFilename('dockerfile')).toBe('dockerfile');
  });

  it('should handle filenames starting with a dot', () => {
    expect(getBaseFilename('.env')).toBe('.env');
    expect(getBaseFilename('.gitignore')).toBe('.gitignore');
  });

  it('should handle empty string', () => {
    expect(getBaseFilename('')).toBe('');
  });
}); 