var metalsmith = require( 'metalsmith' ),
	metal_twig = require( '..' );

var assert = require( 'assert' ),
	equal  = require( 'assert-dir-equal' );

describe( 'metalsmith-swig', function () {
	it( 'should render a basic template', function ( done ) {
		metalsmith( __dirname )
			.source( './src' )
			.destination( './build' )
			.use( metal_twig() )
			.build( function ( err ) {
				if ( err ) {
					return done( err );
				}
				equal( __dirname + '/expected', __dirname + '/build' );
				done();
			} );
	} );
} );
