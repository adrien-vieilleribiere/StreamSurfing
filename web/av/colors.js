/****************************************************************/
/****************************************************************/
/*						Colors									*/
/****************************************************************/
/****************************************************************/
// Inputs:
//	string hex1: color in hexa
// 	string hex2: color in hexa
// 	float alpha: in [0,1]
// Output: rgb of alpha*hex1+(1-alpha)hex2
function ColorInterpolation(hex1, hex2, alpha) {
	// validate hex strings
	hex1 = String(hex1).replace(/[^0-9a-f]/gi, '');
	hex2 = String(hex2).replace(/[^0-9a-f]/gi, '');
	if (hex1.length < 6) {
		hex1 = hex1[0] + hex1[0] + hex1[1] + hex1[1] + hex1[2] + hex1[2];
	}
	if (hex2.length < 6) {
		hex2 = hex2[0] + hex2[0] + hex2[1] + hex2[1] + hex2[2] + hex2[2];
	}
	alpha = alpha || 0;
	var rgb = "#",
	c,
	c1,
	c2,
	i;
	for (i = 0; i < 3; i++) {
		c1 = parseInt(hex1.substr(i * 2, 2), 16);
		c2 = parseInt(hex2.substr(i * 2, 2), 16);
		c =
			Math.round(
				Math.min(Math.max(0, (alpha * c1) + (1 - alpha) * c2), 255))
			.toString(16);
		rgb += ("00" + c).substr(c.length);
	}
	return rgb;
}
// Input: string hex: color in hexa
// Output: Object{'r','g','b'} of the corresponding color
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	}
	 : null;
}
