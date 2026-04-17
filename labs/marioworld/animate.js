/* global backgroundMaterial, renderer, scene, camera */
/* global marioSprite, ghostSprite, clock, scrollOffset, marioBaseX, marioBaseY, ghostBaseY, ghostBaseX, animatedVideos */

function animateScene() {
    clock.getElapsedTime();

    for (var i = 0; i < animatedVideos.length; i += 1) {
        var video = animatedVideos[i];
        if (video.paused && video.readyState >= 2) {
            video.play().catch(function() {});
        }
    }

    if (backgroundMaterial && backgroundMaterial.map) {
        scrollOffset += 0.22 * clock.getDelta();
        backgroundMaterial.map.offset.x = -scrollOffset;
    }

    if (marioSprite) {
        marioSprite.position.x = marioBaseX;
        marioSprite.position.y = marioBaseY;
        marioSprite.material.rotation = 0;
    }

    if (ghostSprite) {
        ghostSprite.position.x = ghostBaseX;
        ghostSprite.position.y = ghostBaseY;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animateScene);
}