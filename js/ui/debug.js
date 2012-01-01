var ChromTris = ChromTris || {};

ChromTris.Debug = {
    grid: function(grid) {
        if (!ChromTris.DEBUG)
            return;
            
        var html = '';
    
        for(i = 0; i < ChromTris.DATASIZE; i++) {
            html += grid[i] ? '<span style = "color: ' + ChromTris.Colors.console[grid[i]] + ';">' + grid[i] + ' </span>' : grid[i];
            
            if ((i + 1) % ChromTris.WIDTH === 0) 
                html += '<br />';
        }   
        
        document.getElementById('ChromTrisConsole').innerHTML = html;   
    },
    
    message: function(message) {
        if (!ChromTris.DEBUG)
            return;
        var time = new Date();
        
        document.getElementById('ChromTrisErrorConsole').innerHTML += 
            time.getMinutes() + ':' + time.getSeconds() + ' ' + time.getTime() % 1000 +': ' + message + '<br />';
    }
};