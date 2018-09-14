'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var preact = require('preact');

function createEmitter(initialValue, bitmaskFactory) {
  var registeredUpdaters = [];
  var value = initialValue;
  return {
    register: function (updater) {
      registeredUpdaters.push(updater);
      updater(value, 0);
    },
    unregister: function (updater) {
      registeredUpdaters = registeredUpdaters.filter(function (i) { return i !== updater; });
    },
    val: function (newValue) {
      if (newValue === undefined || newValue == value) {
        return value;
      }
      var diff = bitmaskFactory(value, newValue);
      diff = diff |= 0;
      value = newValue;
      registeredUpdaters.forEach(function (up) { return up(newValue, diff); });
      return value;
    }
  };
}
var noopEmitter = {
  register: function (_) {
    console.warn("Consumer used without a Provider");
  },
  unregister: function (_) {
    // do nothing
  },
  val: function (_) {
    //do nothing;
  }
};

/*
 * Extracts the children from the props and returns an object containing the
 * only element of the given array (preact always passes children as an array)
 * or null otherwise. The result contains always a reference to the original
 * array of children
 *
 * @param {RenderableProps<*>} props - the component's properties
 * @return {{ child: JSX.Element | null, children: JSX.Element[]}}
 */
function getOnlyChildAndChildren(props) {
  var children = props.children;
  var child = children.length === 1 ? children[0] : null;
  return { child: child, children: children };
}

var __extends = (global && global.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
function getRenderer(props) {
  var child = getOnlyChildAndChildren(props).child;
  return child || props.render;
}
var MAX_SIGNED_31_BIT_INT = 1073741823;
var defaultBitmaskFactory = function () { return MAX_SIGNED_31_BIT_INT; };
var ids = 0;
function _createContext(value, bitmaskFactory) {
  var key = "_preactContextProvider-" + ids++;
  var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider(props) {
      var _this = _super.call(this, props) || this;
      _this._emitter = createEmitter(props.value, bitmaskFactory || defaultBitmaskFactory);
      return _this;
    }
    Provider.prototype.getChildContext = function () {
      var _a;
      return _a = {}, _a[key] = this._emitter, _a;
    };
    Provider.prototype.componentDidUpdate = function () {
      this._emitter.val(this.props.value);
    };
    Provider.prototype.render = function () {
      var _a = getOnlyChildAndChildren(this.props), child = _a.child, children = _a.children;
      if (child) {
        return child;
      }
      // preact does not support fragments,
      // therefore we wrap the children in a group
      return preact.h("g", null, children);
    };
    return Provider;
  }(preact.Component));
  var Consumer = /** @class */ (function (_super) {
    __extends(Consumer, _super);
    function Consumer(props, ctx) {
      var _this = _super.call(this, props, ctx) || this;
      _this._updateContext = function (value, bitmask) {
        var unstable_observedBits = _this.props.unstable_observedBits;
        var observed = unstable_observedBits === undefined || unstable_observedBits === null
          ? MAX_SIGNED_31_BIT_INT
          : unstable_observedBits;
        observed = observed | 0;
        if ((observed & bitmask) === 0) {
          return;
        }
        _this.setState({ value: value });
      };
      _this.state = { value: _this._getEmitter().val() || value };
      return _this;
    }
    Consumer.prototype.componentDidMount = function () {
      this._getEmitter().register(this._updateContext);
    };
    Consumer.prototype.shouldComponentUpdate = function (nextProps, nextState) {
      return (this.state.value !== nextState.value ||
        getRenderer(this.props) !== getRenderer(nextProps));
    };
    Consumer.prototype.componentWillUnmount = function () {
      this._getEmitter().unregister(this._updateContext);
    };
    Consumer.prototype.componentDidUpdate = function (_, __, prevCtx) {
      var previousProvider = prevCtx[key];
      if (previousProvider === this.context[key]) {
        return;
      }
      (previousProvider || noopEmitter).unregister(this._updateContext);
      this.componentDidMount();
    };
    Consumer.prototype.render = function () {
      var render = this.props.render;
      var r = getRenderer(this.props);
      if (render && render !== r) {
        console.warn("Both children and a render function are defined. Children will be used");
      }
      if (typeof r === "function") {
        return r(this.state.value || value);
      }
      console.warn("Consumer is expecting a function as one and only child but didn't find any");
    };
    Consumer.prototype._getEmitter = function () {
      return this.context[key] || noopEmitter;
    };
    return Consumer;
  }(preact.Component));
  return {
    Provider: Provider,
    Consumer: Consumer
  };
}
var createContext = _createContext;

exports.default = _createContext;
exports.createContext = createContext;
