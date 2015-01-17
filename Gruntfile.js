'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      sass: {
        files: ['sass/{,**/}*.scss'],
        tasks: ['sass:dev'],
        options: {
          livereload: false
        }
      },
      styles: {
        files: ['stylesheets/style--no-prefix.css'],
        tasks: ['autoprefixer:dev']
      },
      js: {
        files: ['js/{,**/}*.js'],
        tasks: ['jshint']
      }
    }, //watch
    sass: {
      dev: {
        options: {
          compass: false
        },
        files: {
          'stylesheets/style--no-prefix.css': 'sass/style.scss'
        }
      }
    }, //sass
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie >= 9'], //change as needed
        map: true
      },
      dev: {
        files: {
          'stylesheets/style.css' : 'stylesheets/style--no-prefix.css'
        }
      }
    }, //autoprefixer
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['js/functions.js']
    } //jshint
  }); //initConfig

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jshint');
};