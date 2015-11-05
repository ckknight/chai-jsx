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

            var expected = reactElementToJSXString(this._obj);
            var actual = reactElementToJSXString(value);

            this.assert(
              expected === actual
            , "expected #{exp} to equal #{act}"
            , "expected #{exp} to not equal #{act}"
            , actual
            , expected
            , true
          );
        }
    }

    chai.Assertion.overwriteMethod('equals', equals);
    chai.Assertion.overwriteMethod('equal', equals);
    chai.Assertion.overwriteMethod('eq', equals);
}

module.exports = chaiJsxPlugin;
