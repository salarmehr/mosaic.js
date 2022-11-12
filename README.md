Photo mosaic
------------

The goal of this repo is to implement the following flow in a client-side app.
1. A user selects a local image file.
2. The app loads that image, divides the image into tiles, computes the average
   color of each tile, fetches each tile from the server, and composites the
   results into a photomosaic of the original image.
3. The composited photomosaic should be displayed according to the following
   constraints:
    - tiles should be rendered a complete row at a time (a user should never
      see a row with some completed tiles and some incomplete)
    - the mosaic should be rendered from the top row to the bottom row.
4. The client app make effective use of parallelism and asynchrony.

The tile size is configurable via the code constants in js/mosaic.js.

