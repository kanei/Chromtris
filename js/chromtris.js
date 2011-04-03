var ChromTris = ChromTris || {};

ChromTris.toHtml = function(object) {
    var result = '';
    for (state = 0; state < object.numberOfStates; state++) {
        result += '<p>';
        var matrix = object.currentMatrix();
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

window.onload = function()
{
    document.getElementById('ChromTrisConsole').innerHTML = ChromTris.Grid.toHtml();
    
    //alert("ahoj");
};



/*
  function startChromtris() {
  PhiloGL('canvas', {
    program: {
      from: 'ids',
      vs: 'shader-vs',
      fs: 'shader-fs'
    },
    onError: function() {
      alert("An error ocurred while loading the application");
    },
    onLoad: function(app) {
      var gl = app.gl,
          canvas = app.canvas,
          program = app.program,
          camera = app.camera;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clearDepth(1);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);

      program.setBuffers({
        'triangle': {
          attribute: 'aVertexPosition',
          value: new Float32Array([0, 1, 0, -1, -1, 0, 1, -1, 0]),
          size: 3
        },
        
        'square': {
          attribute: 'aVertexPosition',
          value: new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0]),
          size: 3
        }
      });
      
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      camera.modelView.id();
      //Draw Triangle
      camera.modelView.$translate(-1.5, 0, -7);
      program.setUniform('uMVMatrix', camera.modelView);
      program.setUniform('uPMatrix', camera.projection);
      program.setBuffer('triangle');
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      
      //Draw Square
      camera.modelView.$translate(3, 0, 0);
      program.setUniform('uMVMatrix', camera.modelView);
      program.setUniform('uPMatrix', camera.projection);
      program.setBuffer('square');
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
  });  
}*/
