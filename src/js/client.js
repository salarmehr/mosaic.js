// Reza Salarmehr

"use strict";

document.getElementById('fileInput').addEventListener('change', render, false);

// step 1
let calculateAverageColors = function () {
    return new Promise(function (resolve, reject) {
        let canvas = document.getElementById('preview')
        let colors = getAllAverageColor(canvas);
        console.log(colors);
        resolve(colors)
    });
};

// step 2
let fetchAColumnRow = function (colors) {
    let row = '';
    for (let y = 0; y < colors[0].length; y++) {
        let rowPromises = [];
        for (let x = 0; x < colors.length; x++) {
            let color = colors[x][y];
            rowPromises[x] = fetch('/color/' + rgbToHex(color.r, color.g, color.b)).then(function (res) {
                return res.text()
            }).then(text => {
                return text;
            });
        }
        row = '';
        Promise.all(rowPromises).then(values => {
            document.getElementById('mosaic').insertAdjacentHTML('beforeend', `<div style="height:${TILE_HEIGHT}px">${values.join('')}</div>`);
        });
        rowPromises = [];
    }
};

function render(e) {
    let canvas = document.getElementById('preview');
    let ctx = canvas.getContext('2d');
    let reader = new FileReader();
    reader.onload = function (event) {
        document.getElementById('mosaic').innerHTML = ''; // cleaning previous image mosaic if presents
        let img = new Image();
        img.src = event.target.result;
        img.onload = function () {
            let tiles = img.height * img.width / TILE_WIDTH / TILE_HEIGHT > 200;
            if (tiles > 200) {
                let message = 'Too big image regarding tile size. (tiles:' + tiles + ')';
                alert(message);
                throw new Error(message);
            }
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // doing the magic
            calculateAverageColors()
                .then(fetchAColumnRow);
        };
    };
    reader.readAsDataURL(e.target.files[0]);
}