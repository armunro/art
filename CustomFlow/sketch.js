let xOff = 0; // Noise offset

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background('#0f0f0f11');

    let amplitudeVariance = 0.1; // Controls the amount of random amplitude variance
    let phaseVariance = PI / 4; // Controls the amount of random phase variance
    let frequency = 1; // Frequency of the sine wave
    let duration = 1; // Duration of the wave in seconds
    let samplingRate = 1000; // Number of samples per second

    let wave = randomSineWave(amplitudeVariance, phaseVariance, frequency, duration, samplingRate);

    noFill();
    beginShape();
    stroke(random(0,255),random(0,255),random(0,255));
    for (let i = 0; i < wave.length; i++) {
        vertex(i, height/2 - wave[i] * height/4);
    }
    endShape();

    //noLoop(); // Uncomment this line to generate a static wave
}

function randomSineWave(amplitudeVariance, phaseVariance, frequency, duration, samplingRate) {
    let wave = [];
    for (let i = 0; i < duration * samplingRate; i++) {
        let amplitude = 1 + map(noise(xOff), 0, 1, -amplitudeVariance, amplitudeVariance);
        let phase = map(noise(xOff + 1000), 0, 1, -phaseVariance, phaseVariance);
        let time = i / samplingRate;
        wave.push(amplitude * sin(2 * PI * frequency * time + phase));
        xOff += 0.01; // Noise increment
    }
    return wave;
}