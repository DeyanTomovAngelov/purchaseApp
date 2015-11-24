//module.exports = function(config){
//  config.set({
//
//    basePath : './',
//
//    files : [
//      'app/bower_components/angular/angular.js',
//      'app/bower_components/angular-route/angular-route.js',
//      'app/bower_components/angular-mocks/angular-mocks.js',
//      'app/components/**/*.js',
//      'app/view*/**/*.js'
//    ],
//
//    autoWatch : true,
//
//    frameworks: ['jasmine'],
//
//    browsers : ['Chrome'],
//
//    plugins : [
//            'karma-chrome-launcher',
//            'karma-firefox-launcher',
//            'karma-jasmine',
//            'karma-junit-reporter'
//            ],
//
//    junitReporter : {
//      outputFile: 'test_out/unit.xml',
//      suite: 'unit'
//    }
//
//  });
//};

module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        files: [
            //'node_modules/angular/angular.js',
            'app/index.html',
            'node_modules/angular-mocks/angular-mocks.js',
            'app/**/*.js',

            'app/unit-tests/**/*.js'
        ]
    });
};
