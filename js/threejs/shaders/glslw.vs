varying vec2 vUv;
uniform float uAnalyzerArray[1000];
in int gl_VertexID;
varying vec3 vNormal;
void main() {

    vUv = uv;
    vNormal = normal;
    vec3 newPosition = position +
    normal * vec3(0,uAnalyzerArray[gl_VertexID],0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}