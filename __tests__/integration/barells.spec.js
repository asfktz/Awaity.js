/* eslint-disable no-unused-vars */

import config from '../../config';

import * as regular from '../../packages/awaity';
import * as fp from '../../packages/awaity/fp';
import * as regularES from '../../packages/awaity/esm';
import * as fpES from '../../packages/awaity/esm/fp';

const regularCJS = require('../../packages/awaity');
const fpCJS = require('../../packages/awaity/fp');

const moduleNames = config.definitions.map(([name]) => name);

test('commonjs, regular build ', () => {
  expect(Object.keys(regular)).toEqual(moduleNames);
  expect(Object.keys(fp)).toEqual(moduleNames);
  expect(Object.keys(regularES)).toEqual(moduleNames);
  expect(Object.keys(fpES)).toEqual(moduleNames);
  expect(Object.keys(fpES)).toEqual(moduleNames);
  expect(Object.keys(regularCJS)).toEqual(moduleNames);
  expect(Object.keys(fpCJS)).toEqual(moduleNames);
  expect(Object.keys(regularCJS)).toEqual(moduleNames);
  expect(Object.keys(fpCJS)).toEqual(moduleNames);
});

