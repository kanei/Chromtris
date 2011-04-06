var ChromTris = ChromTris || {};

ChromTris.Grid = {
    
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
        
        for (i = 0; i < ChromTris.DATASIZE; i++) 
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
        
        if (this.hasObject()) {            
        
            var matrix = ChromTris.Objects[this._activeObject.type].activeMatrix();
            
            for (x = 0; x < this._activeObject.dimension; x++) {
                for (y = 0; y < this._activeObject.dimension; y++) {
                    if (matrix[y][x])
                        dataWithObject[(y + this._activeObject.y) * ChromTris.WIDTH + x + this._activeObject.x] = this._activeObject.type;
                }
            }
        }
        
        return dataWithObject;
    },
    
    /**
     * Deletes line in data and moves all the other lines down
     * 
     * @param y id of the line to be deleted
     */
    _deleteLine: function(line) {
        for (y = line; y > 0; y--) {
            for (x = 0; x < ChromTris.WIDTH; x++) {
                this._data[y * ChromTris.WIDTH + x] = this._data[(y-1) * ChromTris.WIDTH + x];
            }
        }
    },
    
    /**
     * Checks, if active object can be projected into desired position
     * 
     * @param x position of the object in x
     * @param y position of the object in y
     * @param rotation ChromTris.Rotation enum parameter
     * 
     * @returns true if yes, false if not
     */
    _checkPosition: function(x, y, rotation) {
        if (!this._activeObject.type)
            throw "Wrong activeObject type: " + this._activeObject.type;
            
        var matrix = ChromTris.Objects[this._activeObject.type].nextMatrix(rotation);
        
        // iterate through the object matrix
        for (ox = 0; ox < this._activeObject.dimension; ox++)
            for (oy = 0; oy < this._activeObject.dimension; oy++) {
                // if object has a true value on the position
                if (matrix[oy][ox]) {
                    if (x + ox < 0 ||                   //left side
                        x + ox >= ChromTris.WIDTH ||        //right size
                        y + oy >= ChromTris.HEIGHT ||       //bottom side
                        this._data[(y +oy) * ChromTris.WIDTH + x + ox] //there is already another object
                        )
                        return false;
                }
            }
            
        return true;
    },
    
    /**
     * Checks whether there is an active object in the grid
     *
     * @return true if there is one, otherwise false
     */
    hasObject: function() {
        return this._activeObject.type ? true : false;
    },
    
    /** 
     * Removes active object
     */
    deleteObject: function() {
        this._activeObject.type = ChromTris.ObjectType.None;
    },
    
    /**
     * Initializes grid with its width and height parameters 
     */
    init: function() {
        //widht * _height
        var length = 9*16;
        for (i = 0; i < ChromTris.DATASIZE; i++) {
            this._data[i] = ChromTris.ObjectType.None;
        }
    },
    
    /**
     * Returns string with array joined and separated by ',' with all its members
     */
    toString: function() {
        var dataWithObject = this._getDataWithObject();
        
        return dataWithObject.join(',');
    },
    
    /**
     * Adds object to the top of the grid. There can be only one active object 
     * at a time.
     * 
     * @param objectType enumeration type of the object from ChromTris.ObjectType
     * 
     * @return true if everything goes well, if cant insert the object, returns false
     */
    addObject: function(objectType) {
        if (this.hasObject())
            return false;
        
        if (!objectType || objectType > ChromTris.ObjectType.Ti)
            throw "Wrong object id passed to Grid.addObject: " + objectType;
        
        ChromTris.Objects[objectType].reset();
        
        this._activeObject.type = objectType;
        this._activeObject.dimension = ChromTris.Objects[objectType].dimension;
        
        this._activeObject.x = ChromTris.STARTX;
        this._activeObject.y = ChromTris.STARTY;
        
        if (!this._checkPosition(this._activeObject.x, this._activeObject.y, ChromTris.Rotation.None)) {
            return false;
        }
        
        return true;
    }, 
    
    /**
     * Moves active object in desired direction
     *
     * @param direction enum value from ChromTris.Direction
     * 
     * @return true if move was successfull, otherwiser false
     */
    moveObject: function(direction) {
        if (!this.hasObject)
            return false;
            
        switch(direction) {
            case ChromTris.Direction.Up:
                if (this._checkPosition(this._activeObject.x, this._activeObject.y, ChromTris.Rotation.Clockwise)) {
                    ChromTris.Objects[this._activeObject.type].turnAntiClockwise();
                    return true;
                }
                break;
            case ChromTris.Direction.Right:
                if (this._checkPosition(this._activeObject.x + 1, this._activeObject.y, ChromTris.Rotation.None)) {
                    this._activeObject.x++;
                    return true;
                }
                break;
            case ChromTris.Direction.Down:
                if (this._checkPosition(this._activeObject.x, this._activeObject.y + 1, ChromTris.Rotation.None)) {
                    this._activeObject.y++;
                    return true;
                }
                break;
            case ChromTris.Direction.Left:
                if (this._checkPosition(this._activeObject.x - 1, this._activeObject.y, ChromTris.Rotation.None)) {
                    this._activeObject.x--;
                    return true;
                }
                break;
        }
        
        return false;
    },
    
    /**
     * Saves the active object into the grid and removes it, creating a space for a new object
     */
    storeObject: function() {
        if (!this.hasObject) 
            return;
        
        var matrix = ChromTris.Objects[this._activeObject.type].activeMatrix();
        
        for (x = 0; x < this._activeObject.dimension; x++)
            for (y = 0; y < this._activeObject.dimension; y++) {
                if(matrix[y][x])
                    this._data[(y + this._activeObject.y) * ChromTris.WIDTH + x + this._activeObject.x] = this._activeObject.type;
            }
        
        this.deleteObject();
    },

    /**
     * Deletes full lines
     * 
     * @return array of ids of lines which were deleted
     */
    deleteFullLines: function() {
        var cellsDone = 0;
        var isFull;
        
        var deletedLines = [];
        //go through all the lines
        for (y = 0; y < ChromTris.HEIGHT; y++) {
            isFull = true;
            
            for(x = 0; x < ChromTris.WIDTH; x++) {
                if (!this._data[y * ChromTris.WIDTH + x]) {
                    isFull = false;
                    break;
                }
            }
            
            if (isFull) {
                this._deleteLine(y);
                deletedLines.push(y);
            }
        }
        
        return deletedLines;
    }
};

