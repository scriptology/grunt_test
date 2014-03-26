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
                'js/work/**/*.js'
              ]
        },

        // Склеиваем
        concat: {
            main: {
                src: [
                    'work/lib/jquery-1.11.0.js',
                    'work/js/**/*.js'
                ],
                dest: 'public/js/scripts.js'
            }
        },
        // Сжимаем
        uglify: {
            main: {
                files: {
                    // Результат задачи concat
                    'public/js/scripts.min.js': '<%= concat.main.dest %>'
                }
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'work/sass',
                    cssDir: 'work/css'
                }
            }
        },

        // Склеиваем css
        concat_css: {
            options: {
              // Task-specific options go here.
            },
            all: {
              src: ["work/css/*.css"],
              dest: "public/css/template.css"
            }
          },

//        cssmin: {
//          minify: {
//            expand: true,
//            cwd: 'stylesheet/css/',
//            src: ['*.css', '!*.min.css'],
//            dest: 'build/css/',
//            ext: '.min.css'
//          }
//        },

        watch: {
            scripts: {
                files: ['work/js/*.js'],
                tasks: ['jshint', 'concat'],
                options: {
                    spawn: false
                }
            },
            sass: {
                files: ['work/sass/*.sass'],
                tasks: ['compass'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['work/css/*.css'],
                tasks: ['concat_css'],
                options: {
                    spawn: false
                }
            }
//            ,
//            css: {
//                files: ['stylesheet/css/*.css'],
//                tasks: ['cssmin'],
//                options: {
//                    spawn: false
//                }
//            }
        }

    });

    // Загрузка плагинов, установленных с помощью npm install
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concat-css');

    // Задача по умолчанию
    grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'compass', 'concat_css', 'watch']);
};