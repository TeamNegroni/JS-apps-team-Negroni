System.config({
    transpiler: "babel",
    babelOptions: {
        optional: [
            "runtime"
        ]
    },
    map: {
        babel: 'node_modules/babel-core/browser.js'
    }
});

System.import('CustomScripts/Notes.js');
System.import('CustomScripts/grid.js');
System.import('CustomScripts/calendar.js');