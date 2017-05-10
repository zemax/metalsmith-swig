
# metalsmith-swig

  Compiles twig files using twig (https://github.com/justjohn/twig.js)

## Install

```bash
  npm install metalsmith-swig
```

## Usage

```js
var metalsmith = require( 'metalsmith' ),
	metal_twig = require( 'metalsmith-swig' );

metalsmith( __dirname )
	.source( './src' )
	.destination( './dist' )
	.use( metal_twig() )
	.build( function ( err ) {
		if ( err ) {
			throw err;
		}
	} );

```

## Options:

* `locales`: Defines *lang* keyed objects with strings to be used in twig with *trans(key)* (See /test/src/05-trans/05-trans.html.twig)
* `engine`: *(default: twig)* Set the engine (twig)

## License

  MIT