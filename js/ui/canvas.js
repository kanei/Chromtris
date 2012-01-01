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
        this._ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        this._ctx.beginPath();
        this._ctx.moveTo(offsetx, offsety);
        this._ctx.lineTo(0, 0);
        this._ctx.lineTo(ChromTris.CUBESIZE, 0);
        this._ctx.lineTo(ChromTris.CUBESIZE + offsetx, offsety);
        this._ctx.fill();
        
        //left side of the cube
        this._ctx.fillStyle = "rgba(128, 128, 128, 0.5)";
        this._ctx.beginPath();
        this._ctx.moveTo(offsetx, offsety);
        this._ctx.lineTo(0, 0);
        this._ctx.lineTo(0, ChromTris.CUBESIZE);
        this._ctx.lineTo(offsetx, ChromTris.CUBESIZE + offsety);
        this._ctx.fill();
        
        //bottom side of the cube
        this._ctx.fillStyle = "rgba(96, 96, 96, 0.5)";
        this._ctx.beginPath();
        this._ctx.moveTo(0, ChromTris.CUBESIZE);
        this._ctx.lineTo(offsetx, ChromTris.CUBESIZE + offsety);
        this._ctx.lineTo(ChromTris.CUBESIZE + offsetx, ChromTris.CUBESIZE + offsety);
        this._ctx.lineTo(ChromTris.CUBESIZE, ChromTris.CUBESIZE);
        this._ctx.fill();
        
        //right side of the cube
        this._ctx.fillStyle = "rgba(192, 192, 192, 0.5)";
        this._ctx.beginPath();
        this._ctx.moveTo(ChromTris.CUBESIZE, 0);
        this._ctx.lineTo(ChromTris.CUBESIZE + offsetx, offsety);
        this._ctx.lineTo(ChromTris.CUBESIZE + offsetx, ChromTris.CUBESIZE + offsety);
        this._ctx.lineTo(ChromTris.CUBESIZE, ChromTris.CUBESIZE);
        this._ctx.fill();        
        
        this._ctx.save();
        
        this._ctx.shadowOffsetX = offsetx;
        this._ctx.shadowOffsetY = offsety;
        this._ctx.shadowBlur = 5;
        this._ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        
        this._ctx.fillStyle = ChromTris.Colors.cubeFront[objectType];
        this._ctx.fillRect(0, 0, ChromTris.CUBESIZE, ChromTris.CUBESIZE);
        
        this._ctx.restore();
    },
    
    displayGrid: function(grid) {
        this._canvas.width = this._canvas.width;
        this._grid = grid;
        
        this._ctx.translate(ChromTris.CUBESPACE, ChromTris.CUBESPACE); 
        
        for (var y = 0; y < ChromTris.HEIGHT; y++) {
            this._ctx.save();
            for (var x = 0; x < ChromTris.WIDTH; x++) {
                this._drawCube(x, y, parseInt(grid[y * ChromTris.WIDTH + x], 10));
                this._ctx.translate(ChromTris.CUBETOTAL, 0);
            }
            this._ctx.restore();
            this._ctx.translate(0, ChromTris.CUBETOTAL);
        }       
    },
    
    init: function(canvasId) {
        this._canvas = document.getElementById(canvasId);
        if(this._canvas && this._canvas.getContext) {
            this._ctx = this._canvas.getContext('2d');
        }
    }
};