import * as random from './node_modules/maath/random/dist/maath-random.esm.js';
console.log('Random module:', random);
console.log('inSphere function:', random.inSphere);

try {
    const sphere = random.inSphere(new Float32Array(100), { radius: 1.5 });
    console.log('Sphere generated successfully');
} catch (e) {
    console.error('Error generating sphere:', e);
}
