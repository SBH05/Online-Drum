const context = new AudioContext();

window.addEventListener('load', () => {
    const buttonEl = document.getElementById('start-audio');
    buttonEl.disabled = false;
    buttonEl.addEventListener('click', () => context.resume());
});

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
    switch (event.key) {

        case 'q':
            sample = await hihatSample;
            break;        
        case 'w':
            sample = await crashSample;
            break;        
        case 'e':
            sample = await rideSample ;
            break;        
        case 'a':
            sample = await snareSample;
            break;
        case 's':
            sample = await smallSample;
            break;
        case 'd':
            sample = await middleSample;
            break;
        case 'z':
            sample = await floorSample;
            break;
        case 'x':
            sample = await kickSample;
            break;

        default:
            return; 
    }

    playSample(sample, context);

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



