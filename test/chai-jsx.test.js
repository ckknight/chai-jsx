var chai = require('chai');
var chaiJsx = require('..');

var React = require('react');

var expect = chai.expect;

chai.use(chaiJsx);

describe('chai-jsx', function () {
    describe('html components', function () {
        describe('that are the same', function () {
            it('passes', function () {
                var x = React.createElement("div", { className: "box", width: 5, height: 10 });
                var y = React.createElement("div", { className: "box", width: 5, height: 10 });
                expect(x).jsx.to.equal(y);
            });
        });
        describe('that have different prop values', function () {
            it('fails', function () {
                var x = React.createElement("div", { className: "box", width: 5, height: 10 });
                var y = React.createElement("div", { className: "non-box", width: 10, height: 5 });
                expect(x).jsx.to.not.equal(y);
            });
        });
        describe('that have different prop keys', function () {
            it('fails', function () {
                var x = React.createElement("div", { className: "box", width: 5 });
                var y = React.createElement("div", { className: "box", height: 5 });
                expect(x).jsx.to.not.equal(y);
            });
        });
        describe('that have different tags', function () {
            it('fails', function () {
                var x = React.createElement("div", { className: "box", width: 5, height: 10 });
                var y = React.createElement("span", { className: "box", width: 5, height: 10 });
                expect(x).jsx.to.not.equal(y);
            });
        });
        describe('that have same text content', function () {
            it('passes', function () {
                var x = React.createElement("div", { className: "box", width: 5, height: 10 }, 'Alpha');
                var y = React.createElement("div", { className: "box", width: 5, height: 10 }, 'Alpha');
                expect(x).jsx.to.equal(y);
            });
        });
        describe('that have different text content', function () {
            it('fails', function () {
                var x = React.createElement("div", { className: "box", width: 5, height: 10 }, 'Alpha');
                var y = React.createElement("div", { className: "box", width: 5, height: 10 }, 'Bravo');
                expect(x).jsx.to.not.equal(y);
            });
        });
        describe('that have same html content', function () {
            it('passes', function () {
                var x = React.createElement("div", { className: "box", width: 5, height: 10 }, React.createElement("span"));
                var y = React.createElement("div", { className: "box", width: 5, height: 10 }, React.createElement("span"));
                expect(x).jsx.to.equal(y);
            });
        });
        describe('that have different html content', function () {
            it('fails', function () {
                var x = React.createElement("div", { className: "box", width: 5, height: 10 }, React.createElement("span", { className: 'alpha' }));
                var y = React.createElement("div", { className: "box", width: 5, height: 10 }, React.createElement("span", { className: 'bravo' }));
                expect(x).jsx.to.not.equal(y);
            });
        });
    });

    describe('functional components', function () {
        describe('that are the same', function () {
            it('passes', function () {
                function Box() {}
                var x = React.createElement(Box, { value: 1 });
                var y = React.createElement(Box, { value: 1 });
                expect(x).jsx.to.equal(y);
            });
        });
        describe('that have different prop values', function () {
            it('fails', function () {
                function Box() {}
                var x = React.createElement(Box, { value: 1 });
                var y = React.createElement(Box, { value: 2 });
                expect(x).jsx.to.not.equal(y);
            });
        });
        describe('that have different prop keys', function () {
            it('fails', function () {
                function Box() {}
                var x = React.createElement(Box, { value: 1 });
                var y = React.createElement(Box, { other: 1 });
                expect(x).jsx.to.not.equal(y);
            });
        });
        describe('that have different components', function () {
            it('fails', function () {
                function Box() {}
                function OtherBox() {}
                var x = React.createElement(Box, { value: 1 });
                var y = React.createElement(OtherBox, { value: 1 });
                expect(x).jsx.to.not.equal(y);
            });
        });
        describe('that have same text content', function () {
            it('passes', function () {
                function Box() {}
                var x = React.createElement(Box, {}, 'Alpha');
                var y = React.createElement(Box, {}, 'Alpha');
                expect(x).jsx.to.equal(y);
            });
        });
        describe('that have different text content', function () {
            it('fails', function () {
                function Box() {}
                var x = React.createElement(Box, {}, 'Alpha');
                var y = React.createElement(Box, {}, 'Bravo');
                expect(x).jsx.to.not.equal(y);
            });
        });
        describe('that have same child', function () {
            it('passes', function () {
                function Parent() {}
                function Child() {}
                var x = React.createElement(Parent, {}, React.createElement(Child));
                var y = React.createElement(Parent, {}, React.createElement(Child));
                expect(x).jsx.to.equal(y);
            });
        });
        describe('that have a different child each', function () {
            it('passes', function () {
                function Parent() {}
                function Child1() {}
                function Child2() {}
                var x = React.createElement(Parent, {}, React.createElement(Child1));
                var y = React.createElement(Parent, {}, React.createElement(Child2));
                expect(x).jsx.to.not.equal(y);
            });
        });
        describe('that have same children', function () {
            it('passes', function () {
                function Parent() {}
                function Child1() {}
                function Child2() {}
                function Child3() {}
                var x = React.createElement(Parent, {},
                    React.createElement(Child1), React.createElement(Child2), React.createElement(Child3));
                var y = React.createElement(Parent, {},
                    React.createElement(Child1), React.createElement(Child2), React.createElement(Child3));
                expect(x).jsx.to.equal(y);
            });
        });
        describe('that have same children in different order', function () {
            it('fails', function () {
                function Parent() {}
                function Child1() {}
                function Child2() {}
                function Child3() {}
                var x = React.createElement(Parent, {},
                    React.createElement(Child1), React.createElement(Child2), React.createElement(Child3));
                var y = React.createElement(Parent, {},
                    React.createElement(Child1), React.createElement(Child3), React.createElement(Child2));
                expect(x).jsx.to.not.equal(y);
            });
        });
        describe('that have same children with props', function () {
            it('passes', function () {
                function Parent() {}
                function Child() {}
                function Child() {}
                function Child() {}
                var x = React.createElement(Parent, {},
                    React.createElement(Child, { value: 1 }), React.createElement(Child, { value: 2 }), React.createElement(Child, { value: 3 }));
                var y = React.createElement(Parent, {},
                    React.createElement(Child, { value: 1 }), React.createElement(Child, { value: 2 }), React.createElement(Child, { value: 3 }));
                expect(x).jsx.to.equal(y);
            });
        });
        describe('that have same children with different props', function () {
            it('fails', function () {
                function Parent() {}
                function Child() {}
                function Child() {}
                function Child() {}
                var x = React.createElement(Parent, {},
                    React.createElement(Child, { value: 1 }), React.createElement(Child, { value: 2 }), React.createElement(Child, { value: 3 }));
                var y = React.createElement(Parent, {},
                    React.createElement(Child, { value: 1 }), React.createElement(Child, { value: 3 }), React.createElement(Child, { value: 2 }));
                expect(x).jsx.to.not.equal(y);
            });
        });
    });
});
