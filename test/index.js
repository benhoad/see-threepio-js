var test = require('grape'),
    SeeThreepio = require('../');

var seeThreepio = new SeeThreepio({
        'helloWorld': 'hello world',
        'hello(word)': 'hello {word}',
        'helloWorldExpression': 'hello ~wat',
        'parenthesisWithNoArgs': '~wat()',
        'wat': 'wat',
        'pipeTest': 'a|b|c',
        'equalTest': '~equal(a|a)',
        'notEqualTest': '~not(~equal(a|a))',
        'reverseTest': '~reverse(abc)',
        'reverseTestExpression': '~reverse(abc)',
        'pluralize(word|count)': '~if(~equal({count}|1)|{word}|{word}s)',
        'pluralizedWat(count)': '~pluralize(~wat|{count})',
        'escapedTilde': '\\~',
        'escapedParenthesis': '\\(hello\\)',
        'escapedPipe': '\\|',
        'escapedCurly': '\\{hello\\}'
    });

test('bare words', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('helloWorld'), 'hello world');
});
test('placeholders', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('hello', ['wat']), 'hello wat');
});
test('evaluate expression (~)', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('helloWorldExpression'), 'hello wat');
});
test('parenthesis call with no arguments', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('parenthesisWithNoArgs'), 'wat');
});
test('evaluate expression (~)', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('helloWorldExpression'), 'hello wat');
});('pipes', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('pipeTest'), 'a,b,c');
});
test('equal', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('equalTest'), 'true');
});
test('not', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('notEqualTest'), 'false');
});
test('reverse', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('reverseTest'), 'cba');
});
test('pluralize plural', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('pluralize', ['car', 5]), 'cars');
});
test('pluralize singular', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('pluralize', ['car', 1]), 'car');
});
test('pluralize world', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('pluralizedWat', [2]), 'wats');
});
test('pluralize world singular', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('pluralizedWat', [1]), 'wat');
});


test('Escaping: ~', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('escapedTilde'), '~');
});
test('Escaping: ( )', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('escapedParenthesis'), '(hello)');
});
test('Escaping: |', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('escapedPipe'), '|');
});
test('Escaping: { }', function (t) {
    t.plan(1);
    t.equal(seeThreepio.get('escapedCurly'), '{hello}');
});