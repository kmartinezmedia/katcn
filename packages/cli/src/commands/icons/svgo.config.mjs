export default {
  multipass: true,
  plugins: [
    'removeDimensions',
    {
      name: 'cleanupIds',
      params: {
        minify: true,
        remove: false,
      },
    },
  ],
};
