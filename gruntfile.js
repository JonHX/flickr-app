module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      less: {
        options: {
          compress: true,
          plugins: [
            new (require('less-plugin-clean-css'))()
          ]
        },
        files: {
          expand: true,
          cwd: 'less/',
          src: ['default.less'],
          dest: 'docs/',
          ext: '.min.css'
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default',['less']);
};
