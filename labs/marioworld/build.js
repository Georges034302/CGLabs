/* global THREE, scene, camera */

/* global textureLoader, backgroundMaterial, backgroundMesh, ghostSprite, animatedVideos, ghostVideo */
/* global marioOverlay, marioBaseX, marioGroundY, ghostBaseX, ghostBaseY, ghostCurrentX, ghostCurrentY */

function getBackgroundViewportSize() {
    var distance = camera.position.z + 10;
    var height = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * distance;

    return {
        width: height * camera.aspect,
        height: height
    };
}

function updateBackgroundSize() {
    var viewportSize = getBackgroundViewportSize();

    if (!backgroundMesh) {
        return;
    }

    backgroundMesh.scale.set(viewportSize.width, viewportSize.height, 1);
}

function createBackground() {
    var bgTexture = textureLoader.load('background.png');
    bgTexture.wrapS = THREE.RepeatWrapping;
    bgTexture.wrapT = THREE.ClampToEdgeWrapping;
    bgTexture.repeat.set(1, 1);
    bgTexture.center.set(0.5, 0.5);
    bgTexture.magFilter = THREE.NearestFilter;
    bgTexture.minFilter = THREE.LinearFilter;

    backgroundMaterial = new THREE.MeshBasicMaterial({ map: bgTexture });
    var backgroundGeometry = new THREE.PlaneGeometry(1, 1);
    backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
    updateBackgroundSize();
    backgroundMesh.position.set(0, 0, -10);
    scene.add(backgroundMesh);
}

function createImageSprite(path, scaleX, scaleY, x, y, z) {
    var texture = textureLoader.load(path);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearFilter;
    var material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.02
    });
    material.onBeforeCompile = function(shader) {
        shader.fragmentShader = shader.fragmentShader.replace(
            '#include <map_fragment>',
            [
                '#ifdef USE_MAP',
                '    vec4 sampledDiffuseColor = texture2D(map, vUv);',
                '    float brightness = max(max(sampledDiffuseColor.r, sampledDiffuseColor.g), sampledDiffuseColor.b);',
                '    float keyedAlpha = smoothstep(0.03, 0.14, brightness);',
                '    sampledDiffuseColor.a *= keyedAlpha;',
                '    diffuseColor *= sampledDiffuseColor;',
                '#endif'
            ].join('\n')
        );
    };
    var sprite = new THREE.Sprite(material);
    sprite.scale.set(scaleX, scaleY, 1);
    sprite.position.set(x, y, z);
    return sprite;
}

function createVideoSprite(path, fallbackPath, scaleX, scaleY, x, y, z) {
    var video = document.createElement('video');
    video.src = path;
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;


    video.preload = 'auto';
    if (path === 'ghost.mp4') {
        video.playbackRate = 0.18;
    }

    var texture = new THREE.VideoTexture(video);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearFilter;

    var material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.02
    });
    material.onBeforeCompile = function(shader) {
        shader.fragmentShader = shader.fragmentShader.replace(
            '#include <map_fragment>',
            [
                '#ifdef USE_MAP',
                '    vec4 sampledDiffuseColor = texture2D(map, vUv);',
                '    float brightness = max(max(sampledDiffuseColor.r, sampledDiffuseColor.g), sampledDiffuseColor.b);',
                '    float keyedAlpha = smoothstep(0.03, 0.14, brightness);',
                '    sampledDiffuseColor.a *= keyedAlpha;',
                '    diffuseColor *= sampledDiffuseColor;',
                '#endif'
            ].join('\n')
        );
    };

    var sprite = new THREE.Sprite(material);
    sprite.scale.set(scaleX, scaleY, 1);
    sprite.position.set(x, y, z);

    if (path === 'ghost.mp4') {
        ghostVideo = video;
    }

    var started = false;
    function startVideo() {
        if (started) {
            return;
        }
        started = true;
        if (path === 'ghost.mp4') {
            video.playbackRate = 0.18;
        }
        video.play().catch(function() {
            scene.remove(sprite);
            var fallback = createImageSprite(fallbackPath, scaleX, scaleY, x, y, z);
            if (path === 'ghost.mp4') {
                ghostSprite = fallback;
            }
            scene.add(fallback);
        });
    }

    video.addEventListener('canplay', startVideo);
    animatedVideos.push(video);
    return sprite;
}

function createMarioOverlay() {
    if (!marioOverlay) {
        return;
    }

    marioOverlay.src = 'mario.gif';
    marioOverlay.dataset.mode = 'normal';
    marioOverlay.style.position = 'fixed';
    marioOverlay.style.left = '50%';
    marioOverlay.style.bottom = '72px';
    marioOverlay.style.top = 'auto';
    marioOverlay.style.width = '96px';
    marioOverlay.style.height = '96px';
    marioOverlay.style.transform = 'translateX(-50%)';
    marioOverlay.style.pointerEvents = 'none';
    marioOverlay.style.zIndex = '5';
    marioOverlay.style.display = 'block';
    marioOverlay.style.visibility = 'visible';
    marioOverlay.style.opacity = '1';
}

function addShapes() {
    createBackground();
    createMarioOverlay();

    ghostCurrentX = ghostBaseX;
    ghostCurrentY = ghostBaseY;
    ghostSprite = createVideoSprite('ghost.mp4', 'ghost.gif', 1.5, 1.5, ghostCurrentX, ghostCurrentY, -1.5);
    scene.add(ghostSprite);
}