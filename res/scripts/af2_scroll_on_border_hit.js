//FINAL VARIABLES
var edgeSize = 200;
var timer = null;
$ = jQuery;
//ADDING THE LISTENER IN formularbuilder_v


//DRAW OFF
//drawGridLines();

// --------------------------------------------------------------------------- //
// --------------------------------------------------------------------------- //

// I adjust the window scrolling in response to the given mousemove event.
function handleMousemove( event ) {

    // NOTE: Much of the information here, with regard to document dimensions,
    // viewport dimensions, and window scrolling is derived from JavaScript.info.
    // I am consuming it here primarily as NOTE TO SELF.
    // --
    // Read More: https://javascript.info/size-and-scroll-window
    // --
    // CAUTION: The viewport and document dimensions can all be CACHED and then
    // recalculated on window-resize events (for the most part). I am keeping it
    // all here in the mousemove event handler to remove as many of the moving
    // parts as possible and keep the demo as simple as possible.

    // Get the viewport-relative coordinates of the mousemove event.

    // Actual Positions
    const selector = $('.af2_content')[0];

    var viewportX = event.clientX - $(selector).offset().left;
    var viewportY = event.clientY - $(selector).offset().top;

    // Get the viewport dimensions.
    var viewportWidth = selector.clientWidth;
    var viewportHeight = selector.clientHeight;

    // Next, we need to determine if the mouse is within the "edge" of the
    // viewport, which may require scrolling the window. To do this, we need to
    // calculate the boundaries of the edge in the viewport (these coordinates
    // are relative to the viewport grid system).
    var edgeTop = edgeSize;
    var edgeLeft = edgeSize;
    var edgeBottom = ( viewportHeight - edgeSize );
    var edgeRight = ( viewportWidth - edgeSize );

    var isInLeftEdge = ( viewportX < edgeLeft );
    var isInRightEdge = ( viewportX > edgeRight );
    var isInTopEdge = ( viewportY < edgeTop );
    var isInBottomEdge = ( viewportY > edgeBottom );

    // If the mouse is not in the viewport edge, there's no need to calculate
    // anything else.
    if ( ! ( isInLeftEdge || isInRightEdge || isInTopEdge || isInBottomEdge ) ) {

        clearTimeout( timer );
        return;

    }

    // If we made it this far, the user's mouse is located within the edge of the
    // viewport. As such, we need to check to see if scrolling needs to be done.

    // Get the document dimensions.
    // --
    // NOTE: The various property reads here are for cross-browser compatibility
    // as outlined in the JavaScript.info site (link provided above).
    var documentWidth = Math.max(
        selector.scrollWidth,
        selector.offsetWidth,
        selector.clientWidth,
        selector.scrollWidth,
        selector.offsetWidth,
        selector.clientWidth
    );
    var documentHeight = Math.max(
        selector.scrollHeight,
        selector.offsetHeight,
        selector.clientHeight,
        selector.scrollHeight,
        selector.offsetHeight,
        selector.clientHeight
    );

    // Calculate the maximum scroll offset in each direction. Since you can only
    // scroll the overflow portion of the document, the maximum represents the
    // length of the document that is NOT in the viewport.
    var maxScrollX = ( documentWidth - viewportWidth );
    var maxScrollY = ( documentHeight - viewportHeight );

    // As we examine the mousemove event, we want to adjust the window scroll in
    // immediate response to the event; but, we also want to continue adjusting
    // the window scroll if the user rests their mouse in the edge boundary. To
    // do this, we'll invoke the adjustment logic immediately. Then, we'll setup
    // a timer that continues to invoke the adjustment logic while the window can
    // still be scrolled in a particular direction.
    // --
    // NOTE: There are probably better ways to handle the ongoing animation
    // check. But, the point of this demo is really about the math logic, not so
    // much about the interval logic.
    (function checkForWindowScroll() {

        clearTimeout( timer );

        if ( adjustWindowScroll() ) {

            timer = setTimeout( checkForWindowScroll, 30 );

        }

    })();

    // Adjust the window scroll based on the user's mouse position. Returns True
    // or False depending on whether or not the window scroll was changed.
    function adjustWindowScroll() {

        // Get the current scroll position of the document.
        var currentScrollX = selector.scrollLeft;
        var currentScrollY = selector.scrollTop;

        // Determine if the window can be scrolled in any particular direction.
        var canScrollUp = ( currentScrollY > 0 );
        var canScrollDown = ( currentScrollY < maxScrollY );
        var canScrollLeft = ( currentScrollX > 0 );
        var canScrollRight = ( currentScrollX < maxScrollX );

        // Since we can potentially scroll in two directions at the same time,
        // let's keep track of the next scroll, starting with the current scroll.
        // Each of these values can then be adjusted independently in the logic
        // below.
        var nextScrollX = currentScrollX;
        var nextScrollY = currentScrollY;

        // As we examine the mouse position within the edge, we want to make the
        // incremental scroll changes more "intense" the closer that the user
        // gets the viewport edge. As such, we'll calculate the percentage that
        // the user has made it "through the edge" when calculating the delta.
        // Then, that use that percentage to back-off from the "max" step value.
        var maxStep = 50;

        // Should we scroll left?
        if ( isInLeftEdge && canScrollLeft ) {

            var intensity = ( ( edgeLeft - viewportX ) / edgeSize );

            nextScrollX = ( nextScrollX - ( maxStep * intensity ) );

        // Should we scroll right?
        } else if ( isInRightEdge && canScrollRight ) {

            var intensity = ( ( viewportX - edgeRight ) / edgeSize );

            nextScrollX = ( nextScrollX + ( maxStep * intensity ) );

        }

        // Should we scroll up?
        if ( isInTopEdge && canScrollUp ) {

            var intensity = ( ( edgeTop - viewportY ) / edgeSize );

            nextScrollY = ( nextScrollY - ( maxStep * intensity ) );

        // Should we scroll down?
        } else if ( isInBottomEdge && canScrollDown ) {

            var intensity = ( ( viewportY - edgeBottom ) / edgeSize );

            nextScrollY = ( nextScrollY + ( maxStep * intensity ) );

        }

        // Sanitize invalid maximums. An invalid scroll offset won't break the
        // subsequent .scrollTo() call; however, it will make it harder to
        // determine if the .scrollTo() method should have been called in the
        // first place.
        nextScrollX = Math.max( 0, Math.min( maxScrollX, nextScrollX ) );

        //nextScrollY = Math.max( 0, Math.min( maxScrollY, nextScrollY ) );
        //DISABLE FOR Y
        nextScrollY = currentScrollY;

        if (
            ( nextScrollX !== currentScrollX ) ||
            ( nextScrollY !== currentScrollY )
            ) {

                selector.scrollTo( nextScrollX, nextScrollY );
            return( true );

        } else {

            return( false );

        }

    }

}


// I draw the grid and edge lines in the document so that it is clear where
// scrolling will be initiated and with what intensity it is taking place.
function drawGridLines() {

    var increment = 100;
    var incrementCount = 100;
    var maxDimension = ( increment * incrementCount );

    // Draw the boxes that make up the grid.
    for ( var x = 0 ; x < incrementCount ; x++ ) {
        for ( var y = 0 ; y < incrementCount ; y++ ) {

            var xOffset = ( x * increment );
            var yOffset = ( y * increment );

            var box = document.createElement( "span" );
            box.style.position = "absolute";
            box.style.top = ( yOffset + "px" );
            box.style.left = ( xOffset + "px" );
            box.style.height = ( increment + "px" );
            box.style.width = ( increment + "px" );
            box.style.border = "1px solid #CCCCCC";
            box.style.font = "11px sans-serif";
            box.style.color = "#999999" ;
            box.style.boxSizing = "border-box";
            box.style.padding = "5px 5px 5px 5px";
            box.innerText = ( xOffset + ", " + yOffset );
            document.body.appendChild( box );

        }
    }

    // Draw the edges that delineate the scrolling zone.
    var edge = document.createElement( "span" );
    edge.style.position = "fixed";
    edge.style.top = ( edgeSize + "px" );
    edge.style.bottom = ( edgeSize + "px" );
    edge.style.left = ( edgeSize + "px" );
    edge.style.right = ( edgeSize + "px" );
    edge.style.border = "2px solid #CC0000";
    edge.style.borderRadius = "5px 5px 5px 5px";
    document.body.appendChild( edge );

    // Add mouse-guard so that nothing is selectable.
    var guard = document.createElement( "div" );
    guard.style.position = "fixed";
    guard.style.top = "0px";
    guard.style.bottom = "0px";
    guard.style.left = "0px";
    guard.style.right = "0px";
    document.body.appendChild( guard );

}