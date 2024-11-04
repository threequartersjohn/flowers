const { EleventyHtmlBasePlugin } = require("@11ty/eleventy")

module.exports = config => {
  // Filters

  // Returns data from wikipedia given a link.
  config.addAsyncFilter('getWikiData', async pageId => {
    if (!pageId) {
      return 'I did not add the page ID 🤷 I\'m stupid!';
    }

    // const data = fetch(link);
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&pageids=${pageId}&formatversion=2&exintro=1`);

    const data = await response.json();

    return data?.query?.pages?.at(0)?.extract
  })

  // Returns true or false depending on whether the date that is given
  // is more recent than seven days.
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
