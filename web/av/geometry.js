/****************************************************************/
/****************************************************************/
/*					Geometry									*/
/****************************************************************/
/****************************************************************/
// Input: float centerX, float centerY, float radius, float angleInDegrees
// 	defines a point in the polar base
// Output: Object{'x','y'}: coordinates of the point in the carthesian base
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
	return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians))
	};
}
// Input: float x, float y, float radius, float startAngle, float endAngle,
// Output: string: the (svg) path description of an arc centered in (x,y)
// with a radius radius from startAngle (in degree) to endAngle (in degree)
function describeArc(x, y, radius, startAngle, endAngle) {
	var start = polarToCartesian(x, y, radius, endAngle);
	var end = polarToCartesian(x, y, radius, startAngle);
	var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
	var d = [
		"M", start.x, start.y,
		"A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
	].join(" ");
	return d;
}
