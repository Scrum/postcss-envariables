import postcss from 'postcss';
import cssVariables from 'postcss-css-variables';
import test from 'ava';
import plugin from '../src';

const processing = (input, opts, plugins = []) => {
    return postcss([plugin(opts), ...plugins]).process(input).css;
};

test('it change value in root', t => {
    const expected = ':root{ --contextPath: /dev }';
    const value = ':root{ --contextPath: env.contextPath }';
    t.is(processing(value, {env: {contextPath: '/dev'}}), expected);
});

test('it change value in selector', async t => {
    const expected = '.selector { background-image: url(/dev/image.svg)}';
    const value = ':root{ --contextPath: env.contextPath } .selector { background-image: url(var(--contextPath)/image.svg)}';
    const {css} = await postcss([plugin({env: {contextPath: '/dev'}}), cssVariables()]).process(value);
    t.is(
        css, 
        expected
    );
});