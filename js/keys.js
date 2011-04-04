document.onkeyup = function () {
    var KeyID = event.keyCode;
    switch(KeyID)
    {    
        //Up
        case 38:
            ChromTris.Grid.moveObject(ChromTris.Direction.Up);
            break;
        //Right
        case 39:
            ChromTris.Grid.moveObject(ChromTris.Direction.Right);
            break;
        //Left
        case 37:
            ChromTris.Grid.moveObject(ChromTris.Direction.Left);
            break;
        //Down
        case 40:
            ChromTris.Grid.moveObject(ChromTris.Direction.Down);
            break;
    }
    
    ChromTris.redraw();
};