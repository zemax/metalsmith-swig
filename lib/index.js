var basename = require( 'path' ).basename,
	dirname  = require( 'path' ).dirname,
	extname  = require( 'path' ).extname,
	twig     = require( 'twig' ).twig;

var extensions = /\.(twig)$/;

var plugin = function ( options ) {
	options = Object.assign( { engine: 'twig' }, options );

	return function ( files, metalsmith, done ) {
		var metadata = metalsmith.metadata();

		if ( !!metadata.urls ) {
			Object.keys( metadata.urls ).forEach( function ( key ) {
				var u                = metadata.urls[ key ];
				var v                = u.replace( extensions, '' );
				metadata.urls[ key ] = v;
			} );
		}

		var templates_dir = options.directory || metalsmith.source();

		setImmediate( done );
		Object.keys( files ).forEach( function ( file ) {
			if ( !is_swig( file ) ) {
				return;
			}
			var data = files[ file ];
			var dir  = dirname( file );
			var html = basename( file, extname( file ) );

			if ( html.substr( 0, 1 ) == '_' ) {
				delete files[ file ];
				return;
			}

			if ( '.' != dir ) {
				html = dir + '/' + html;
			}

			if ( !!data.url ) {
				data.url = data.url.replace( extensions, '' );
			}

			if ( !!data.absolute_url ) {
				data.absolute_url = data.absolute_url.replace( extensions, '' );
			}

			var context = Object.assign( {}, metadata, data );

			context.trans = function ( str ) {
				if ( !!options.locales && !!context.lang && !!options.locales[ context.lang ] && !!options.locales[ context.lang ][ str ] ) {
					return options.locales[ context.lang ][ str ];
				}

				return '';
			};

			var str;
			if ( options.engine == 'twig' ) {
				var tmpl  = twig( { data: data.contents.toString() } );
				tmpl.path = templates_dir + '/' + file;
				str       = tmpl.render( context );
			}

			data.contents = new Buffer( str );

			delete files[ file ];
			files[ html ] = data;
		} );
	};
};

function is_swig( file ) {
	return extensions.test( extname( file ) );
}

module.exports = plugin;
