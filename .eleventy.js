const { EleventyHtmlBasePlugin } = require("@11ty/eleventy")

module.exports = config => {
    // Filters
    config.addFilter('isRecentPost', value => {
        if (!value) {
            return false;
        }

        // 1 day is 86400000 milliseconds
        return Date.now() - new Date(value) < 86400000 * 7
    });

    // Images
    config.addPassthroughCopy('images');

    // TODO: I should be able to just add `**/*.css` to this passthrough 🤔 i need to check this
    // CSS
    config.addPassthroughCopy('index.css');
    config.addPassthroughCopy('normalize.css');
    config.addPassthroughCopy('variables.css');

    // Plugin
    // This plugin allows me to use `--pathprefix` to add a prefix to the URLs because this will
    // be deployed to a github page with a repo slug
    config.addPlugin(EleventyHtmlBasePlugin);

    return {
        dir: {
            input: 'site',
            output: 'dist'
        }
    }
};
