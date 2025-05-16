/// <reference types="jest" />
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import 'whatwg-fetch'; //need to import this to make fetch work

// Define types for the mock matchMedia function
type MediaQueryList = {
  matches: boolean;
  media: string;
  onchange: null;
  addListener: jest.Mock;
  removeListener: jest.Mock;
  addEventListener: jest.Mock;
  removeEventListener: jest.Mock;
  dispatchEvent: jest.Mock;
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;

  constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
    this.root = options.root instanceof Element ? options.root : null;
    this.rootMargin = options.rootMargin ?? '0px';
    this.thresholds = this.parseThresholds(options.threshold ?? 0);
  }

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] { return []; }

  private parseThresholds(threshold: number | number[]): number[] {
    const array = Array.isArray(threshold) ? threshold : [threshold];
    return array.sort();
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver
}); 