import getValue from 'get-value';
import postcss from 'postcss';

export default postcss.plugin('postcss-envariables', (options = {}) => {
    return nodes => {
        nodes.walkRules(rule => {
            if (rule.selector !== ':root') {
                return;
            }

            rule.walkDecls(decl => {
                decl.value =  getValue(options, decl.value);
            });
        });
    };
});
