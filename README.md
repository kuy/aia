# AIA: Illustrator Automated

Script collection for Adobe Illustrator CC.

## Environment

- `macOS 10.14`
- `Python 2.7`
- `virtualenv 16.2.0`

## Installation

1. Download zip file from [this link](https://github.com/kuy/aia/archive/master.zip)
2. Unzip the file and put into script directory (ex. `/Applications⁩/⁨Adobe Illustrator CC 2019⁩/Presets⁩/en_US/Scripts⁩`)
3. Run script from `File > Scripts > Other Scripts...` menu in Adobe Illustrator

## Scripts

### `scatter-random-dots.jsx`

#### Usage

1. Create a rectangle path that covers you want to place dots
2. Select the rectangle
3. Run script

### **[DO NOT USE]** `slow-convex-hull.jsx`

*This script is not robust, too naive to use for production.*

### `convex-hull.jsx`

#### Usage

1. Select dots (paths)
2. Run script

### `camera-mapper`

#### Prepare

`source vent/bin/activate`
`pip install -r requirements.txt`

#### Run

1. Open blank canvas with Adobe Illustrator
2. Run `mapper.jsx` script
3. Focus text input
4. Run `camera.py` script

## Memo

`source .env/bin/activate`
`easy_install atomac`
`pip install pyobjc opencv-python`
`deactivate`

## Reference

- English - [Computational Geometry](https://www.springer.com/jp/book/9783662034279)
- 日本語 - [コンピュータ・ジオメトリ](https://www.kindaikagaku.co.jp/information/kd0277.htm)

## License

MIT

## Author

Yuki Kodama / [@kuy](https://twitter.com/kuy)

## Acknowledgements

Victor - http://victorjs.org
