const sharp = require("sharp");

const ROW_LENGTH = 180

const createTileBuffer = async function () {
    const tile = sharp({
        create: { height: 150, width: 150, channels: 4, background: '#fff' }
    });
    return tile.png().toBuffer();
}

const run = async function () {
    const tiles = [];

    for (const index in Array.from({ length: ROW_LENGTH })) {
        tiles.push(await createTileBuffer())
    }

    const rowBg = sharp({
        create: { height: 150, width: ROW_LENGTH * 150, channels: 4, background: '#fff' }
    });

    const rowSharp = rowBg.composite(tiles.map((input, index) => ({
        input,
        blend: 'atop',
        top: 0,
        left: index * 150
    })));

    // Error will be thrown here  
    await rowSharp.toBuffer()
}

run()