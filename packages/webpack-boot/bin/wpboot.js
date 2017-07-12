#!/usr/bin/env node

'use strict';

const spawn = require("cross-spawn");
// node wpbuild.js <arguments> 
const script = process.argv[2];

switch (script) {
    case 'start' : 
    case 'build' :
        let result = spawn.sync('node',
            [require.resolve('../scripts/' + script + '.js')],
            {stdio : 'inherit'});
        if (result.signal) {
            console.info("Received ", result.signal);
            process.exit(1);
        }
        process.exit(result.status);
        break;
    default : {
        console.log("Not available command ", script);
        break;
    }
}