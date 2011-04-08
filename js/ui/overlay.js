var ChromTris = ChromTris || {};

ChromTris.Overlay = {
    _canvas: false,
    _ctx: false,
    
    _currentObjectShown: 0,
    _isGameOver: false,
    
    _drawPiece: function() {
        this._ctx.fillStyle = "rgba(192, 192, 192, 0.5)";
        
        // original square
        this._ctx.beginPath();
        this._ctx.moveTo(0, 5);
        this._ctx.lineTo(15, 0);
        this._ctx.lineTo(20, 15);
        this._ctx.lineTo(5, 20);
        this._ctx.fill();
        
        //right side
        this._ctx.fillStyle = "rgba(160, 160, 160, 0.5)";
        this._ctx.beginPath();
        this._ctx.moveTo(15, 0);
        this._ctx.lineTo(20, 3);
        this._ctx.lineTo(25, 18);
        this._ctx.lineTo(20, 15);
        this._ctx.fill();
        
        //bottom side
        this._ctx.fillStyle = "rgba(128, 128, 128, 0.5)";
        this._ctx.beginPath();
        this._ctx.moveTo(20, 15);
        this._ctx.lineTo(25, 18);
        this._ctx.lineTo(10, 23);
        this._ctx.lineTo(5, 20);        
        this._ctx.fill();
    },
    
    _drawObject: function(objectType) {
        var dimension = ChromTris.Objects[objectType].dimension;
        var matrix = ChromTris.Objects[objectType].defaultMatrix();
        var hadWritten = false;
        
        for (y = 0; y < dimension; y ++) {
            this._ctx.save();
            for (x = 0; x < dimension; x ++) {
                if (matrix[y][x]) {
                    hadWritten = true;
                    this._drawPiece();
                }
                this._ctx.translate(17, -6);
            }
            this._ctx.restore();
            if (hadWritten)
                this._ctx.translate(6, 17);
        }
    },

    _drawGameOver: function() {
      this._ctx.shadowOffsetX = 3;
      this._ctx.shadowOffsetY = 3;
      this._ctx.shadowBlur = 5;
      this._ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';

      this._ctx.fillStyle = 'rgba(128, 128, 128, 0.7)';
      this._ctx.font = 'bold 52px Nova Round';
      this._ctx.fillText('Game Over', 0, 0);
    },
    
    /**
     * Redraws the whole canvas with values stored in the object
     */
    _redraw: function() {
        this._canvas.width = this._canvas.width;
        
        this._ctx.save();
        this._ctx.translate(0, 10);
        this._drawObject(this._currentObjectShown);
        this._ctx.restore();

        if(this._isGameOver) {
            this._ctx.translate(20, 220);
            this._drawGameOver();
            this._ctx.restore();
        }
    },
    
    /**
     * Shows object on the overlay canvas - uses different showing than canvas
     *
     * @param objectType enum from ChromTris.ObjectType
     */
    showObject: function (objectType) {
        if (objectType == this._currentObjectShown)
            return;
        
        this._currentObjectShown = objectType;
        
        this._redraw();
    },

    /**
     * Shows game over text
     */
    showGameOver: function(bool) {
        this._isGameOver = bool;
    },
    
    /**
     * Initializes the overlay
     * 
     * @param canvasID DOM id of the canvas the overlay will be shown in
     */
    init : function(canvasId) {
        this._canvas = document.getElementById(canvasId);
        if(this._canvas && this._canvas.getContext) {
            this._ctx = this._canvas.getContext('2d');
        }
        
        
    }
};

