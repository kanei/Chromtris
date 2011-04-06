var ChromTris = ChromTris || {};

importScripts('common/enums.js', 'common/constants.js', 'object.js', 'grid.js');

//against cheating 135 * 9 = 1215
var timeBetweenSteps = ChromTris.DATASIZE * ChromTris.WIDTH;

//against cheating 135 * 9 * 15 = 18225
var timeBetweenLevels = ChromTris.DATASIZE * ChromTris.WIDTH * ChromTris.HEIGHT;

var timeoutId;

//initialize first object
var nextObject = Math.floor(Math.random() * 7) + 1;

onmessage = function(e) {
    switch (e.data) {
        case ChromTris.Direction.Up:
        case ChromTris.Direction.Right:
        case ChromTris.Direction.Left:
            ChromTris.Grid.moveObject(e.data);
            postMessage(ChromTris.Grid.toString());
            break;
        // reset timeout after a successful move downwards
        case ChromTris.Direction.Down:
            if (ChromTris.Grid.moveObject(e.data)) {
                clearTimeout (timeoutId);
                timeoutId = setTimeout(performStep, timeBetweenSteps);
            }
            postMessage(ChromTris.Grid.toString());
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
            
            // if cannot insert new object, Game Over
            if (!ChromTris.Grid.addObject(nextObject)) {
                postMessage(ChromTris.Grid.toString());
                throw "Game Over";    
            }
            
            nextObject = Math.floor(Math.random() * 7) + 1;
        }
    }
    else {
        ChromTris.Grid.addObject(nextObject);
        nextObject = Math.floor(Math.random() * 7) + 1;
    }
    
    postMessage(ChromTris.Grid.toString());
    
    timeoutId = setTimeout(performStep, timeBetweenSteps);
};

increaseLevel = function() {
    //against cheating * 15 / 135 = * 0.9
    timeBetweenSteps = Math.floor(timeBetweenSteps * ChromTris.HEIGHT * ChromTris.CENTERY / ChromTris.DATASIZE);
};

ChromTris.Grid.init();

performStep();

setInterval(increaseLevel, timeBetweenLevels);

