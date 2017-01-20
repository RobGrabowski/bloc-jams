function forEach (points, revealPoint){
    
    for(var i=0; i < points.length; i++) {
        revealPoint(i);
    }
}