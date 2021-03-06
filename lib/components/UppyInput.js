'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uppyUtils = require('uppy-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormInput = function (_Component) {
  _inherits(FormInput, _Component);

  function FormInput() {
    _classCallCheck(this, FormInput);

    var _this = _possibleConstructorReturn(this, (FormInput.__proto__ || Object.getPrototypeOf(FormInput)).call(this));

    _this.addFile = _this.addFile.bind(_this);
    return _this;
  }

  _createClass(FormInput, [{
    key: 'addFile',
    value: function addFile(event) {
      var _this2 = this;

      if (!this.props.addFile) {
        return 'Error: No addFile method provided!';
      }

      var files = Array.prototype.slice.call(event.target.files || [], 0);

      files.forEach(function (file) {
        _this2.props.addFile({
          name: file.name,
          type: file.type,
          data: file
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var propsToPass = {};

      // filtering out the addFile and children props to pass to our input element
      Object.keys(this.props).forEach(function (prop) {
        if (prop !== 'children' && prop !== 'addFile') {
          propsToPass[prop] = _this3.props[prop];
        }
      });
      return _react2.default.createElement('input', _extends({
        type: 'file',
        name: 'files[]'
      }, propsToPass, {
        onChange: this.addFile }));
    }
  }]);

  return FormInput;
}(_react.Component);

FormInput.propTypes = {
  addFile: _react.PropTypes.func.isRequired
};

module.exports = FormInput;