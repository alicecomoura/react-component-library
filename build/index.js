'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = "* {\n  font-family: 'Arial', sans-serif; }\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  outline: 0; }\n\n.button {\n  background-color: #ffffff;\n  padding: 16px;\n  width: 360px;\n  text-align: center;\n  border-radius: 6px;\n  border: none;\n  font-weight: 600; }\n  .button.button-default {\n    background-color: #ffffff;\n    color: #000; }\n  .button.button-disabled {\n    background-color: #D5D5D5;\n    color: white; }\n  .button.button-warning {\n    background-color: #faa300;\n    color: white; }\n  .button.button-danger {\n    background-color: #ff675c;\n    color: white; }\n  .button.button-success {\n    background-color: #3fc8bd;\n    color: white; }\n";
styleInject(css_248z$1);

var Button = function (_a) {
    var theme = _a.theme, children = _a.children;
    return (React__default["default"].createElement("button", { "data-testid": "button", className: "button button-".concat(theme) }, children));
};

var css_248z = "* {\n  font-family: 'Arial', sans-serif; }\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  outline: 0; }\n\n.input {\n  background-color: #ffffff;\n  padding: 16px;\n  width: 360px;\n  text-align: center;\n  border-radius: 6px;\n  border: none;\n  font-weight: 600; }\n  .input.input-default {\n    background-color: #ffffff;\n    color: #000; }\n  .input.input-disabled {\n    background-color: #D5D5D5;\n    color: white; }\n  .input.input-warning {\n    background-color: #faa300;\n    color: white; }\n  .input.input-danger {\n    background-color: #ff675c;\n    color: white; }\n  .input.input-success {\n    background-color: #3fc8bd;\n    color: white; }\n";
styleInject(css_248z);

var Input = function (_a) {
    var theme = _a.theme, type = _a.type, placeholder = _a.placeholder;
    return (React__default["default"].createElement("input", { "data-testid": "input", className: "input input-".concat(theme), type: type, placeholder: placeholder }));
};

exports.Button = Button;
exports.Input = Input;
//# sourceMappingURL=index.js.map
