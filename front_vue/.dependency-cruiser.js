module.exports = {
  options: {
    doNotFollow: {
      path: 'node_modules'
    },
    exclude: {
      path: 'node_modules'
    },
    tsConfig: {
      fileName: './tsconfig.json' // if you're using TypeScript
    },
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/[^/]+'
      }
    }
  }
};
