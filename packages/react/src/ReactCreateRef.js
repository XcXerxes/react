/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 */

import type {RefObject} from 'shared/ReactTypes';

// an immutable object with a single mutable value
export function createRef(): RefObject {
  // 定义一个对象，里面只有current这个属性，用来赋值dom ref
  const refObject = {
    current: null,
  };
  if (__DEV__) {
    // 密封对象，阻止添加新属性，就是说除了 current 这个属性，不能添加任何属性了
    Object.seal(refObject);
  }
  return refObject;
}
