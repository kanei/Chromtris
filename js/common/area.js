var ChromTris = ChromTris || {};

ChromTris.Area = function(startx, starty, width, height) {
    
    this.startx = startx;
    this.starty = starty;
    this.endx = startx + width;
    this.endy = starty + height;
};

ChromTris.Area.prototype.isOver = function(x, y) {
    return (x >= this.startx && x <= this.endx && y >= this.starty && y <= this.endy);
};
