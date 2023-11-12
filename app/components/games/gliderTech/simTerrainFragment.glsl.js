const terrainFrag = `
precision mediump float;

varying vec3 pos;
varying vec3 normalInterp;
varying float height;
varying float depth;

uniform float bFlat;
uniform float u_time;


const vec3 ambientColor = vec3(0.15, 0.15, 0.2);
const vec3 diffuseColor = vec3(0.6, 0.6, 0.5);
const vec3 specColor 	= vec3(0.0, 0.0, 0.0);

void main() {

  //Dynamic sun
  //Fixed offset on Z axis helps give the light some definition
  vec3 lightPos = vec3(10000.0 * sin(u_time), 10000.0 * cos(u_time), 10000.0);

  //Fixed Sun
  //vec3 lightPos = vec3(10000,7000,10000);

  vec3 lightColor = vec3(1.0 + abs(pow(sin(u_time),4.0)/2.0),1.0 - abs(pow(sin(u_time),4.0)/2.0),1.0 - abs(pow(sin(u_time),4.0)/2.0));

	//vec3 normal = mix(normalize(normalInterp), normalize(cross(dFdx(pos), dFdy(pos))), bFlat);
  vec3 normal = normalize(cross(dFdx(pos), dFdy(pos)));
	vec3 lightDir = normalize(lightPos - pos);

	float lambertian = max(dot(lightDir,normal), 0.0);
	float specular = 0.0;

	if(lambertian > 0.0) {
		vec3 viewDir = normalize(-pos);
		vec3 halfDir = normalize(lightDir + viewDir);
		float specAngle = max(dot(halfDir, normal), 0.0);
		specular = pow(specAngle, 16.0);
	}


  float flatness = dot(normalize(cross(dFdx(pos), dFdy(pos))), vec3(0,1,0));
  float grass = min(pow(flatness,22.0),1.0);
  float cliff = abs(log(flatness));
  float dirt = min(pow(flatness,4.0),1.0);
  float snow = pow(height / 200.0,6.0);

  vec3 grassColor=(vec3(-0.4,-0.2,-0.4) * grass);
  vec3 cliffColor=(vec3(-0.6,-0.6,-0.6) * cliff);
  vec3 dirtColor=(vec3(0.1,-0.2,-0.40) * dirt * (1.0 - (grass))) * flatness;
  vec3 snowColor=vec3(1,1,1) * snow;

  vec3 difModColor = diffuseColor + grassColor + cliffColor + dirtColor + snowColor;

  float grayScale = (difModColor.x+difModColor.y+difModColor.z) / 3.0;
  vec3 grayColor = vec3(grayScale, grayScale, grayScale);

  float alpha = 1.3 - (max(depth - 4000.0,0.0) / 300.0);
    gl_FragColor = vec4((ambientColor * grayScale) + lambertian * (difModColor + specular * specColor) * lightColor, alpha);
}
`;

export default terrainFrag;
