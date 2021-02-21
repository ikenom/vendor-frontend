const path = require('path');

module.exports = async ({ config, mode }) => {
    // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

  // Add typescript loader
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve(__dirname, "../src"),
    loader: "ts-loader",
    options: {
      configFile: ".storybook/tsconfig.json"
    }
  });
  config.resolve.extensions.push(".ts", ".tsx");

  // Add SVGR Loader
  // ========================================================
  // Remove svg rules from existing webpack rule
  const assetRule = config.module.rules.find(({ test }) => test.test('.svg'));

  const assetLoader = {
    loader: assetRule.loader,
    options: assetRule.options || assetRule.query,
  };
  
  config.module.rules.unshift({
    test: /\.svg$/,
    use: ['@svgr/webpack', assetLoader],
  });
  
  // Add markdown loader
  config.module.rules.push({
    test: /\.md$/,
    include: path.resolve(__dirname, "../src"),
    loader: "raw-loader"
  });
  config.resolve.extensions.push(".md");

  return config;
};
