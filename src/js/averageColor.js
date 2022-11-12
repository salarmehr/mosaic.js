'use strict';

function getAllAverageColor(canvas) {

    let context = window.context = canvas.getContext && canvas.getContext('2d'), m;
    let height = canvas.height;
    let width = canvas.width;
    let colors = [];
    let rows = Math.floor(height / TILE_HEIGHT);
    let columns = Math.floor(width / TILE_HEIGHT);
    for (let x = 0; x < columns; x++) {
        colors[x] = [];
        for (let y = 0; y < rows; y++) {
            colors[x][y] = m = averageColor(context.getImageData(x * TILE_WIDTH, y * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT));
        }
    }
    return colors;
}

function averageColor(data) {
    let length = data.data.length;
    let rgb = {r: 0, g: 0, b: 0};
    let count = 0;
    for (let i = 0; i < length; i += 4) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values in a more efficient way
    return {
        r: ~~(rgb.r / count),
        g: ~~(rgb.g / count),
        b: ~~(rgb.b / count)
    };
}

function rgbToHex(R, G, B) {
    return toHex(R) + toHex(G) + toHex(B)
}

function toHex(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) return "00";
    n = Math.max(0, Math.min(n, 255));
    return "0123456789ABCDEF".charAt((n - n % 16) / 16)
        + "0123456789ABCDEF".charAt(n % 16);
}