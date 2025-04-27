// tests/setup.ts
import {config} from '@vue/test-utils';
import {createPinia} from 'pinia';
import {afterEach} from 'vitest';
import {mockReset} from 'vitest-mock-extended';

// Global Pinia instance
const pinia = createPinia();
config.global.plugins = [pinia];

// Reset all mocks after each test
afterEach(() => {
    mockReset();
});