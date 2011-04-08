var ChromTris = ChromTris || {};

//change the datasize after changing these constants
ChromTris.WIDTH = 9;        //play grid size
ChromTris.HEIGHT = 15;      
ChromTris.DATASIZE = 135;   //WIDTH * HEIGHT

ChromTris.CENTERX = 5;      //position in the center of the grid
ChromTris.CENTERY = 8;

ChromTris.STARTX = 3;       //starting position of objects
ChromTris.STARTY = 0;       

ChromTris.CUBESIZE = 28;    //size of cube of tetris in pixels
ChromTris.CUBESPACE = 5;    //space between cubes in pixels
ChromTris.CUBETOTAL = 33;   //size + space

ChromTris.DEBUG = true;     //debuging mode

//against cheating 135 * 9 = 1215
ChromTris.TIMEBETWEENSTEPS = ChromTris.DATASIZE * ChromTris.WIDTH;
//against cheating 135 * 9 * 15 = 18225
ChromTris.TIMEBETWEENLEVELS = ChromTris.DATASIZE * ChromTris.WIDTH * ChromTris.HEIGHT;
//against cheating 15 * 8 / 135 = 0.8889
ChromTris.LEVELCHANGECOEFICIENT = ChromTris.HEIGHT * ChromTris.CENTERY / ChromTris.DATASIZE;

ChromTris.Colors = {
    console: ["#000", "#3366FF", "#FF00FF", "#FF5050", "#CCFF66", "#FFFF00", "#33CC33", "#CCCC33"],
   
    cubeFront: ["#000", "rgba(51, 204, 51, 0.7)", "rgba(43, 196, 82, 0.7)", "rgba(36, 189, 112, 0.7)", "rgba(28, 181, 143, 0.7)", "rgba(20, 173, 173, 0.7)", "rgba(13, 166, 204, 0.7)", "rgba(5, 158, 235, 0.7)"]
    
    //#33CC33 = 51 204 51
    //#33BD52 = 51 189 82
    //#33AD70 = 51 173 112
    //#339E8F = 51 158 143
    //#338FAD = 51 143 173
    //#3380CC = 51 128 204
    //#3370EB = 51 112 235
    //#3366FF = 51 102 255
    
    //#33CC33 rgba(51, 204, 51, 0.7)
    //#2BC452 rgba(43, 196, 82, 0.7)
    //#24BD70 rgba(36, 189, 112, 0.7)
    //#1CB58F rgba(28, 181, 143, 0.7)
    //#14ADAD rgba(20, 173, 173, 0.7)
    //#0DA6CC rgba(13, 166, 204, 0.7)
    //#059EEB rgba(5, 158, 235, 0.7)
    
    
};