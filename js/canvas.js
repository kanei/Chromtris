var ChromTris = ChromTris || {};

ChromTris.Canvas = {
    _canvas: false,    
    _ctx: false,
    _grid: [],
    
    /**
     * Draw a cube on actual position
     * 
     * @param x defines only shadow of the cube, not the position
     * @param y defines only shadow of the cube, not the position
     * @param color color to be used to draw the cube
     */
    _drawCube: function(x, y, objectType) {
        if (!objectType) 
            return;
            
        var offsetx = ChromTris.CENTERX - x;
        var offsety = ChromTris.CENTERY - y;
        
        //top side of the cube
        _ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        _ctx.beginPath();
        _ctx.moveTo(offsetx, offsety);
        _ctx.lineTo(0, 0);
        _ctx.lineTo(ChromTris.CUBESIZE, 0);
        _ctx.lineTo(ChromTris.CUBESIZE + offsetx, offsety);
        _ctx.fill();
        
        //left side of the cube
        _ctx.fillStyle = "rgba(128, 128, 128, 0.5)";
        _ctx.beginPath();
        _ctx.moveTo(offsetx, offsety);
        _ctx.lineTo(0, 0);
        _ctx.lineTo(0, ChromTris.CUBESIZE);
        _ctx.lineTo(offsetx, ChromTris.CUBESIZE + offsety);
        _ctx.fill();
        
        //bottom side of the cube
        _ctx.fillStyle = "rgba(96, 96, 96, 0.5)";
        _ctx.beginPath();
        _ctx.moveTo(0, ChromTris.CUBESIZE);
        _ctx.lineTo(offsetx, ChromTris.CUBESIZE + offsety);
        _ctx.lineTo(ChromTris.CUBESIZE + offsetx, ChromTris.CUBESIZE + offsety);
        _ctx.lineTo(ChromTris.CUBESIZE, ChromTris.CUBESIZE);
        _ctx.fill();
        
        //right side of the cube
        _ctx.fillStyle = "rgba(192, 192, 192, 0.5)";
        _ctx.beginPath();
        _ctx.moveTo(ChromTris.CUBESIZE, 0);
        _ctx.lineTo(ChromTris.CUBESIZE + offsetx, offsety);
        _ctx.lineTo(ChromTris.CUBESIZE + offsetx, ChromTris.CUBESIZE + offsety);
        _ctx.lineTo(ChromTris.CUBESIZE, ChromTris.CUBESIZE);
        _ctx.fill();        
        
        _ctx.save();
        
        _ctx.shadowOffsetX = offsetx;
        _ctx.shadowOffsetY = offsety;
        _ctx.shadowBlur = 5;
        _ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        
        _ctx.fillStyle = ChromTris.Colors.cubeFront[objectType];
        _ctx.fillRect(0, 0, ChromTris.CUBESIZE, ChromTris.CUBESIZE);
        
        _ctx.restore();
    },
    
    displayGrid: function(grid) {
        _canvas.width = _canvas.width;
        _grid = grid;
        
        _ctx.translate(ChromTris.CUBESPACE, ChromTris.CUBESPACE); 
        
        for (y = 0; y < ChromTris.HEIGHT; y++) {
            _ctx.save();
            for (x = 0; x < ChromTris.WIDTH; x++) {
                this._drawCube(x, y, parseInt(grid[y * ChromTris.WIDTH + x]));
                _ctx.translate(ChromTris.CUBETOTAL, 0);
            }
            _ctx.restore();
            _ctx.translate(0, ChromTris.CUBETOTAL);
        }       
    },
    
    init: function(canvasId) {
        _canvas = document.getElementById(canvasId);
        if(_canvas && _canvas.getContext) {
            _ctx = _canvas.getContext('2d');
        }
    }
};