import Ember from 'ember';

export default Ember.TextField.extend( {
    originalValue: '',

    addComma: function(){
        var numberValue = Number( this.get( 'value' ).toString().replace( /,/g, '' ) );
        if( !isNaN( numberValue ) ){
            var input = this.get( 'value' ).replace( /,/g, '' );
            var parts = input.split( '.' );
            var part1 = parts[ 0 ].replace( /(\d)(?=(\d\d\d)+(?!\d))/g, "$1," );
            var part2 = '';
            if( parts.length > 1 ){
                part2 = '.'
                part2 += parts[ 1 ] ? parts[ 1 ] : '';
            }

            this.set( 'value', part1 + part2 );
            this.set( 'realValue', numberValue );
        }
        else{
            this.set( 'realValue', this.get( 'originalValue' ) );
        }
    }.observes( 'value' ),

    init: function(){
        this._super();
        if( this.get( 'realValue' ) === null || this.get( 'realValue' ) === undefined ){
            this.set( 'realValue', 0 );
        }
        this.set( 'originalValue', this.get( 'realValue' ) );
        this.set( 'value', this.get( 'realValue' ) );
    }

} );
