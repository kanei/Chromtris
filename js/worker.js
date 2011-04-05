var ChromTris = ChromTris || {};

var timeBetweenSteps = 1000;

var timeoutId;

importScripts('enums.js', 'object.js', 'colors.js', 'grid.js');

onmessage = function(e) {
    switch (e.data) {
        case ChromTris.Direction.Up:
        case ChromTris.Direction.Right:
        case ChromTris.Direction.Down:
        case ChromTris.Direction.Left:
            ChromTris.Grid.moveObject(e.data);
            postMessage(ChromTris.Grid.toHtml());
            break;
    }
    
    //Reset timer after going downwards
    switch (e.data) {
        case ChromTris.Direction.Down:
            clearTimeout (timeoutId);
            timeoutId = setTimeout(performStep, timeBetweenSteps);
            break;
    }
};

performStep = function() {
    if (ChromTris.Grid.hasObject()) {
        if (!ChromTris.Grid.moveObject(ChromTris.Direction.Down)) {
            ChromTris.Grid.storeObject();
            
            var deletedLines = ChromTris.Grid.deleteFullLines();
            
            //if (deletedLines.length > 0) {
            //    throw "Following lines were deleted: " + deletedLines.join();
            //}
            
            ChromTris.Grid.addObject(Math.floor(Math.random() * 6) + 1);
        }
    }
    else {
        ChromTris.Grid.addObject(Math.floor(Math.random() * 6) + 1);
    }
    
    postMessage(ChromTris.Grid.toHtml());
    
    timeoutId = setTimeout(performStep, timeBetweenSteps);
};

ChromTris.Grid.init();

performStep();

