/* global backgroundMaterial, renderer, scene, camera */
/* global marioSprite, ghostSprite, clock, scrollOffset, marioBaseY, ghostBaseY, ghostBaseX, animatedVideos */

function animateScene() {
    var elapsed = clock.getElapsedTime();

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
        marioSprite.position.y = marioBaseY + Math.sin(elapsed * 10) * 0.14;
        marioSprite.material.rotation = Math.sin(elapsed * 10) * 0.03;
    }

    if (ghostSprite && marioSprite) {
        var ghostTargetX = ghostBaseX + Math.sin(elapsed * 1.6) * 0.35;
        ghostSprite.position.x += (ghostTargetX - ghostSprite.position.x) * 0.04;
        ghostSprite.position.y = ghostBaseY + Math.sin(elapsed * 3.5) * 0.28;

        // Keep the ghost behind Mario while still feeling like it follows him.
        if (ghostSprite.position.x > marioSprite.position.x - 0.9) {
            ghostSprite.position.x = marioSprite.position.x - 0.9;
        }
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animateScene);
}