document.onkeydown = function () {
    var KeyID = event.keyCode;
    switch(KeyID)
    {    
        //Up
        case 38:
            ChromTris.worker.postMessage(ChromTris.Direction.Up);
            break;
        //Right
        case 39:
            ChromTris.worker.postMessage(ChromTris.Direction.Right);
            break;
        //Left
        case 37:
            ChromTris.worker.postMessage(ChromTris.Direction.Left);
            break;
        //Down
        case 40:
            ChromTris.worker.postMessage(ChromTris.Direction.Down);
            break;
    }
};