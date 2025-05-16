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