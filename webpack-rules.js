import path from 'path';

export default [
  {
    test: /\.js$/,
    include: path.resolve(__dirname, './src'),
    exclude: /(node_modules|dist)/,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: [],
      },
    },
  },
];
