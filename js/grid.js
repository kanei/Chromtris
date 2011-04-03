var ChromTris = ChromTris || {};

ChromTris.Grid = {
    //change the datasize after changing these constants
    width: 9,
    height: 16,

    dataSize: 144,

    data: [],
    
    init: function() {
        //widht * height
        var length = 9*16;
        for(i = 0; i < this.dataSize; i++) {
            this.data[i] = false;
        }
    },
    
    toHtml: function() {
        var html = '';
        for(i = 0; i < this.dataSize; i++) {
            html += this.data[i] ? 'X' : '-';
            if ((i + 1) % this.width === 0) 
                html += '<br />';
        }
        
        return html;
    }
};

ChromTris.Grid.init();
