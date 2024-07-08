const context = new AudioContext();


// 드럼 소리 샘플 파일을 불러오기
const loadSample = async (url) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await context.decodeAudioData(arrayBuffer);
};

// 각 드럼 소리 샘플을 불러옴
const hihatSample = loadSample('sound/drum_hihat.wav');
const rideSample = loadSample('sound/drum_ride.wav');
const crashSample = loadSample('sound/drum_crash.wav');

const snareSample = loadSample('sound/drum_snare.wav');
const smallSample = loadSample('sound/drum_htom.wav');
const middleSample = loadSample('sound/drum_ltom.wav');

const kickSample = loadSample('sound/drum_kick.wav');
const floorSample = loadSample('sound/drum_floor.wav');


// audioBuffer 재생하기
const playSample = (audioBuffer, audioContext) => {
    const bufferSource = new AudioBufferSourceNode(audioContext, { buffer: audioBuffer });
    const amp = new GainNode(audioContext);
    bufferSource.connect(amp).connect(audioContext.destination);
    bufferSource.start();
};

class DrumCell {
    constructor(outputNode, audioBuffer) {
        this._context = outputNode.context;
        this._buffer = audioBuffer;
        this._outputNode = outputNode;
    }

    playSample() {
        const bufferSource = new AudioBufferSourceNode(this._context, { buffer: this._buffer });
        const amp = new GainNode(this._context);
        bufferSource.connect(amp).connect(this._outputNode);
        bufferSource.start();
    }
}

document.addEventListener('keydown', async (event) => {
    let sample;
    let pad;

    switch (event.key) {
        case 'q':
            sample = await hihatSample;
            pad = document.getElementById('hihat');
            break;        
        case 'w':
            sample = await crashSample;
            pad = document.getElementById('crash');
            break;        
        case 'e':
            sample = await rideSample;
            pad = document.getElementById('ride');
            break;        
        case 'a':
            sample = await snareSample;
            pad = document.getElementById('snare');
            break;
        case 's':
            sample = await smallSample;
            pad = document.getElementById('small-tom');
            break;
        case 'd':
            sample = await middleSample;
            pad = document.getElementById('middle-tom');
            break;
        case 'z':
            sample = await floorSample;
            pad = document.getElementById('floor-tom');
            break;
        case 'x':
            sample = await kickSample;
            pad = document.getElementById('kick');
            break;
        default:
            return;
    }

    if (pad) {
        pad.classList.add('active');
    }

    playSample(sample, context);

    document.addEventListener('keyup', (event) => {
        if (pad) {
            pad.classList.remove('active');
        }
    }, { once: true });
});




document.querySelectorAll('.drum-pad').forEach(pad => {
    pad.addEventListener('click', async () => {
        let sample;
        switch (pad.id) {
            case 'hihat':
                sample = await hihatSample;
                break;
            case 'crash':
                sample = await crashSample;
                break;
            case 'ride':
                sample = await rideSample;
                break;
            case 'snare':
                sample = await snareSample;
                break;
            case 'small-tom':
                sample = await smallSample;
                break;
            case 'middle-tom':
                sample = await middleSample;
                break;
            case 'floor-tom':
                sample = await floorSample;
                break;
            case 'kick':
                sample = await kickSample;
                break;
        }
        playSample(sample, context);
    });
});



