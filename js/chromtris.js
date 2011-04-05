var ChromTris = ChromTris || {};

ChromTris.startGL = function() { 
    var earth = new PhiloGL.O3D.Sphere({
        nlat: 30,
        nlong: 30,
        radius: 2,
        shininess: 32,
        colors: [1, 1, 1, 1]
    });
  
    PhiloGL('ChromTrisCanvas', {
        program: {
            from: 'uris',
            path: 'shaders/',
            vs: 'vs.glsl',
            fs: 'fs.glsl'
        },
        camera: {
            position: {
            x: 0, y: 0, z: -6
            }
        }
    });
};

ChromTris.start = function() {
    ChromTris.worker = new Worker('js/worker.js');
    
    ChromTris.worker.onmessage = function(event) {
        document.getElementById('ChromTrisConsole').innerHTML = event.data;
    };
    
    ChromTris.worker.onerror = function(error) {
        document.getElementById('ChromTrisErrorConsole').innerHTML += error.message + '<br />';
    };
};

window.onload = function()
{    
    ChromTris.start();
};

ChromTris.toHtml = function(object) {
    var result = '';
    for (state = 0; state < object.numberOfStates; state++) {
        result += '<p>';
        var matrix = object.activeMatrix();
        for (i = 0; i < object.matrixDimension; i++) {
            for (j = 0; j < object.matrixDimension; j ++) {
                result += matrix[i][j] ? 'X' : '-';
            }
            result += '<br />';
        }
        object.turnClockwise();
    }    
    return result;
};
