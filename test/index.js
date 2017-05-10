var metalsmith = require( 'metalsmith' ),
	metal_twig = require( '..' );

var assert = require( 'assert' ),
	equal  = require( 'assert-dir-equal' );

describe( 'metalsmith-swig', function () {
	it( 'should render static file', function ( done ) {
		metalsmith( __dirname )
			.source( './src/01-dummy' )
			.destination( './build/01-dummy' )
			.use( metal_twig() )
			.build( function ( err ) {
				if ( err ) {
					return done( err );
				}
				equal( __dirname + '/expected/01-dummy', __dirname + '/build/01-dummy' );
				done();
			} );
	} );

	it( 'should render file with var', function ( done ) {
		metalsmith( __dirname )
			.source( './src/02-var' )
			.destination( './build/02-var' )
			.use( metal_twig() )
			.build( function ( err ) {
				if ( err ) {
					return done( err );
				}
				equal( __dirname + '/expected/02-var', __dirname + '/build/02-var' );
				done();
			} );
	} );

	it( 'should render file with include', function ( done ) {
		metalsmith( __dirname )
			.source( './src/03-include' )
			.destination( './build/03-include' )
			.use( metal_twig() )
			.build( function ( err ) {
				if ( err ) {
					return done( err );
				}
				equal( __dirname + '/expected/03-include', __dirname + '/build/03-include' );
				done();
			} );
	} );

	it( 'should render file with extend', function ( done ) {
		metalsmith( __dirname )
			.source( './src/04-extend' )
			.destination( './build/04-extend' )
			.use( metal_twig() )
			.build( function ( err ) {
				if ( err ) {
					return done( err );
				}
				equal( __dirname + '/expected/04-extend', __dirname + '/build/04-extend' );
				done();
			} );
	} );

	it( 'should render file with trans', function ( done ) {
		metalsmith( __dirname )
			.source( './src/05-trans' )
			.destination( './build/05-trans' )
			.use( metal_twig( {
								  locales: {
									  en: {
										  hello: 'Hello World',
									  }
								  }
							  } ) )
			.build( function ( err ) {
				if ( err ) {
					return done( err );
				}
				equal( __dirname + '/expected/05-trans', __dirname + '/build/05-trans' );
				done();
			} );
	} );
} );
