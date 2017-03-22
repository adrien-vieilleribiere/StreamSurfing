// Input: event e
// Output: float: the absolute x (horizontal) coordinate of this event
function relMouseCoordsX(e) {
	var posx = 0;
	if (!e)
		var e = window.event;
	if (e.pageX || e.pageY) {
		posx = e.pageX;
	} else if (e.clientX) {
		posx = e.clientX + document.body.scrollLeft
			 + document.documentElement.scrollLeft;
	}
	return posx;
}
