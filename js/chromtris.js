var ChromTris = ChromTris || {};

ChromTris.start = function() {
    ChromTris.Overlay.init('ChromTrisOverlay');
    
    ChromTris.Overlay.showObject(ChromTris.ObjectType.Square);
    
    ChromTris.Canvas.init('ChromTrisCanvas');
    
    ChromTris.worker = new Worker('js/worker.js');
    
    ChromTris.worker.onmessage = function(event) {
        
        var grid = event.data.split(',');
        
        if (ChromTris.DEBUG) 
            ChromTris.debugData(grid);
            
        ChromTris.Canvas.displayGrid(grid);  
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

ChromTris.stop = function() {
    ChromTris.worker.terminate();
};

window.onload = function() {    
    ChromTris.start();
};

window.onbeforeunload = function() {
    ChromTris.stop();
};

ChromTris.toHtml = function(object) {
    var result = '';
    for (state = 0; state < object.numberOfStates; state++) {
        result += '<p>';
        var matrix = object.activeMatrix();
        for (i = 0; i < object.matrixDimension; i++) {
            for (j = 0; j < object.matrixDimension; j ++) {
                result += matrix[i][j] ? 'X' : '-';
            }
            result += '<br />';
        }
        object.turnClockwise();
    }    
    return result;
};
