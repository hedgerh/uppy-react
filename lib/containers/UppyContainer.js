'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uppyBase = require('uppy-base');

var _extend2 = require('../utils/extend');

var _extend3 = _interopRequireDefault(_extend2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UppyContainer = function (_Component) {
  _inherits(UppyContainer, _Component);

  function UppyContainer(props, context) {
    _classCallCheck(this, UppyContainer);

    var _this = _possibleConstructorReturn(this, (UppyContainer.__proto__ || Object.getPrototypeOf(UppyContainer)).call(this, props, context));

    _this.addFile = _this.addFile.bind(_this);
    _this.auth = _this.auth.bind(_this);
    _this.getInitialProviderState = _this.getInitialProviderState.bind(_this);
    _this.getUploader = _this.getUploader.bind(_this);
    _this.list = _this.list.bind(_this);
    _this.logout = _this.logout.bind(_this);
    _this.removeFile = _this.removeFile.bind(_this);
    _this.startUpload = _this.startUpload.bind(_this);
    _this.validServerProps = _this.validServerProps.bind(_this);
    _this.startWebcam = _this.startWebcam.bind(_this);
    _this.stopWebcam = _this.stopWebcam.bind(_this);
    _this.takeSnapshot = _this.takeSnapshot.bind(_this);
    _this.setIn = _this.setIn.bind(_this);

    _this.state = _this.getInitialState();
    return _this;
  }

  _createClass(UppyContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'getInitialState',
    value: function getInitialState() {
      var sourceState = {};

      this.props.sources.forEach(function (source) {
        if (sourceState.hasOwnProperty(source.id)) {
          throw new Error('Duplicate source ids for ' + source.id);
        }

        sourceState[source.id] = source.getInitialState();
      });

      return {
        files: [],
        sources: sourceState
      };
    }

    // Initialization Helpers

    /**
     * Creates a new instance of the given Uploader plugin.
     * @param  {Uploader} uploader  Uppy plugin of 'uploader' type
     * @param  {String}   endpoint  Target endpoint for file uploads
     * @return {Uploader}           Instance of given uploader plugin
     */

  }, {
    key: 'getUploader',
    value: function getUploader(uploader) {}

    /**
     * Checks if valid server props have been provided.
     * @param  {[type]} server [description]
     * @return {[type]}        [description]
     */

  }, {
    key: 'validServerProps',
    value: function validServerProps(server) {
      if (!server) {
        return false;
      }
      if (!server.providers || !server.host) {
        return false;
      }
      return server.providers.length > 0 && typeof server.host === 'string';
    }

    /**
     * Uppy Server Helper Methods
     */
    /**
     * Checks authentication status of user with given provider.
     * Wraps Provider's `auth` method to handle updating state after calling.
     * after calling.  
     * Wrapped method is passed down to user as props.
     * @param  {Provider} provider Provider plugin
     * @return {fn}                Wrapped auth fn
     */

  }, {
    key: 'auth',
    value: function auth(provider) {
      var _this2 = this;

      return function () {
        return provider.auth().then(function (authed) {
          _this2.setIn(provider.id, { authed: authed }, 'sources');
          return authed;
        });
      };
    }

    /**
     * Fetches a list of files from provider.
     * Wraps Provider's `list` method to handle updating state after calling.
     * Wrapped method is passed down to user as props.
     * @param  {Provider} provider Provider plugin
     * @return {fn}                Wrapped auth fn
     */

  }, {
    key: 'list',
    value: function list(provider) {
      var _this3 = this;

      return function (directory) {
        return provider.list(directory).then(function (data) {
          console.log(data);
          // const files = this.processFiles(data)
          _this3.setIn(provider.id, { files: data.items }, 'sources');
          return data;
        });
      };
    }

    /**
     * Logs user out of given provider.
     * Wraps Provider's `logout` method to handle updating state after calling.
     * Wrapped method is passed down to user as props.
     * @param  {Provider} provider Provider plugin
     * @return {fn}                Wrapped auth fn
     */

  }, {
    key: 'logout',
    value: function logout(provider) {
      var _this4 = this;

      return function () {
        return provider.logout().then(function (result) {
          if (result.ok) {
            _this4.setIn(provider.id, {
              authed: false,
              files: [],
              folders: []
            }, 'sources');
          }

          return result;
        });
      };
    }

    /**
     * Wrapper for updating state, even state that is
     * nested.
     * @param  {String} key       State key to update
     * @param  {[type]} newState  Replaces old state at key
     * @param  {[type]} parentKey Key of parent if key is nested
     */

  }, {
    key: 'setIn',
    value: function setIn(key, newState, parentKey) {
      // TODO: Make deep nested updates prettier
      // TODO: Make nested updates infinitely deep
      if (parentKey) {
        var parent = this.state[parentKey];
        var updatedState = (0, _extend3.default)(parent[key], newState);

        this.setState(_defineProperty({}, parentKey, (0, _extend3.default)(parent, _defineProperty({}, key, updatedState))));
      } else {
        var _updatedState = (0, _extend3.default)(this.state[key], newState);

        this.setState(_defineProperty({}, key, _updatedState));
      }
    }

    /**
     * Start uploading the files in queue.
     * @return {Promise} Resolves when all uploads are completed.
     */

  }, {
    key: 'startUpload',
    value: function startUpload() {
      return this.uploader.start(this.state.files);
    }
  }, {
    key: 'render',
    value: function render() {
      if (_react2.default.Children.count(this.props.children) > 1) {
        throw new Error('Uppy: UppyContainer should have no more than one child.');
        return;
      }

      var uppyProps = (0, _extend3.default)(this.state, {
        addFile: this.addFile,
        removeFile: this.removeFile,
        startUpload: this.startUpload
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.Children.map(this.props.children, function (child) {
          return _react2.default.cloneElement(child, { uppy: uppyProps });
        })
      );
    }
  }]);

  return UppyContainer;
}(_react.Component);

UppyContainer.defaultProps = {};

UppyContainer.propTypes = {};

module.exports = UppyContainer;