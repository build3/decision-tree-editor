module.exports = {
  plugins: [
    '@snowpack/plugin-svelte',
    [
      '@snowpack/plugin-run-script',
      {
        cmd: 'eslint --ext .js,.svelte src/**/*.{js,svelte}',
        watch: 'watch "$1" src',
      },
    ],
    [
      'snowpack-plugin-optimize',
      {
        minifyJs: true,
        modulePreload: true,
        minifyCss: true,
        minifyHtml: true,
      },
    ],
  ],
  mount: {
    public: '/',
    src: '/_dist_',
  },
  buildOptions: {
    clean: true,
  },
  devOptions: {
    port: 8000,
    open: 'none',
  },
};
