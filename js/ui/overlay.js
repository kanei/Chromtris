var ChromTris = ChromTris || {};

ChromTris.Overlay = {
    _canvas: false,
    _ctx: false,
    
    _currentObjectShown: 0,
    _isGameOver: false,
    _isGameRunning: false,
    
    _onStart: null,
    
    _startButton: new ChromTris.Area(30, 400, 220, 80),
    
    FontType: {
        Normal: 1,
        Large: 2
    },
    
    TextAlign: {
        Left: 1,
        Center: 2,
        Right: 3
    },
    
    _setFont: function(fontType, textAlign) {
        this._ctx.shadowOffsetX = 3;
        this._ctx.shadowOffsetY = 3;
        this._ctx.shadowBlur = 5;
        this._ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        
        this._ctx.fillStyle = 'rgba(128, 128, 128, 0.7)';
        if (fontType == this.FontType.Large) {
            this._ctx.font = 'bold 52px Nova Round'; 
        } else {
            this._ctx.font = 'bold 26px Nova Round'; 
        }
                
        if (textAlign == this.TextAlign.Center) {
            this._ctx.textAlign = 'center';  
        } else if (textAlign == this.TextAlign.Right) {
            this._ctx.textAlign = 'right';  
        } else {
            this._ctx.textAlign = 'left';
        }
    },
    
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
        
        for (var y = 0; y < dimension; y ++) {
            this._ctx.save();
            for (var x = 0; x < dimension; x ++) {
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
    
    _drawHighScore: function() {
        this._ctx.save();
        this._ctx.translate(20, 200);
        
        this._setFont(this.FontType.Large);                
        this._ctx.fillText('HighScore', 0, 0);
        
        this._setFont(this.FontType.Normal);
        var highScore = ChromTris.HighScore.get();
        for (var i in highScore) {
            var y =  30 * i + 50;
            this._ctx.textAlign = 'right';
            this._ctx.fillText(parseInt(i, 10)+1 + ' ..........', 140, y);
            this._ctx.fillText(highScore[i], 220, y);
        }
        
        this._ctx.restore();
    },
    
    /**
     * Redraws the whole canvas with values stored in the object
     */
    _redraw: function() {
        this._canvas.width = this._canvas.width;
        
        if (this._currentObjectShown > 0) {
            this._ctx.save();
            this._ctx.translate(0, 10);
            this._drawObject(this._currentObjectShown);
            this._ctx.restore();
        }
        
        if(!this._isGameRunning) {
            this._ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            this._ctx.fillRect(15, 15, 275, 470);
            
            this._setFont(this.FontType.Large);
            
            this._ctx.fillText('Start =>', 20, 460);
            
            if(this._isGameOver) {
                this._ctx.fillText('GameOver', 20, 100);
            } else {
                this._ctx.fillText('ChromTris', 20, 100);
            }
            this._drawHighScore();
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
     * 
     * @param callback function to be called when start button is clicked
     */
    showStart: function(callback) {
        this._isGameRunning = false;
        this._onStart = callback;
        this._redraw();
    },
    
    /**
     * Hides start button
     */
    hideStart: function() {
        this._isGameRunning = true;
        this._redraw();
    },

    /**
     * Shows game over text
     */
    showGameOver: function(bool) {
        this._isGameOver = bool;
        this._redraw();
    },
    
    /**
     * Function, which is called when on click event is triggered on canvas
     */
    onClick: function(e) {
        if (ChromTris.Overlay._startButton.isOver(e.offsetX, e.offsetY)) {
			ChromTris.Overlay._canvas.style.cursor = 'auto'; 
            ChromTris.Overlay._onStart();			
        }        
        
        ChromTris.Debug.message('Clicked on Overlay x: ' + e.offsetX + ' y: ' + e.offsetY);
    },
    
    /**
     * Handles on mouse move event
     */ 
    onMouseMove: function(e) {
        if (ChromTris.Overlay._isGameRunning) {
            return;   
        }
        
        ChromTris.Overlay._canvas.style.cursor = ChromTris.Overlay._startButton.isOver(e.offsetX, e.offsetY) ? 
            'pointer' : 'auto'; 
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
        
        this._canvas.addEventListener('click', ChromTris.Overlay.onClick, false);
        this._canvas.addEventListener('mousemove', ChromTris.Overlay.onMouseMove, false);
		
		this.showStart(ChromTris.start);
    }
};

if (document.addEventListener) {
	document.addEventListener('DOMContentLoaded', function() {ChromTris.Overlay._redraw()}, false);
}

