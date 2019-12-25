/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ReactVersion from 'shared/ReactVersion';
import { // symbols变量
  REACT_FRAGMENT_TYPE,
  REACT_PROFILER_TYPE,
  REACT_STRICT_MODE_TYPE,
  REACT_SUSPENSE_TYPE,
  REACT_SUSPENSE_LIST_TYPE,
} from 'shared/ReactSymbols';

import {Component, PureComponent} from './ReactBaseClasses';
// 创建一个能够通过 ref 属性附加到 React 元素的 ref。
// eg: this.inputRef = createRef()  <input ref={this.inputRef}>
import {createRef} from './ReactCreateRef';
import {forEach, map, count, toArray, only} from './ReactChildren';
import {
  createElement,
  createFactory,
  cloneElement,
  isValidElement,
  jsx,
} from './ReactElement';
import {createContext} from './ReactContext';
import {lazy} from './ReactLazy';
import forwardRef from './forwardRef';
import memo from './memo';
import {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useDebugValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useResponder,
  useTransition,
  useDeferredValue,
} from './ReactHooks';
import {withSuspenseConfig} from './ReactBatchConfig';
import {
  createElementWithValidation,
  createFactoryWithValidation,
  cloneElementWithValidation,
  jsxWithValidation,
  jsxWithValidationStatic,
  jsxWithValidationDynamic,
} from './ReactElementValidator';
import ReactSharedInternals from './ReactSharedInternals';
import createFundamental from 'shared/createFundamentalComponent';
import createResponder from 'shared/createEventResponder';
import createScope from 'shared/createScope';
import {
  enableJSXTransformAPI,
  enableFlareAPI,
  enableFundamentalAPI,
  enableScopeAPI,
  exposeConcurrentModeAPIs,
} from 'shared/ReactFeatureFlags';
const React = {
  // 子集包含 map, forEach, count, toArray, only方法
  Children: {
    map,
    forEach,
    count,
    toArray,
    only,
  },

  createRef, // 创建dom
  Component, // 组件
  PureComponent, // 纯组件

  createContext, // 创建上下文
  forwardRef, // 转发refs
  lazy,      // 异步组件
  memo,    // 类似于 PureComponent 用在函数组件中 提高性能

  useCallback, // hook
  useContext,
  useEffect,
  useImperativeHandle,
  useDebugValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,

  Fragment: REACT_FRAGMENT_TYPE, // 节点片段，不是真实的DOM
  Profiler: REACT_PROFILER_TYPE, // 测试组件的渲染性能
  StrictMode: REACT_STRICT_MODE_TYPE, // 严格模式
  Suspense: REACT_SUSPENSE_TYPE, // 让你的组件在渲染之前进行“等待”，并在等待时显示 fallback 的内容。

  createElement: __DEV__ ? createElementWithValidation : createElement, // 创建元素
  cloneElement: __DEV__ ? cloneElementWithValidation : cloneElement, // 克隆元素
  createFactory: __DEV__ ? createFactoryWithValidation : createFactory, // 生成指定类型的函数组件 已废弃
  isValidElement: isValidElement, // 验证是否是一个 react 组件

  version: ReactVersion, // react 的版本

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals,
};

if (exposeConcurrentModeAPIs) { // 实验性的api
  React.useTransition = useTransition;
  React.useDeferredValue = useDeferredValue;
  React.SuspenseList = REACT_SUSPENSE_LIST_TYPE;
  React.unstable_withSuspenseConfig = withSuspenseConfig;
}

if (enableFlareAPI) {
  React.unstable_useResponder = useResponder;
  React.unstable_createResponder = createResponder;
}

if (enableFundamentalAPI) {
  React.unstable_createFundamental = createFundamental;
}

if (enableScopeAPI) {
  React.unstable_createScope = createScope;
}

// Note: some APIs are added with feature flags.
// Make sure that stable builds for open source
// don't modify the React object to avoid deopts.
// Also let's not expose their names in stable builds.

if (enableJSXTransformAPI) {
  if (__DEV__) {
    // 开发模式带验证的
    React.jsxDEV = jsxWithValidation;
    React.jsx = jsxWithValidationDynamic;
    React.jsxs = jsxWithValidationStatic;
  } else {
    React.jsx = jsx;
    // we may want to special case jsxs internally to take advantage of static children.
    // for now we can ship identical prod functions
    React.jsxs = jsx;
  }
}

export default React;
