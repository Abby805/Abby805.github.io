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
        files: ['sass/{,**/}*.scss'],
        tasks: ['autoprefixer:dev']
      },
      js: {
        files: ['js/functions.js'],
        tasks: ['jshint']
      }
    }, //watch
    sass: {
      dev: {
        options: {
          compass: false
        },
        files: {
          'stylesheets/style.css': 'sass/style.scss'
        }
      }
    }, //sass
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie >= 10'], //change as needed
        map: true
      },
      dev: {
        files: {
          'stylesheets/style.css' : 'stylesheets/style.css'
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