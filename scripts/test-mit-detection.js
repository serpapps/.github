#!/usr/bin/env node

/**
 * Test suite for MIT license detection logic
 */

const { isMITLicense } = require('./live-mit-license-scanner.js');

function test(name, condition) {
  console.log(`${condition ? '✅' : '❌'} ${name}`);
  return condition;
}

// Test data
const testLicenses = {
  mitLicense: `MIT License

Copyright (c) 2024 Test Company

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,

  apacheLicense: `Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.

"License" shall mean the terms and conditions for use, reproduction,
and distribution as defined by Sections 1 through 9 of this document.`,

  iscLicense: `ISC License

Copyright (c) 2024, Test

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS.`,

  gplLicense: `GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) 2007 Free Software Foundation, Inc.
Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.`,

  emptyString: '',
  nullValue: null
};

console.log('🧪 Testing MIT License Detection Logic\n');

// Test MIT license detection
const mitResult = isMITLicense(testLicenses.mitLicense);
test('Detects MIT license correctly', mitResult.isMIT === true);
test('MIT license has high confidence', mitResult.confidence >= 0.8);
test('MIT license finds multiple indicators', mitResult.foundIndicators.length >= 3);

// Test non-MIT licenses
const apacheResult = isMITLicense(testLicenses.apacheLicense);
test('Apache license not detected as MIT', apacheResult.isMIT === false);

const iscResult = isMITLicense(testLicenses.iscLicense);
test('ISC license not detected as MIT', iscResult.isMIT === false);

const gplResult = isMITLicense(testLicenses.gplLicense);
test('GPL license not detected as MIT', gplResult.isMIT === false);

// Test edge cases
const emptyResult = isMITLicense(testLicenses.emptyString);
test('Empty string not detected as MIT', emptyResult.isMIT === false);

const nullResult = isMITLicense(testLicenses.nullValue);
test('Null value not detected as MIT', nullResult.isMIT === false);

console.log('\n📊 Test Results Summary:');
console.log(`   MIT license confidence: ${(mitResult.confidence * 100).toFixed(1)}%`);
console.log(`   MIT indicators found: ${mitResult.foundIndicators.length}`);
console.log(`   Apache license confidence: ${(apacheResult.confidence * 100).toFixed(1)}%`);
console.log(`   ISC license confidence: ${(iscResult.confidence * 100).toFixed(1)}%`);
console.log(`   GPL license confidence: ${(gplResult.confidence * 100).toFixed(1)}%`);

console.log('\n✅ All tests completed!');