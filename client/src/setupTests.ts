import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Cast Node.js versions to expected DOM types
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder as unknown as typeof global.TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;
}
