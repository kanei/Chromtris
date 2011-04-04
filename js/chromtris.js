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

ChromTris.redraw = function() {
    document.getElementById('ChromTrisConsole').innerHTML = ChromTris.Grid.toHtml();
};

ChromTris.start = function() {
    //document.getElementById('ChromTrisConsole').innerHTML = ChromTris.Grid.toHtml();
    
    ChromTris.Grid.addObject(ChromTris.ObjectType.RightEl);
    
    ChromTris.redraw();
};

window.onload = function()
{    
    ChromTris.Grid.init();
    
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
