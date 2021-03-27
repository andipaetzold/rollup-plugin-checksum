# rollup-plugin-checksum

Rollup plugin that emits a file containing the checksum of all emitted chunks and assets.

## Installation

```
npm install rollup-plugin-checksum --save-dev
```

or

```
yarn add rollup-plugin-checksum --dev
```

## Usage

The plugin must be added as last plugin.

```javascript
// rollup.config.js
import checksum from 'rollup-plugin-checksum';

export default {
	input: './index.js',
	plugins: [
		// other plugins
		checksum(/* options */)
	]
}
```

## Options

* `filename`: `"filename"`

  Name of the emitted file that contains the checksum

* `includeAssets`: `true`

  Whether or not to include assets when calculating the checksum