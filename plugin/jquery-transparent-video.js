(function ( $ ) {
 
     $.fn.getCSS = function(){
        var dom = this.get(0);
        var style;
        var returns = {};
        if(window.getComputedStyle){
            var camelize = function(a,b){
                return b.toUpperCase();
            };
            style = window.getComputedStyle(dom, null);
            for(var i = 0, l = style.length; i < l; i++){
                var prop = style[i];
                var camel = prop.replace(/\-([a-z])/g, camelize);
                var val = style.getPropertyValue(prop);
                returns[camel] = val;
            };
            return returns;
        };
        if(style = dom.currentStyle){
            for(var prop in style){
                returns[prop] = style[prop];
            };
            return returns;
        };
        return this.css();
    }
    
    $.fn.transparentVideo = function() {
        console.log('Instal for',this);
        this[0].videoOutput = $('<canvas>'); var c = this.getCSS();
        this[0].videoBuffer = $('<canvas>');
        this[0].videoBuffer.attr('width',this.attr('width')); this[0].videoBuffer.attr('height',this.attr('height'));
        this[0].videoOutput.attr('width',this.attr('width')); this[0].videoOutput.attr('height',this.attr('height')/2);
        
        for(var i in c) { if(this[0].videoOutput.css(i)!=c[i]) this[0].videoOutput.css(i,c[i]); if(this[0].videoBuffer.css(i)!=c[i]) this[0].videoBuffer.css(i,c[i]); }
        this[0].videoOutput.height(this.height()/2);
        this[0].videoOutput.css({'overflow':'','display':'inline-block','height':this.height()/2});
        this.css({'display':'none','position':'absolute'});
        this[0].videoBuffer.css({'display':'none','position':'absolute'});
        this.after(this[0].videoBuffer);
  		this.after(this[0].videoOutput);
  		

        this[0].transparentVideoRender = function()
        { 
        	
              var buffer = this[0].videoBuffer[0].getContext('2d');
              var output = this[0].videoOutput[0].getContext('2d');
              
                buffer.drawImage(this[0], 0, 0);
           
                var image = buffer.getImageData(0, 0, this[0].videoBuffer.width(), this[0].videoBuffer.height()/2);
                
                var imageData = image.data;
                var alphaData = buffer.getImageData(0,this[0].videoBuffer.height()/2, this[0].videoBuffer.width(), this[0].videoBuffer.height()).data;
                
              
                for (var i = 3, len = imageData.length; i < len; i = i + 4) {
                     imageData[i] = alphaData[i-1];
                }
				
                output.putImageData(image, 0, 0, 0, 0, this[0].videoBuffer.width(), this[0].videoBuffer.height()/2);
                this[0].videoInterval = setTimeout($.proxy(this[0].transparentVideoRender,this), 40);
        };
  		
  		this[0].videoInterval = setTimeout($.proxy(this[0].transparentVideoRender,this), 40);
  		
        return this;
    };
 
}( jQuery ));