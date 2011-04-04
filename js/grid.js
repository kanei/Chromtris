var ChromTris = ChromTris || {};

ChromTris.Grid = {
    //change the datasize after changing these constants
    _width: 9,
    _height: 16,

    _dataSize: 144,

    _data: [],
    
    _activeObject: {
            type: ChromTris.ObjectType.None,
            dimension: 0,
            x: 0,
            y: 0
        },
        
    /**
     * Gets a shalow copy of the current data
     * 
     * @returns single dimensional array with current data
     */
    _cloneData: function() {
        var dataClone = [];
        
        for (i = 0; i < this._dataSize; i++) 
            dataClone[i] = this._data[i];
            
        return dataClone;
    },
    
    /**
     * Gets the data with active object projected into the matrix
     * 
     * @returns single dimensional array with current active object 
     */
    _getDataWithObject: function() {
        var dataWithObject = this._cloneData();
        
        if (this._activeObject.type) {            
        
            var matrix = ChromTris.Objects[this._activeObject.type].activeMatrix();
            
            for (x = 0; x < this._activeObject.dimension; x++) {
                for (y = 0; y < this._activeObject.dimension; y++) {
                    dataWithObject[(y + this._activeObject.y) * this._width + x + this._activeObject.x] = matrix[y][x];
                }
            }
        }
        
        return dataWithObject;
    },
    
    /**
     * Checks, if active object can be projected into desired position
     * 
     * @returns true if yes, false if not
     */
    _checkPosition: function(x, y) {
        var matrix = ChromTris.Objects[this._activeObject.type].activeMatrix();
        
        // iterate through the object matrix
        for (ox = 0; ox < this._activeObject.dimension; ox++)
            for (oy = 0; oy < this._activeObject.dimension; oy++) {
                // if object has a true value on the position
                if (matrix[oy][ox]) {
                    if (x + ox < 0 ||                   //left side
                        x + ox >= this._width ||        //right size
                        y + oy >= this._height          //bottom side
                        )
                        return false;
                }
            }
            
        return true;
    },
    
    /**
     * Initializes grid with its width and height parameters 
     */
    init: function() {
        //widht * _height
        var length = 9*16;
        for (i = 0; i < this._dataSize; i++) {
            this._data[i] = false;
        }
    },
    
    /**
     * Returns grid as html formated string
     */
    toHtml: function() {
        var html = '';
        
        var dataWithObject = this._getDataWithObject();
        
        for(i = 0; i < this._dataSize; i++) {
            html += dataWithObject[i] ? 'X' : '-';
            
            if ((i + 1) % this._width === 0) 
                html += '<br />';
        }
        
        return html;
    },
    
    /**
     * Adds object to the top of the grid. There can be only one active object 
     * at a time.
     * 
     *@param objectType enumeration type of the object from ChromTris.ObjectType
     */
    addObject: function(objectType) {
        if (this._activeObject.type)
            return;
        
        ChromTris.Objects[objectType].reset();
        
        this._activeObject.type = objectType;
        this._activeObject.dimension = ChromTris.Objects[objectType].dimension;
        this._activeObject.x = 3;
        this._activeObject.y = 3;
    }, 
    
    moveObject: function(direction) {
        switch(direction) {
            case ChromTris.Direction.Up:
                ChromTris.Objects[this._activeObject.type].turnAntiClockwise();
                break;
            case ChromTris.Direction.Right:
                if (this._checkPosition(this._activeObject.x + 1, this._activeObject.y)) {
                    this._activeObject.x++;
                }
                break;
            case ChromTris.Direction.Down:
                if (this._checkPosition(this._activeObject.x, this._activeObject.y + 1)) {
                    this._activeObject.y++;
                }
                break;
            case ChromTris.Direction.Left:
                if (this._checkPosition(this._activeObject.x - 1, this._activeObject.y)) {
                    this._activeObject.x--;
                }
                break;
        }
    }
    
};


