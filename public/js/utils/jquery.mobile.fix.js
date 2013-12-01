(function( $, undefined ) {

    $.widget( "mobile.textinput", $.mobile.textinput, {
        options: {
            additionalBtn: false,
            additionalBtnContent: "BTN",
            additionalBtnClass: "red",
            additionalBtnOnClick: function(){}
        },

        _create: function() {
            this._super();

            if ( !!this.options.additionalBtn ) {
                this._addAdditionalBtn();
            }
        },

        additionalButton: function() {

            return $( "<a href='#' class='ui-btn ui-input-add "+this.options.additionalBtnClass+"'>" + this.options.additionalBtnContent + "</a>" );

        },

        _addAdditionalBtn: function() {

            if ( !this.options.enhanced ) {
                this._enhanceAdditional();
            }

            $.extend( this, {
                _additionalBtn: this.widget().find("a.ui-input-add")
            });

            this._bindClearEvents();

        },

        _enhanceAdditional: function() {

            this.additionalButton().appendTo( this.widget() );
            this.widget().addClass( "ui-input-has-additional" );

        },

        _bindClearEvents: function() {

            this._on( this._additionalBtn, {
                "click": this.options.additionalBtnOnClick
            });

        },

        _unbindClear: function() {
            this._off( this._additionalBtn, "click");
        },

        _setOptions: function( options ) {
            this._super( options );

            if ( options.additionalBtn !== undefined && !this.element.is( "textarea, :jqmData(type='range')" ) ) {
                if ( options.additionalBtn ) {
                    this._addAdditionalBtn();
                } else {
                    this._destroyAdditional();
                }
            }

            if ( options.additionalBtnContent !== undefined && this._additionalBtn !== undefined ) {
                this._additionalBtn.text( options.additionalBtnContent );
            }
        },

        _destroyAdditional: function() {
            this.element.removeClass( "ui-input-has-additional" );
            this._unbindClear()._additionalBtn.remove();
        },

        _destroy: function() {
            this._super();
            this._destroyAdditional();
        }

    });

})( jQuery );