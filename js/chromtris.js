var ChromTris = ChromTris || {};

ChromTris.isRunning = false;
ChromTris.isWorkerPending = false;

ChromTris.checkSupport = function() {
    if (!supports_canvas()) 
        return false; 
    var dummy_canvas = document.createElement('canvas');
    var context = dummy_canvas.getContext('2d');
    return typeof context.fillText == 'function';
};

ChromTris.init = function() {
    ChromTris.Overlay.init('ChromTrisOverlay');    
    ChromTris.Canvas.init('ChromTrisCanvas');
    ChromTris.Overlay.showStart(ChromTris.start);
};

ChromTris.start = function() {
    ChromTris.Debug.message('ChromTris.start()');
    if (ChromTris.isRunning) {
        return;
    }
    
    ChromTris.isRunning = true;
    ChromTris.Overlay.hideStart();
    ChromTris.Overlay.showGameOver(false);
    ChromTris.Debug.message('ChromTris.start(): initializing worker'); 
    ChromTris.initWorker('js/core/worker.js');
    
    _gaq.push(['_trackEvent','Game progress', 'Game started']);
};

ChromTris.stop = function() {
    if (!ChromTris.isRunning) {
        return;
    }
    
    ChromTris.worker.terminate();
    ChromTris.Debug.message('Stopped');
    ChromTris.isRunning = false;
    ChromTris.Overlay.showStart(ChromTris.start);
};

ChromTris.drawScore = function(score) {
    document.getElementById('score').innerHTML = score;   
};

ChromTris.initWorker = function(worker) {
    ChromTris.isWorkerPending = true;
    document.getElementById('ChromTrisLoader').style.display = 'block';
    
    ChromTris.worker = new Worker(worker);
    
    ChromTris.worker.onmessage = function(event) {
        if (ChromTris.isWorkerPending) {
            document.getElementById('ChromTrisLoader').style.display = 'none';
            ChromTris.isWorkerPending = false;
        }
        
        var response = event.data.split('|');
        
        var currentObject = parseInt(response[ChromTris.Response.CurrentObjectType], 10);
        var nextObject = parseInt(response[ChromTris.Response.NextObjectType], 10);
        var score = parseInt(response[ChromTris.Response.Score], 10);
        var messageType = parseInt(response[ChromTris.Response.MessageType], 10);
        var message = response[ChromTris.Response.MessageData];
        var grid = response[ChromTris.Response.GridData].split(',');
        
        ChromTris.Canvas.displayGrid(grid);  
        
        ChromTris.drawScore(score);
        
        ChromTris.Debug.grid(grid);
        
        if (nextObject) {
            ChromTris.Overlay.showObject(nextObject);
        }
        
        switch(messageType) {
            case ChromTris.MessageType.None:
                break;
            case ChromTris.MessageType.Debug:
                ChromTris.Debug.message(message);   
                break;
            case ChromTris.MessageType.Error:    
                break;
            case ChromTris.MessageType.GameOver:
                ChromTris.Overlay.showGameOver(true);
                ChromTris.HighScore.set(score);
                _gaq.push(['_trackEvent','Game progress', 'Score', score]);
                ChromTris.stop();
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
        ChromTris.init();
    }
    else {
        alert ('Your browser is not supported, sorry');
    }
};

window.onbeforeunload = function() {
    ChromTris.stop();
};
