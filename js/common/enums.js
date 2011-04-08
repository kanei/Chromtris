var ChromTris = ChromTris || {};

ChromTris.ObjectType = {
    None:       0,
    LeftEl:     1,
    RightEl:    2,
    LeftZed:    3,
    RightZed:   4,
    Line:       5,
    Square:     6,
    Ti:         7
};

ChromTris.MessageType = {
    None:       0,
    Debug:      1,
    Error:      2,
    GameOver:   3
};

ChromTris.Response = {
    CurrentObjectType:  0,
    NextObjectType:     1,
    Score:              2,
    MessageType:        3,
    MessageData:        4,
    GridData:           5
};

ChromTris.Direction = {
    None: 0,
    Up: 1, 
    Right: 2, 
    Bottom: 3,
    Left: 4
};

ChromTris.Rotation = {
    None: 0,
    Clockwise: 1,
    AntiClockwise: 2
};