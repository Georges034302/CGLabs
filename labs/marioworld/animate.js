/* global THREE, backgroundMaterial, renderer, scene, camera */
/* global ghostSprite, clock, scrollOffset, backgroundRotation, marioOverlay, marioBaseX, marioBaseY, marioGroundY, marioFlyY, ghostBaseY, ghostBaseX, ghostCurrentX, ghostCurrentY, animatedVideos, ghostVideo */

var runMode = 'idle';
var marioMode = 'normal';
var runKeyState = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false
};
var runSettings = {
    idle: {
        backgroundSpeed: 0.11,
        ghostPlaybackRate: 0.18
    },
    slow: {
        backgroundSpeed: 0.055,
        ghostPlaybackRate: 0.18


    },
    fast: {
        backgroundSpeed: 0.25,
        ghostPlaybackRate: 0.18
    },
    superflyRun: {
        backgroundSpeed: 0.45,
        ghostPlaybackRate: 0.18
    },
    attack: {
        ghostPlaybackRate: 0.7,
        ghostMoveSpeed: 1.4
    },
    superfly: {
        ghostPlaybackRate: 0.85,
        ghostMoveSpeed: 1.0
    }
};
var currentBackgroundSpeed = runSettings.idle.backgroundSpeed;
var currentGhostPlaybackRate = runSettings.idle.ghostPlaybackRate;

function syncMarioOverlay() {
    var distance;
    var viewportHeight;
    var viewportWidth;
    var screenBottom;
    var flyBottom;
    var groundBottom;
    var spriteWidth;
    var spriteHeight;
    var flightProgress;

    if (!marioOverlay) {
        return;
    }

    distance = camera.position.z - 1;
    viewportHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * distance;
    viewportWidth = viewportHeight * camera.aspect;
    spriteWidth = (1.5 / viewportWidth) * window.innerWidth;
    spriteHeight = (1.5 / viewportHeight) * window.innerHeight;
    flightProgress = (marioBaseY - marioGroundY) / Math.max(0.001, marioFlyY - marioGroundY);
    flightProgress = Math.max(0, Math.min(1, flightProgress));
    groundBottom = ((2.5 - (1 / 6)) / viewportHeight) * window.innerHeight;
    flyBottom = window.innerHeight * 0.75;
    screenBottom = groundBottom + ((flyBottom - groundBottom) * flightProgress);

    marioOverlay.style.left = '50%';
    marioOverlay.style.top = 'auto';
    marioOverlay.style.bottom = screenBottom + 'px';
    marioOverlay.style.width = spriteWidth + 'px';
    marioOverlay.style.height = spriteHeight + 'px';
    marioOverlay.style.transform = 'translateX(-50%)';
    marioOverlay.style.display = 'block';
    marioOverlay.style.opacity = '1';
    marioOverlay.style.visibility = 'visible';
}

function updateMarioMode() {
    if (runKeyState.ArrowUp && runKeyState.ArrowRight) {
        marioMode = 'superfly';
        return;
    }

    if (runKeyState.ArrowUp) {
        marioMode = 'super';
        return;
    }

    marioMode = 'normal';
}

function updateMarioOverlayImage() {
    var nextSource;

    if (!marioOverlay) {
        return;
    }

    nextSource = marioMode === 'normal' ? 'mario.gif' : 'super.gif';
    if (marioOverlay.getAttribute('src') !== nextSource) {
        marioOverlay.setAttribute('src', nextSource);
    }

    marioOverlay.dataset.mode = marioMode;
}

function updateGhostAttack(delta) {
    var attackSettings;
    var targetX;
    var targetY;
    var deltaX;
    var deltaY;
    var distance;
    var maxStep;

    if (!ghostSprite) {
        return;
    }

    if (marioMode === 'normal') {
        currentGhostPlaybackRate += (runSettings.idle.ghostPlaybackRate - currentGhostPlaybackRate) * Math.min(1, delta * 4);
        ghostCurrentX += (ghostBaseX - ghostCurrentX) * Math.min(1, delta * 3.5);
        ghostCurrentY += (ghostBaseY - ghostCurrentY) * Math.min(1, delta * 3.5);
        return;
    }

    attackSettings = marioMode === 'superfly' ? runSettings.superfly : runSettings.attack;
    currentGhostPlaybackRate += (attackSettings.ghostPlaybackRate - currentGhostPlaybackRate) * Math.min(1, delta * 5);
    targetX = marioMode === 'superfly' ? marioBaseX - 3 : marioBaseX;
    targetY = marioMode === 'superfly' ? Math.min(marioBaseY - 2.2, ghostBaseY + 1.5) : marioBaseY;
    deltaX = targetX - ghostCurrentX;
    deltaY = targetY - ghostCurrentY;
    distance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));

    if (distance === 0) {
        return;
    }

    maxStep = attackSettings.ghostMoveSpeed * delta;
    if (maxStep >= distance) {
        ghostCurrentX = targetX;
        ghostCurrentY = targetY;
        return;
    }

    ghostCurrentX += (deltaX / distance) * maxStep;
    ghostCurrentY += (deltaY / distance) * maxStep;
}

function applyGhostCollisionRules() {
    var deltaX;
    var deltaY;
    var distance;

    if (!ghostSprite || marioMode === 'normal' || marioMode === 'superfly') {
        return;
    }

    deltaX = ghostCurrentX - marioBaseX;
    deltaY = ghostCurrentY - marioBaseY;
    distance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));

    if (distance < 1.05) {
        ghostCurrentX = marioBaseX - 0.2;
        ghostCurrentY = marioBaseY;
    }
}

function updateRunMode() {
    updateMarioMode();

    if (marioMode === 'super') {
        runMode = 'fast';
        return;
    }

    if (marioMode === 'superfly') {
        runMode = 'superflyRun';
        return;
    }

    if (runKeyState.ArrowRight) {
        runMode = 'fast';
        return;
    }

    if (runKeyState.ArrowLeft) {
        runMode = 'slow';
        return;
    }

    runMode = 'idle';
}

function handleRunKeyChange(event, isPressed) {
    if (event.key === 'ArrowLeft') {
        runKeyState.ArrowLeft = isPressed;
        updateRunMode();
        event.preventDefault();
    }

    if (event.key === 'ArrowRight') {
        runKeyState.ArrowRight = isPressed;
        updateRunMode();
        event.preventDefault();
    }

    if (event.key === 'ArrowUp') {
        runKeyState.ArrowUp = isPressed;
        updateRunMode();
        event.preventDefault();
    }
}

window.addEventListener('keydown', function(event) {
    handleRunKeyChange(event, true);
});

window.addEventListener('keyup', function(event) {
    handleRunKeyChange(event, false);
});

function animateScene() {
    var delta = clock.getDelta();
    var currentRunSettings = runSettings[runMode];
    var easing = Math.min(1, delta * (runMode === 'idle' ? 2.5 : 10));
    var verticalEasing = Math.min(1, delta * (marioMode === 'superfly' ? 1.0 : 1.5));

    currentBackgroundSpeed += (currentRunSettings.backgroundSpeed - currentBackgroundSpeed) * easing;
    marioBaseY += ((marioMode === 'superfly' ? marioFlyY : marioGroundY) - marioBaseY) * verticalEasing;

    for (var i = 0; i < animatedVideos.length; i += 1) {
        var video = animatedVideos[i];
        if (video.paused && video.readyState >= 2) {
            video.play().catch(function() {});
        }
    }

    updateMarioOverlayImage();

    if (ghostVideo && ghostVideo.readyState >= 2) {
        ghostVideo.playbackRate = currentGhostPlaybackRate;
    }

    if (backgroundMaterial && backgroundMaterial.map) {
        scrollOffset += currentBackgroundSpeed * delta;
        backgroundRotation = 0;
        backgroundMaterial.map.offset.x = scrollOffset;
        backgroundMaterial.map.rotation = backgroundRotation;
    }

    syncMarioOverlay();
    updateGhostAttack(delta);
    applyGhostCollisionRules();

    if (ghostSprite) {
        ghostSprite.position.x = ghostCurrentX;
        ghostSprite.position.y = ghostCurrentY;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animateScene);
}