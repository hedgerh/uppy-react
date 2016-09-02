'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uppyBase = require('uppy-base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function extend() {
  for (var _len = arguments.length, objs = Array(_len), _key = 0; _key < _len; _key++) {
    objs[_key] = arguments[_key];
  }

  return Object.assign.apply(this, [{}].concat(objs));
}

var UppyContainer = function (_Component) {
  _inherits(UppyContainer, _Component);

  function UppyContainer() {
    _classCallCheck(this, UppyContainer);

    var _this = _possibleConstructorReturn(this, (UppyContainer.__proto__ || Object.getPrototypeOf(UppyContainer)).call(this));

    _this.webcam = new _uppyBase.Webcam();

    _this.state = {
      files: [],
      webcam: {
        stream: null,
        start: _this.startWebcam(_this.webcam),
        stop: _this.stopWebcam(_this.webcam),
        takeSnapshot: _this.takeSnapshot(_this.webcam)
      }
    };

    // bind `this` to methods
    _this.addFile = _this.addFile.bind(_this);
    _this.auth = _this.auth.bind(_this);
    _this.getInitialProviderState = _this.getInitialProviderState.bind(_this);
    _this.getProviders = _this.getProviders.bind(_this);
    _this.getUploader = _this.getUploader.bind(_this);
    _this.list = _this.list.bind(_this);
    _this.logout = _this.logout.bind(_this);
    _this.removeFile = _this.removeFile.bind(_this);
    _this.startUpload = _this.startUpload.bind(_this);
    _this.checkServerProps = _this.checkServerProps.bind(_this);
    _this.startWebcam = _this.startWebcam.bind(_this);
    _this.stopWebcam = _this.stopWebcam.bind(_this);
    _this.takeSnapshot = _this.takeSnapshot.bind(_this);
    _this._update = _this._update.bind(_this);
    return _this;
  }

  _createClass(UppyContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var uploader = _props.uploader;
      var server = _props.server;

      this.uploader = this.getUploader(uploader);

      if (this.checkServerProps(server)) {
        var providers = server.providers;
        var host = server.host;


        this.providers = this.getProviders(providers, host);
        this.setState({
          providers: this.getInitialProviderState(this.providers)
        });
      }

      this.webcam.init();
    }

    /**
     * Initialization Helpers - Pretty boring stuff
     */

    /**
     * Creates a new instance of the given Uploader plugin.
     * @param  {Uploader} uploader  Uppy plugin of 'uploader' type
     * @param  {String}   endpoint  Target endpoint for file uploads
     * @return {Uploader}           Instance of given uploader plugin
     */

  }, {
    key: 'getUploader',
    value: function getUploader(uploader) {
      if (!uploader) {
        throw new Error('UppyContainer: Missing uploader prop.');
        return;
      }
      if (!uploader.use) {
        throw new Error('UppyContainer: No upload plugin provided to uploader.use prop');
        return;
      }

      if (!uploader.endpoint) {
        throw new Error('UppyContainer: No upload endpoint provided to uploader.endpoint prop');
        return;
      }

      var Uploader = uploader.use;

      // TODO: error check to make sure uploader is legit
      return new Uploader({
        endpoint: uploader.endpoint
      });
    }

    /**
     * Creates new Provider instances for each
     * given provider name.
     * @param  {Array<String>} providers  Provider names
     * @param  {String} host              Endpoint for Uppy Server
     * @return {Object}                   Provider instances
     */

  }, {
    key: 'getProviders',
    value: function getProviders(providers, host) {
      var _providers = {};

      providers.forEach(function (provider) {
        if (!_providers.hasOwnProperty(provider)) {
          _providers[provider] = new _uppyBase.Provider({
            provider: provider,
            host: host
          });
        }
      });

      return _providers;
    }

    /**
     * Generates an initial state for all of the given
     * provider plugins.
     * @param  {Object} providers Provider plugins
     * @return {Object}           Initial provider state
     */

  }, {
    key: 'getInitialProviderState',
    value: function getInitialProviderState(providers) {
      var _this2 = this;

      var initialState = {};

      if (providers) {
        Object.keys(providers).forEach(function (id) {
          var provider = providers[id];
          initialState[id] = {
            id: id,
            name: provider.name,
            files: [],
            authed: false,
            auth: _this2.auth(provider),
            list: _this2.list(provider),
            logout: _this2.logout(provider)
          };
        });
      }

      return initialState;
    }

    /**
     * Checks if valid server props have been provided.
     * @param  {[type]} server [description]
     * @return {[type]}        [description]
     */

  }, {
    key: 'checkServerProps',
    value: function checkServerProps(server) {
      if (!server) {
        return false;
      }

      if (!server.providers || !server.host) {
        return false;
      }

      return server.providers.length > 0 && typeof server.host === 'string';
    }

    /**
     * Uppy Server Provider Plugin Wrappers
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
      var _this3 = this;

      return function () {
        return provider.auth().then(function (authed) {
          _this3._update(provider.id, { authed: authed }, 'providers');
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
      var _this4 = this;

      return function (directory) {
        return provider.list(directory).then(function (data) {
          var files = _this4.procFiles(data);
          _this4._update(provider.id, files);
          return files;
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
      var _this5 = this;

      return function () {
        return provider.logout().then(function (result) {
          if (result.ok) {
            _this5._update(provider.id, {
              authed: false,
              files: [],
              folders: []
            });
          }

          return result;
        });
      };
    }

    /**
     * Webcam Plugin Wrappers
     */

    /**
     * Starts webcam and adds video stream to state.
     * @param  {Webcam} webcam Webcam plugin instance
     * @return {fn}            Wrapped start method
     */

  }, {
    key: 'startWebcam',
    value: function startWebcam(webcam) {
      var _this6 = this;

      return function () {
        return webcam.start().then(function (stream) {
          _this6._update('webcam', { stream: stream });
        });
      };
    }

    /**
     * Stops webcam and removes video stream from state.
     * @param  {Webcam} webcam  Webcam plugin instance
     * @return {fn}             Wrapped stop method
     */

  }, {
    key: 'stopWebcam',
    value: function stopWebcam(webcam) {
      var _this7 = this;

      return function () {
        return webcam.stop().then(function (result) {
          if (result.ok) {
            _this7._update('webcam', { stream: null });
          }
        });
      };
    }

    /**
     * Takes a snapshot from the webcam's video stream.
     * @param  {Webcam} webcam  Webcam plugin instance
     * @return {fn}             Wrapped takeSnapshot method
     */

  }, {
    key: 'takeSnapshot',
    value: function takeSnapshot(webcam) {
      return function () {};
    }

    /**
     * Wrapper for updating state, even state that is
     * nested.
     * @param  {String} key       State key to update
     * @param  {[type]} newState  Replaces old state at key
     * @param  {[type]} parentKey Key of parent if key is nested
     */

  }, {
    key: '_update',
    value: function _update(key, newState, parentKey) {
      // TODO: Make deep nested updates prettier
      // TODO: Make nested updates infinitely deep
      if (parentKey) {
        var parent = this.state[parentKey];
        var updatedState = extend(parent[key], newState);

        this.setState(_defineProperty({}, parentKey, extend(parent, _defineProperty({}, key, updatedState))));
      } else {
        var _updatedState = extend(this.state[key], newState);

        this.setState(_defineProperty({}, key, _updatedState));
      }
    }

    /**
     * Add a file to the upload queue.
     * @param {File} file
     */

  }, {
    key: 'addFile',
    value: function addFile(file) {
      var files = this.state.files;

      this.setState({
        files: files.concat([file])
      });
    }

    /**
     * Remove a file from the upload queue.
     * @param  {String} fileID
     */

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
      var propsToPass = extend(this.state, {
        addFile: this.addFile,
        removeFile: this.removeFile,
        startUpload: this.startUpload
      });
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.Children.map(this.props.children, function (child) {
          return _react2.default.cloneElement(child, propsToPass);
        })
      );
    }
  }]);

  return UppyContainer;
}(_react.Component);

UppyContainer.defaultProps = {};

UppyContainer.propTypes = {};

module.exports = UppyContainer;