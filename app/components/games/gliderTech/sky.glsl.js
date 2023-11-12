const skyVert = `
varying vec3 pos;
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    pos = position;
}
`;

const skyFrag = `

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);
	
	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}


uniform float u_time;
uniform float yaw;
varying vec3 pos;
void main() {
    float skyBlueFac = pow(-pos.y / 3.0,2.0) * cos(u_time);
    vec3 skyBlueMod = vec3(-1.0, -0.5, 1.0) * skyBlueFac;

    float skyEveningFac = max(cos((pos.y / 2.0) + ((u_time * 2.0) - 3.14)),0.0);
    vec3 skyEveningMod = vec3(1.0, -0.3, -1.0) * skyEveningFac;

    vec3 skyColors = (vec3(1,1,1) + skyBlueMod + skyEveningMod) * clamp(cos(u_time) + 0.5,0.0,1.0);

    float starNoise = noise(vec2((pos.x * 100.0), (pos.y * 100.0)));
    starNoise = clamp(pow(starNoise - 0.5,3.0),0.0,1.0) * 3.0;
    vec4 starColors = vec4(starNoise,starNoise,starNoise,1) * max(1.0-(cos(u_time)+0.8), 0.0);

    gl_FragColor = (vec4(skyColors, 1.0 )) + starColors;
    //gl_FragColor = starColors;

}
`;

export default {skyVert, skyFrag};