module.exports = {
  presets: ['@babel/preset-react', ['@babel/preset-env', { modules: process.env.MODULE ? false : 'commonjs' }]],
  plugins: [
    'emotion',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    'react-docgen',
    [
      'module-resolver',
      {
        alias: {
          src: './src',
        },
      },
    ],
    ['inline-react-svg', { ignorePattern: '(?<!\\.component)\\.svg$' }],
    [
      'file-loader',
      {
        name: '[hash].[ext]',
        extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg'],
        publicPath: '/eurosport-web-toolkit/',
        outputPath: '/dist/assets',
        context: 'src',
        limit: 0,
      },
    ],
  ],
};
