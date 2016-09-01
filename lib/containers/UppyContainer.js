'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UppyContainer = function (_Component) {
  _inherits(UppyContainer, _Component);

  function UppyContainer() {
    _classCallCheck(this, UppyContainer);

    var _this = _possibleConstructorReturn(this, (UppyContainer.__proto__ || Object.getPrototypeOf(UppyContainer)).call(this));

    _this.state = {
      files: []
    };

    _this.addFile = _this.addFile.bind(_this);
    _this.removeFile = _this.removeFile.bind(_this);
    _this.startUpload = _this.startUpload.bind(_this);
    return _this;
  }

  _createClass(UppyContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var uploader = _props.uploader;
      var endpoint = _props.endpoint;


      if (!uploader || !endpoint) {
        console.log('ERROR: Uploader or endpoint not defined');
        return;
      }

      var Uploader = uploader;
      this.uploader = new Uploader({ endpoint: endpoint });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.uploader !== this.props.uploader) {
        this.uploader = new Uploader({
          endpoint: nextProps.endpoint
        });
      }

      if (nextProps.endpoint !== this.props.endpoint) {
        this.uploader.opts.endpoint = nextProps.endpoint;
      }
    }
  }, {
    key: 'addFile',
    value: function addFile(file) {
      var files = this.state.files;

      this.setState({
        files: files.concat([file])
      });
    }
  }, {
    key: 'removeFile',
    value: function removeFile(fileID) {
      var filteredFiles = this.state.files.filter(function (file) {
        return file.id !== fileID;
      });

      this.setState({
        files: filteredFiles
      });
    }
  }, {
    key: 'startUpload',
    value: function startUpload() {
      this.uploader.start(this.state.files);
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      var propsToPass = {
        files: this.state.files,
        addFile: this.addFile,
        removeFile: this.removeFile,
        startUpload: this.startUpload
      };
      console.log(_react2.default.Children.map(children, function (child) {
        return _react2.default.cloneElement(child, propsToPass);
      }));
      return (
        // probably should only allow this.props.children.length === 1
        _react2.default.createElement(
          'div',
          null,
          children.length > 1 ? _react2.default.Children.map(this.props.children, function (child) {
            return _react2.default.cloneElement(child, propsToPass);
          }) : _react2.default.cloneElement(children, propsToPass)
        )
      );
    }
  }]);

  return UppyContainer;
}(_react.Component);

UppyContainer.defaultProps = {};

UppyContainer.propTypes = {};

module.exports = UppyContainer;
//# sourceMappingURL=UppyContainer.js.map