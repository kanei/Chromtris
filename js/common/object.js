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
    
    this._numberOfStates = numberOfStates;
    this._currentState = 0;
    this._matrixes = matrixes;
    
    this.dimension = dimension;
};

ChromTris.FallingObject.prototype._nextState = function(state) {
    return (state + 1) % this._numberOfStates;
};

ChromTris.FallingObject.prototype._previousState = function(state) {
    return state === 0 ? this._numberOfStates - 1 : state - 1;
};

/**
 * Current matrix
 *
 * @return current matrix data
 */
ChromTris.FallingObject.prototype.activeMatrix = function() {
    return this._matrixes[this._currentState];
};

/**
 * Default matrix (at position 0)
 * 
 * @return default matrix of the object 
 */
 ChromTris.FallingObject.prototype.defaultMatrix = function() {
    return this._matrixes[0];   
 };

/** 
 * Turn the object clockwise - move in its matrixes by one to the right.
 */
ChromTris.FallingObject.prototype.turnClockwise = function() {
    this._currentState = _nextState(this._currentState);    
};

/**
 * Turn the object anti clockwise - move in its matrixes by one to the left
 */
ChromTris.FallingObject.prototype.turnAntiClockwise = function (obj) {
    this._currentState = this._previousState(this._currentState);
};

/**
 * Get matrix in direction of rotation
 */
ChromTris.FallingObject.prototype.nextMatrix = function(rotation) {
    var state = this._currentState;
    
    switch (rotation) {
        case ChromTris.Rotation.None:
            break;
        case ChromTris.Rotation.Clockwise:
            state = this._nextState(state);
            break;
        case ChromTris.Rotation.AntiClockwise:
            state = this._previousState(state);
            break;
    }
    
    return this._matrixes[state];
};

/**
 * Reset matrix to a default position (matrix no. 0)
 */
ChromTris.FallingObject.prototype.reset = function() {
    this._currentState = 0;   
};

ChromTris.Objects = [];

/**
 * Left El Object 
 * 
 * - X -
 * - X -
 * X X -
 * 
 */
ChromTris.Objects[ChromTris.ObjectType.LeftEl] = new ChromTris.FallingObject(
    4, 
    3, 
    [   [   [false, true, false], 
            [false, true, false], 
            [true, true, false]   
        ],
        [   [true, false, false],
            [true, true, true],
            [false, false, false]
        ],
        [   [false, true, true],
            [false, true, false],
            [false, true, false]
        ],
        [   [false, false, false],
            [true, true, true],
            [false, false, true]
        ]
    ]
);

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

/**
 * Left Zed Object 
 * 
 * - - -  |  - - X
 * X X -  |  - X X
 * - X X  |  - X -
 * 
 */
ChromTris.Objects[ChromTris.ObjectType.LeftZed] = new ChromTris.FallingObject(
    2, 
    3, 
    [   [   [false, false, false], 
            [true, true, false], 
            [false, true, true]   
        ],
        [   [false, false, true],
            [false, true, true],
            [false, true, false]
        ]
    ]
);

/**
 * Right Zed Object 
 * 
 * - - -  |  X - -
 * - X X  |  X X -
 * X X -  |  - X - 
 * 
 */
ChromTris.Objects[ChromTris.ObjectType.RightZed] = new ChromTris.FallingObject(
    2, 
    3, 
    [   [   [false, false, false], 
            [false, true, true], 
            [true, true, false]   
        ],
        [   [true, false, false],
            [true, true, false],
            [false, true, false]
        ]
    ]
);

/**
 * Line Object 
 * 
 * - X - -  |  - - - -
 * - X - -  |  - - - -
 * - X - -  |  X X X X
 * - X - -  |  - - - -
 * 
 */
ChromTris.Objects[ChromTris.ObjectType.Line] = new ChromTris.FallingObject(
    2, 
    4, 
    [   [   [false, true, false, false], 
            [false, true, false, false], 
            [false, true, false, false],
            [false, true, false, false] 
        ],
        [   [false, false, false, false], 
            [false, false, false, false], 
            [true, true, true, true],
            [false, false, false, false] 
        ]
    ]
);

/**
 * Square Object 
 * 
 * X X 
 * X X
 * 
 */
ChromTris.Objects[ChromTris.ObjectType.Square] = new ChromTris.FallingObject(
    1, 
    2, 
    [   [   [true, true], 
            [true, true]
        ]
    ]
);

/**
 * Ti Object 
 * 
 * - - -  |  X - -  |  X X X  |  - - X
 * - X -  |  X X -  |  - X -  |  - X X
 * X X X  |  X - -  |  - - -  |  - - X
 * 
 */
ChromTris.Objects[ChromTris.ObjectType.Ti] = new ChromTris.FallingObject(
    4, 
    3, 
    [   [   [false, false, false], 
            [false, true, false], 
            [true, true, true]   
        ],
        [   [true, false, false], 
            [true, true, false], 
            [true, false, false]   
        ],
        [   [true, true, true], 
            [false, true, false], 
            [false, false, false]   
        ],
        [   [false, false, true],
            [false, true, true],
            [false, false, true]
        ]
    ]
);

