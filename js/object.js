var ChromTris = ChromTris || {};

ChromTris.ObjectType = {
    LeftEl:     0,
    RightEl:    1,
    LeftZed:    2,
    RightZed:   3,
    Line:       4,
    Square:     5,
    Ti:         6
};

/**
 * Class for a falling object - has number of states, first one is the default one
 * 
 * @method turnClockwise increments current position in matrixes
 * @method turnAntiClockwise decrements current position in matrixes
 * 
 * @param numberOfStates total number of matrixes to step through
 * @param matrixDimension dimension of the matrix - used for both dimensions
 * @param matrixes array with matrixes data (booleans)
 * 
 * @return object with 
 */
ChromTris.FallingObject = function(numberOfStates, matrixDimension, matrixes) {
    
    this.numberOfStates = numberOfStates;
    this.matrixDimension = matrixDimension;
    this.matrixes = matrixes;
    
    this.currentState = 0;
};

/**
 * Current matrix
 *
 * @return current matrix data
 */
ChromTris.FallingObject.prototype.currentMatrix = function() {
    return this.matrixes[this.currentState];
};

/** 
 * Turn the object clockwise - move in its matrixes by one to the right.
 */
ChromTris.FallingObject.prototype.turnClockwise = function() {
    this.currentState = (this.currentState + 1) % this.numberOfStates;    
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


