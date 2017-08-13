module.exports = {
    // The list of plugins for PostCSS
    // https://github.com/postcss/postcss
    plugins: [
        // Add vendor prefixes to CSS rules using values from caniuse.com
        // https://github.com/postcss/autoprefixer
        require('autoprefixer')({
            browsers: [
                '>1%',
                'last 4 versions',
                'Firefox >= 20',
                'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
        }),
        require('postcss-flexbugs-fixes'),
    ],
};