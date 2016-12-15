import Ember from 'ember';
var locale = new Globalize( navigator.language );

export default Ember.TextField.extend( {
    originalValue: '',

    addComma: function(){
        var numberValue = Number( this.get( 'value' ).toString().replace( /,/g, '' ) );
        if( !isNaN( numberValue ) ){
            //var z = parseFloat(Math.round(numberValue * 100) / 100).toFixed(2);
            //var z = parseFloat( numberValue, 10 ).toFixed( 2 );
            //this.set( 'value', z );
            this.set( 'value', locale.format( numberValue, 'n2' ) );
            //this.set( 'value', numberValue.toString().replace( /\B(?=(\d{3})+(?!\d))/g, "," ) );
            //this.set( 'realValue', numberValue );
            this.set( 'realValue', parseFloat( locale.format( numberValue, 'n2' ), 10 ).toFixed( 2 ) );
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
