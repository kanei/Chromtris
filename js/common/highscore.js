var ChromTris = ChromTris || {};

ChromTris.HighScore = {
    _test: function() {
        if (!localStorage)  
             throw "Local Storage is not supported.";     
    },
    
    set: function(score) {
        this._test();
        var values = this.get();
        values.push(score);
        localStorage['ChromTris.HighScore'] = values
            .sort(function(a, b){return b - a;})
            .slice(0, 5)
            .join('|');
        
    },
    
    get: function() {
        this._test();
        var highScore = localStorage['ChromTris.HighScore'];
        return highScore ? highScore.split('|') : [];
    }
};