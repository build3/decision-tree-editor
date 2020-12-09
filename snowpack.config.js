module.exports = {
  plugins: [
    '@snowpack/plugin-svelte',
    [
      '@snowpack/plugin-run-script',
      {
        cmd: 'eslint "src/**/*.{js,svelte}"',
        watch: 'watch "$1" src',
      },
    ],
  ],
  mount: {
    public: '/',
    src: '/_dist_',
  },
  devOptions: {
    port: 8000,
    open: 'none',
  },
};
