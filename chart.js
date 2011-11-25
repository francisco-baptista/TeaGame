/**
 * Take data from a table inside a canvas element,
 * and display it as a one of two chart options.
 *
 * @copyright Clock Limited 2010
 * @license http://opensource.org/licenses/bsd-license.php New BSD License
 * @author Ben Gourley <ben.gourley@clock.co.uk>
 * @version 0.1
 */
(function($) {

	var global = this;
	
	global.Chart = function(canvasId, chartType) {
	
	
/***************************************************************************
 *
 *												Variable declarations
 *
 ***************************************************************************/

		var canvas, ctx, supportsCanvas=true, values, type;

/***************************************************************************
 *
 *													Private methods
 *
 ***************************************************************************/
		 
		/*
		 *  Renders the state of the pie chart given its progress though the animation.
		 */
		var drawShapeIncrementFromEqual = function(canvas,canvasContext,progress) {
	  	  
	    canvas.width = canvas.width;
	    
	    var colours = new Array();
	    colours[0] = 'rgba(250, 183, 28, 1)';
	    colours[1] = 'rgba(250, 183, 28, 0.8)';
	    colours[2] = 'rgba(250, 183, 28, 0.7)';
	    colours[3] = 'rgba(250, 183, 28, 0.6)';
	    colours[4] = 'rgba(250, 183, 28, 0.4)';
	    colours[5] = 'rgba(250, 183, 28, 0.3)';
	
	    var startOffset = Math.PI,
	    		endOffset = Math.PI * 3 / 2,
	    		offset = 0,
	    		k = 0.005;
	    
	    for (var x in values) {
	    	
				var start = 2*Math.PI * ((parseInt(x) + 1) / values.length),
						end = offset + values[x] ,
						start = start % (2 * Math.PI),
						end = end % (2 * Math.PI),
						offsetTo = (parseInt(x) === values.length-1) ? 2 * Math.PI : (start - (progress * (start - end)));
		    
		    if (offsetTo - k > offset && (2 * Math.PI) > offsetTo - k) {
		    	
		    	canvasContext.beginPath();
		    	canvasContext.arc(canvas.width/2, canvas.height/2, 60, offset, offsetTo - k, false);
		    	canvasContext.strokeStyle = colours[x];
		    	canvasContext.lineWidth = 20+4*values[x]*progress;
			    canvasContext.stroke();
			    
			  }
			    
			  offset = offsetTo;
	   
	  	}
	
		}
		
		/*
		 *  Custom easing function for the animation to use.
		 *  t: current time, b: begInnIng value, c: change In value, d: duration
		 */
		var ease = function(t, b, c, d, s) {
		
			var s=100;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.9;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		
		}
		
		/*
		 *  Takes an array and returns the an array representing
		 *  proportions of each element in percent. The sum of the
		 *  returned array is 100.
		 */
		var arrayProportionsToPercent = function(array) {
			var sum = 0;
			for (var x in array) {
			   sum += parseInt(array[x]);
			}
			var output = new Array();
			for (var x in array) {
			   output[x] = (array[x]/sum)*100;
			}
			return output;
		}
		
		var arrayProportionsToRadians = function(array) {
			var sum = 0;
			for (var x in array) {
			   sum += parseInt(array[x]);
			}
			var output = new Array();
			for (var x in array) {
			   output[x] = ((array[x]/sum*360)*Math.PI)/180;
			}
			return output;
  	}
		
		/*
		 *  Retrieves the chart data from the DOM
		 */
		var  grabValues = function() {
	    var values = new Array();
	    // Access the required table cell, extract and add its value to the values array.
	    $(canvas).find("tr td:nth-child(2)").each(function(){
	      values.push($(this).text());
	    });
	    return values;
		}
		
		/*
		 *	Animates bar chart (non-canvas).
		 */
		var initFallback = function() {
			
			var barDelay = 0,
					count = 0;
					
			values = arrayProportionsToPercent(values);
			
			$(canvas).find("td").each(function(i){
			
				if ((i+1)%2===0) {
			  	$(this).wrapInner('<span />')
			  				 .css('width', '0%')
			  				 .delay(barDelay)
			  				 .animate({
			  				 				width: values[count] + '%'
			  				 				},300);
			  	barDelay += 200;
			  	count++;
			  	
		  	}
			});
	
		}
		
		var drawPie = function(time) {
		
			values = arrayProportionsToRadians(values);
			values.sort().reverse();
		  
			var progress = 0;
			var chartDrawAnimation = setInterval(function(){
				progress += 1/(30*time);
				if (progress>=1) {
					progress=1;
					clearInterval(chartDrawAnimation);
				}
				drawShapeIncrementFromEqual(canvas,ctx,ease(progress,0,1,1));
			},1000/30);
			
		}
		
		
		var drawBlobsFromCentre = function(canvas,ctx,progress,anglePerSlice,radius) {
		
			ctx.clearRect(0,0,canvas.width,canvas.height);
		  
			ctx.beginPath();
			ctx.arc(100,100,radius*progress,0,2*Math.PI,false);
			ctx.stroke();
		  
		  for (var i = 0; i < values.length; i++) {

				var x = progress*radius*Math.cos((i * anglePerSlice) - 3 * (1 - progress)),
						y = progress*radius*Math.sin((i * anglePerSlice) - 3 * (1 - progress));
				
				ctx.beginPath();
				ctx.arc(100+x,100+y,(1*values[i]),0,2*Math.PI,false);
				ctx.fill();
							
			}
			
		}
		
		var drawBlobs = function (time) {
		
			values = arrayProportionsToPercent(values);
			var anglePerSlice = (2*Math.PI) / values.length;
			
			ctx.strokeStyle = "rgba(200, 200, 200, 0.5);";
			ctx.fillStyle = "rgba(0, 121, 190, 0.9);"
		  ctx.lineWidth = 1;
		  
			var progress = 0;
			var chartDrawAnimation = setInterval(function(){
				progress += 1/(30*time);
				if (progress>=1) {
					progress=1;
					clearInterval(chartDrawAnimation);
				}
				drawBlobsFromCentre(canvas,ctx,ease(progress,0,1,1),anglePerSlice,60);
			},1000/30);

		
		}
		
				
/***************************************************************************
 *
 *															Constructor
 *
 ***************************************************************************/
		 
		// Get the canvas element using the DOM
    canvas = document.getElementById(canvasId);
    
    // Get values
    values = grabValues();
    
    // Set chart type
    if (chartType in Chart.chartTypes) {
    	type = chartType;
    } else {
    	type = pie;
    }
    
    if (canvas.getContext) {
    
	    // use getContext to use the canvas for drawing
	    ctx = canvas.getContext('2d');
	    
	    // Set canvas size
	    canvas.height = 200;
	    canvas.width = 200;
    
    } else {
    
    	supportsCanvas = false;
    	
    }
		
		
/***************************************************************************
 *
 *												Public methods and vars
 *
 ***************************************************************************/
		return {
		
			/*
			 *  Deals with animating the pie chart.
			 */
			animateIn : function(time) {
				
				if (supportsCanvas) {
				
					if (type === Chart.chartTypes.pie) {
						drawPie(time);
					} else if (type === Chart.chartTypes.blob) {
						drawBlobs(time);
					} else {
						alert("Chart type error");
					}
					
				} else {
					
					// Draw simple bar chart with jQuery
					initFallback();
				
				}
		  
			}
		
		}
	
	}

/***************************************************************************
 *
 *														Enumerated types
 *
 ***************************************************************************/
	global.Chart.chartTypes = {
	
		pie : "pie",
		blob : "blob"
	
	}
	

})(jQuery);