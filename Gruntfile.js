module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {   
            dist: {
                src: [
                    'js/libs/*.js', // All JS in the libs folder
                    'js/global.js'  // This specific file
                ],
                dest: 'js/build/production.js',
            }
        },

        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'true'
                },
                files: {
                    'styles/css/global.css': 'styles/sass/global.scss'
                }
            } 
        },

        autoprefixer: {
            options: {
                map: true
            },

            dist: {
                src: 'styles/css/global.css',
                dest: 'styles/css/global.prefixed.css'
            }
        },

        cssmin: {
            combine: {
                files: {
                'styles/build/global.min.css': ['styles/css/global.prefixed.css']
                }
            }            
        },

        watch: {
            options: { livereload: true },
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },

            sass: {
                files: ['styles/sass/*.scss'],
                tasks: ['sass', 'autoprefixer', 'cssmin'],
                options: { spawn: false }
            },

            livereload: {
                files: ['styles/build/global.min.css'],
                options: { livereload: true }            
            }
        }

    }); // End grunt.initConfig

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'sass', 'autoprefixer', 'cssmin']);

}; // End function(grunt) 