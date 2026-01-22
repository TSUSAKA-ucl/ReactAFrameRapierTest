import { dirname } from 'path';
console.log("This is a test module.");
console.log(import.meta.url);
console.log(dirname(import.meta.url));
