var ChromTris = ChromTris || {};

ChromTris.Worker = {
    _timeBetweenSteps: ChromTris.TIMEBETWEENSTEPS,
    
    _timeBetweenLevels: ChromTris.TIMEBETWEENLEVELS,
    
    _timeoutId: 0,
    
    //initialize first object
    _nextObject: 0,
    
    _score: 0,
    
    _level: 0,
    
    /**
     * returns random object type
     * 
     * @return random object enum from ChromTris.ObjectType
     */
    _getRandomObjectType: function() {
        return Math.floor(Math.random() * 7) + 1;
    },
    
    /**
     * function to create correct response to the master page
     * can be called without parameters
     * 
     * response format:
     * currentObjectType|nextObjectType|messageType|messageData|gridData
     * 
     * @messageType enum of ChromTris.MessageType 
     * @message string with the message - will be ignoret if messageType = MessageType.None
     */
    _respond: function(messageType, message) {
        
        if (messageType === undefined) {
            messageType = ChromTris.MessageType.None;
            message = '';
        }
        
        var response = [];
        response[ChromTris.Response.CurrentObjectType] = ChromTris.Grid.currentObject(); 
        response[ChromTris.Response.NextObjectType] = this._nextObject;
        response[ChromTris.Response.MessageType] = messageType;
        response[ChromTris.Response.Score] = this._score;
        response[ChromTris.Response.MessageData] = message;
        response[ChromTris.Response.GridData] = ChromTris.Grid.toString();
        
        postMessage(response.join('|'));
    },
    
    //initializes the worker process
    init: function() {        
        this._nextObject = this._getRandomObjectType();
        
        ChromTris.Grid.init();

        this.performStep();
                
        setInterval(ChromTris.Worker.increaseLevel, this._timeBetweenLevels);
    },
    
    /**
     * Functionality to be executed when message from main window is received
     */
    onmessage: function(event) {
        switch (event.data) {
            case ChromTris.Direction.Up:
            case ChromTris.Direction.Right:
            case ChromTris.Direction.Left:
                ChromTris.Grid.moveObject(event.data);
                this._respond();
                break;
            // reset timeout after a successful move downwards
            case ChromTris.Direction.Down:
                if (ChromTris.Grid.moveObject(event.data)) {
                    clearTimeout (this._timeoutId);
                    this._timeoutId = setTimeout(ChromTris.Worker.performStep, this._timeBetweenSteps);
                }
                this._respond();
                break;
        }
    },
    
    /**
     * performs one step of the game
     */
    performStep: function() {
        var messageType;
        var message = '';
        
        //hack to fix javascripts object handling when called by setTimeout() function
        var worker = ChromTris.Worker;
        
        if (ChromTris.Grid.hasObject()) {
            if (!ChromTris.Grid.moveObject(ChromTris.Direction.Down)) {
                ChromTris.Grid.storeObject();
                
                var deletedLines = ChromTris.Grid.deleteFullLines();
                
                if (deletedLines.length > 0) {
                    worker._score += (deletedLines.length + 3) * deletedLines.length; //(deletedLines.Length + 3) *
                    messageType = ChromTris.MessageType.Debug;
                    message = "Following lines were deleted: " + deletedLines.join(" ");
                }
                
                // if cannot insert new object, Game Over
                if (!ChromTris.Grid.addObject(ChromTris.Worker._nextObject)) {
                    messageType = ChromTris.MessageType.GameOver;
                    worker._respond(messageType);

                    return;
                }
                
                worker._nextObject = ChromTris.Worker._getRandomObjectType();
                worker._score += ChromTris.WIDTH - ChromTris.CENTERY;
            }
        }
        else {
            ChromTris.Grid.addObject(ChromTris.Worker._nextObject);
            worker._nextObject = ChromTris.Worker._getRandomObjectType();
            
            // anti cheating 9 - 8 = 1
            worker._score += ChromTris.WIDTH - ChromTris.CENTERY;
        }
        
        worker._respond(messageType, message);
        
        worker._timeoutId = setTimeout(ChromTris.Worker.performStep, worker._timeBetweenSteps);
    },    
    
    /** 
     * increases speed of the game
     */
    increaseLevel: function() {
        //hack to fix javascripts object handling when called by setTimeout() function
        var worker = ChromTris.Worker;
        
        //against cheating * 15 / 135 = * 0.9
        worker._timeBetweenSteps = Math.floor(worker._timeBetweenSteps * ChromTris.LEVELCHANGECOEFICIENT);
        worker._level++;
    }
};

/**
 * function called when data from main page is received
 */
self.addEventListener('message', function(e) {
  ChromTris.Worker.onmessage(e);
}, false);

ChromTris.Worker.init();