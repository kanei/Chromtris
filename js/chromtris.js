var ChromTris = ChromTris || {};

ChromTris.start = function() {
    ChromTris.Overlay.init('ChromTrisOverlay');    
    ChromTris.Canvas.init('ChromTrisCanvas');
    
    ChromTris.Overlay.showObject(ChromTris.ObjectType.Square);
    
    ChromTris.initWorker('js/core/worker.js');
};

ChromTris.stop = function() {
    ChromTris.worker.terminate();
};

ChromTris.initWorker = function(worker) {
    ChromTris.worker = new Worker(worker);
    
    ChromTris.worker.onmessage = function(event) {
        var grid = event.data.split(',');      
        ChromTris.Canvas.displayGrid(grid);  
        
        if (ChromTris.DEBUG) 
            ChromTris.debugData(grid);
    };
    
    ChromTris.worker.onerror = function(error) {
        document.getElementById('ChromTrisErrorConsole').innerHTML += error.message + '<br />';
        event.preventDefault();
    };
};

ChromTris.debugData = function (grid) {
    var html = '';
    
    for(i = 0; i < ChromTris.DATASIZE; i++) {
        html += grid[i] ? '<span style = "color: ' + ChromTris.Colors.console[grid[i]] + ';">' + grid[i] + ' </span>' : grid[i];
        
        if ((i + 1) % ChromTris.WIDTH === 0) 
            html += '<br />';
    }   
    
    document.getElementById('ChromTrisConsole').innerHTML = html;
};

window.onload = function() {    
    ChromTris.start();
};

window.onbeforeunload = function() {
    ChromTris.stop();
};
