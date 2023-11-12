const terrainVert = `
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  
  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;
  
  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
  
  // Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
           
  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  
  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  
  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}





varying vec3 normalInterp;
varying vec3 pos;
varying float height;
varying float depth;

uniform float u_time;
uniform float yaw;
uniform vec3 runningPos;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    //Speed rate (runningPos)

	//NOTE: THE SIMPLEX LAYERS HERE MUST BE MATCHED PERFECTLY FOR THE COLLISION/SLOPE DETECTION CODE. IF YOU UPDATE ONE, UPDATE THE OTHER.
    float mountainMask = (snoise(vec3((position.x / 1550.0)+(runningPos.x / 1550.0), (position.y / 1550.0)+(runningPos.y / 1550.0), (position.z / 1550.0)))* 1.0);
    mountainMask = max(mountainMask,0.0);
    float mountain = (snoise(vec3((position.x / 750.0)+(runningPos.x / 750.0), (position.y / 750.0)+(runningPos.y / 750.0), (position.z / 750.0)))* 200.0)+200.0;
    float mountain2 = (snoise(vec3((position.x / 150.0)+(runningPos.x / 150.0), (position.y / 150.0)+(runningPos.y / 150.0), (position.z / 150.0)))* 50.0);
    float mountain3 = (snoise(vec3((position.x / 50.0)+(runningPos.x / 50.0), (position.y / 50.0)+(runningPos.y / 50.0), (position.z / 50.0)))* 10.0);

    float hill = (snoise(vec3((position.x / 700.0)+(runningPos.x / 700.0), (position.y / 700.0)+(runningPos.y / 700.0), (position.z / 700.0)))* 10.0);
    float hill2 = (snoise(vec3((position.x / 400.0)+(runningPos.x / 400.0), (position.y / 400.0)+(runningPos.y / 400.0), (position.z / 400.0)))* 20.0);
    float hill3 = (snoise(vec3((position.x / 50.0)+(runningPos.x / 50.0), (position.y / 50.0)+(runningPos.y / 50.0), (position.z / 50.0)))* 2.0);

    float oceans = (snoise(vec3(((position.x+5230.0) / 1550.0)+((runningPos.x+5230.0) / 1550.0), (position.y / 1550.0)+(runningPos.y / 1550.0), (position.z / 1550.0)))* 100.0);


    float noiseMod = ((mountainMask*(mountain+mountain2+mountain3)) + hill+hill2+hill3) - oceans;
    height = noiseMod;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, position.z + noiseMod, 1.0);

    //If I could set noiseMod in pos4 do the derivative of noiseMod, we'd be in good shape without touching fragShad
    vec4 pos4 = modelMatrix * vec4(position.x, position.y, position.z + (noiseMod * 1.0), 1.0);

    normalInterp = normalMatrix * normal;
    pos = (modelMatrix * vec4(position.x, position.y, position.z + noiseMod,1.0)).xyz;
    depth=length(pos);
}
`;

export default terrainVert;
