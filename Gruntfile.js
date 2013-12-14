var fs = require("fs");
module.exports = function (grunt) {

    var layout = fs.readFileSync("./app/views/layout.jade").toString('utf8'),
        css, js,
        csss = [],
        jss = [],
        cssRegex = /link\(rel='stylesheet', href='\.\/([^']+)'\)/g,
        jsRegex = /script\(src='\.\/([^']+)'\)/g;

    while ((css = cssRegex.exec(layout)) !== null) {
        csss.push(css[1]);
    }
    while ((js = jsRegex.exec(layout)) !== null) {
        jss.push(js[1]);
    }

    var images = [
        'jquery.mobile-1.4.0-rc.1/images/**',
        'mobipick/css/images/**'
    ];

//  console.log(jss);

    // Project configuration.
    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {cwd: "public/fonts/", src: ["**"], dest: 'dist/www/fonts/', filter: 'isFile', expand: true},
                    {cwd: "public/", src: csss, dest: 'dist/www/', filter: 'isFile', expand: true},
                    {cwd: "public/", src: jss, dest: 'dist/www/', filter: 'isFile', expand: true},
                    {cwd: "public/libs/", src: images, dest: 'dist/www/libs/', filter: 'isFile', expand: true},
                    {cwd: "public/img/mans", src: ["**"], dest: 'dist/www/img/mans', filter: 'isFile', expand: true},
                    {cwd: "public/", src: ["res/**","config.xml"], dest: 'dist/www/', filter: 'isFile', expand: true},
                ]
            }
        },
        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: {
                        debug: true
                    }
                },
                files: {
                    "dist/www/index.html": ["app/views/layout.jade"]
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jade');

    // Default task(s).
    grunt.registerTask('default', ['copy','jade']);

};