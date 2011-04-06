var ChromTris = ChromTris || {};

ChromTris.Overlay = {
    _canvas: false,
    
    _ctx: false,
    
    _drawPiece: function() {
        _ctx.fillStyle = "rgba(30, 30, 160, 0.5)";
        
        _ctx.beginPath();
        _ctx.moveTo(0, 10);
        _ctx.lineTo(30, 0);
        _ctx.lineTo(40, 30);
        _ctx.lineTo(10, 40);
        _ctx.fill();
        
        _ctx.fillStyle = "rgba(20, 20, 130, 0.5)";
        _ctx.beginPath();
        _ctx.moveTo(30, 0);
        _ctx.lineTo(40, 5);
        _ctx.lineTo(50, 35);
        _ctx.lineTo(40, 30);
        _ctx.fill();
        
        _ctx.fillStyle = "rgba(10, 10, 100, 0.5)";
        _ctx.beginPath();
        _ctx.moveTo(40, 30);
        _ctx.lineTo(50, 35);
        _ctx.lineTo(20, 45);
        _ctx.lineTo(10, 40);        
        _ctx.fill();
    },
    
    _drawSquare: function() {
        _ctx.save();
        _ctx.translate(280, 30);
        this._drawPiece();
        
        _ctx.translate(34, -11);
        this._drawPiece();
        
        _ctx.translate(11, 34);
        this._drawPiece();
        
        _ctx.translate(-34, 11);
        this._drawPiece();
        
        _ctx.restore();
    },
    
    showObject: function (objectType) {
        switch (objectType) {
            case ChromTris.ObjectType.Square:
                this._drawSquare();
                break;
            case ChromTris.ObjectType.RightEl:
                break;
        }
    },
    
    init : function(canvasId) {
        _canvas = document.getElementById(canvasId);
        if(_canvas && _canvas.getContext) {
            _ctx = _canvas.getContext('2d');
        }
    }
};

