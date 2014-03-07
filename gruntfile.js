// Обязательная обёртка
module.exports = function(grunt) {

    // Задачи
    grunt.initConfig({

        //Например проверка кода javascript с помощью утилиты jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'js/public/**/*.js'
              ]
        },

        // Склеиваем
        concat: {
            main: {
                src: [
                    'js/**/jquery-1.11.0.js',
                    'js/**/underscore.js',
                    'js/**/backbone.js',
                    'js/**/*.js'
                ],
                dest: 'build/scripts.js'
            }
        },
        // Сжимаем
        uglify: {
            main: {
                files: {
                    // Результат задачи concat
                    'build/scripts.min.js': '<%= concat.main.dest %>'
                }
            }
        }
    });

    // Загрузка плагинов, установленных с помощью npm install
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Задача по умолчанию
    grunt.registerTask('default', ['concat', 'uglify', 'jshint']);
};