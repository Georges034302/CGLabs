/* global THREE, scene, camera */

/* global textureLoader, backgroundMaterial, marioSprite, ghostSprite, animatedVideos */

function createBackground() {
    var bgTexture = textureLoader.load('background.png');
    bgTexture.wrapS = THREE.RepeatWrapping;
    bgTexture.wrapT = THREE.ClampToEdgeWrapping;
    bgTexture.repeat.set(camera.aspect * 1.6, 1);
    bgTexture.magFilter = THREE.NearestFilter;
    bgTexture.minFilter = THREE.LinearFilter;

    backgroundMaterial = new THREE.MeshBasicMaterial({ map: bgTexture });
    var backgroundGeometry = new THREE.PlaneGeometry(32, 18);
    var backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
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
            if (path === 'mario.mp4') {
                marioSprite = fallback;
            } else {
                ghostSprite = fallback;
            }
            scene.add(fallback);
        });
    }

    video.addEventListener('canplay', startVideo);
    animatedVideos.push(video);
    return sprite;
}

function addShapes() {
    createBackground();

    marioSprite = createVideoSprite('mario.mp4', 'mario.gif', 1.5, 1.5, 0, -4.5, 1);
    scene.add(marioSprite);

    ghostSprite = createVideoSprite('ghost.mp4', 'ghost.gif', 1.5, 1.5, -9.2, 4.8, -1.5);
    scene.add(ghostSprite);
}