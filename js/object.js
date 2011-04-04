var ChromTris = ChromTris || {};

/**
 * Class for a falling object - has number of states, first one is the default one
 * 
 * @method turnClockwise increments current position in matrixes
 * @method turnAntiClockwise decrements current position in matrixes
 * 
 * @param numberOfStates total number of matrixes to step through
 * @param dimension dimension of the matrix - used for both dimensions
 * @param matrixes array with matrixes data (booleans)
 * 
 * @return object with 
 */
ChromTris.FallingObject = function(numberOfStates, dimension, matrixes) {
    
    this.numberOfStates = numberOfStates;
    this.dimension = dimension;
    this.matrixes = matrixes;
    
    this.currentState = 0;
};

/**
 * Current matrix
 *
 * @return current matrix data
 */
ChromTris.FallingObject.prototype.activeMatrix = function() {
    return this.matrixes[this.currentState];
};

/** 
 * Turn the object clockwise - move in its matrixes by one to the right.
 */
ChromTris.FallingObject.prototype.turnClockwise = function() {
    this.currentState = (this.currentState + 1) % this.numberOfStates;    
};

/**
 * Reset matrix to a default position (matrix no. 0)
 */
ChromTris.FallingObject.prototype.reset = function() {
    this.currentState = 0;   
};

/**
 * Turn the object anti clockwise - move in its matrixes by one to the left
 */
ChromTris.FallingObject.prototype.turnAntiClockwise = function (obj) {
    this.currentState = this.currentState === 0 ? this.numberOfStates - 1 : this.currentState - 1;
};


ChromTris.Objects = [];

/**
 * Right El Object 
 * 
 * - X -
 * - X -
 * - X X 
 * 
 */
ChromTris.Objects[ChromTris.ObjectType.RightEl] = new ChromTris.FallingObject(
    4, 
    3, 
    [   [   [false, true, false], 
            [false, true, false], 
            [false, true, true]   
        ],
        [   [false, false, false],
            [true, true, true],
            [true, false, false]
        ],
        [   [true, true, false],
            [false, true, false],
            [false, true, false]
        ],
        [   [false, false, true],
            [true, true, true],
            [false, false, false]
        ]
    ]
);


