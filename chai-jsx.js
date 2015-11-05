var reactElementToJSXString = require('react-element-to-jsx-string');

function chaiJsxPlugin(chai, utils) {
    chai.Assertion.addProperty('jsx', function () {
        utils.flag(this, 'jsx', true);
    })

    function equals(_super) {
        return function(value) {
            if (!utils.flag(this, 'jsx')) {
                return _super.apply(this, arguments);
            }

            // console.log(this._obj, value, utils.flag(this, 'jsx'));

            var actual = reactElementToJSXString(this._obj);
            var expected = reactElementToJSXString(value);

            return this.assert(
              expected === actual
            , "expected #{exp} to equal #{act}"
            , "expected #{exp} to not equal #{act}"
            , expected
            , actual
            , true
          );
        }
    }

    chai.Assertion.overwriteMethod('equals', equals);
    chai.Assertion.overwriteMethod('equal', equals);
    chai.Assertion.overwriteMethod('eq', equals);

    function removeIndentation(text) {
        return text.replace(/^[ \t]+/mg, '');
    }

    function include(self, value) {
        var actual = removeIndentation(reactElementToJSXString(self._obj));
        var expected = removeIndentation(reactElementToJSXString(value));

        return self.assert(
          actual.indexOf(expected) !== -1
        , "expected #{exp} to include #{act}"
        , "expected #{exp} to not include #{act}"
        , actual
        , expected
        , true
      );
    }

    function overwriteGetter(name) {
        const descriptor = Object.getOwnPropertyDescriptor(chai.Assertion.prototype, name);
        const _super = descriptor.get;
        Object.defineProperty(chai.Assertion.prototype, name, {
            get: function () {
                if (!utils.flag(this, 'jsx')) {
                    return _super.call(this);
                }
                return function (value) {
                    return include(this, value);
                };
            },
            set: descriptor.set,
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable
        });
    }
    overwriteGetter('include');
    overwriteGetter('contain');
    overwriteGetter('includes');
    overwriteGetter('contains');
}

module.exports = chaiJsxPlugin;
