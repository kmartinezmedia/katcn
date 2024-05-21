export default {
  multipass: true,
  plugins: [
    {
      name: 'removeDimensions',
    },
    {
      name: 'cleanupIds',
      params: {
        minify: true,
      },
    },
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: {
            remove: false,
          },
          removeViewBox: false,
        },
      },
    },
  ],
};
