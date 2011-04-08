var ChromTris = ChromTris || {};

ChromTris.checkSupport = function() {
    if (!supports_canvas()) 
        return false; 
    var dummy_canvas = document.createElement('canvas');
    var context = dummy_canvas.getContext('2d');
    return typeof context.fillText == 'function';
};

ChromTris.start = function() {
    ChromTris.Overlay.init('ChromTrisOverlay');    
    ChromTris.Canvas.init('ChromTrisCanvas');
    
    ChromTris.initWorker('js/worker-min.js');
};

ChromTris.stop = function() {
    ChromTris.worker.terminate();
};

ChromTris.drawScore = function(score) {
    document.getElementById('score').innerHTML = score;   
};

ChromTris.initWorker = function(worker) {
    ChromTris.worker = new Worker(worker);
    
    ChromTris.worker.onmessage = function(event) {
        var response = event.data.split('|');
        
        var currentObject = parseInt(response[ChromTris.Response.CurrentObjectType], 10);
        var nextObject = parseInt(response[ChromTris.Response.NextObjectType], 10);
        var score = parseInt(response[ChromTris.Response.Score], 10);
        var messageType = parseInt(response[ChromTris.Response.MessageType], 10);
        var message = response[ChromTris.Response.MessageData];
        var grid = response[ChromTris.Response.GridData].split(',');
        
        ChromTris.Canvas.displayGrid(grid);  
        
        ChromTris.drawScore(score);
        
        if (nextObject) {
            ChromTris.Overlay.showObject(nextObject);
        }
        
        switch(messageType) {
            case ChromTris.MessageType.None:
                break;
            case ChromTris.MessageType.Debug: 
                break;
            case ChromTris.MessageType.Error:    
                break;
            case ChromTris.MessageType.GameOver:   
                ChromTris.Overlay.showGameOver(true);
                break;
                            
        }
    };
    
    ChromTris.worker.onerror = function(error) {
        document.getElementById('ChromTrisErrorConsole').innerHTML += error.message + '<br />';
        event.preventDefault();
    };
};

window.onload = function() {  
    if (ChromTris.checkSupport) {
        ChromTris.start();
    }
    else {
        alert ('Your browser is not supported, sorry');
    }
};

window.onbeforeunload = function() {
    ChromTris.stop();
};
