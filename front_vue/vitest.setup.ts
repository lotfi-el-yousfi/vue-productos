// vitest.setup.ts
import {vi} from 'vitest'

// Mock CSS imports
vi.stubGlobal('CSS', {})
// vitest.setup.ts
if (typeof ResizeObserver === 'undefined') {
    global.ResizeObserver = class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
}