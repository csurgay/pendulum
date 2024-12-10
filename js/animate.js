function animate() {
    // Clear canvas
    clearScreen();

    ps.forEach( p => { p.calculate(); p.draw(); })

//    if (params.runAnim) 
        requestAnimationFrame(animate);
}
