attribute vec2 aCoordinate;
mat4 viewportScale = mat4(
  2.0 / uViewport.x, 0, 0, 0,   
  0, -2.0 / uViewport.y, 0, 0,    
  0, 0, 1, 0,    
  -1, +1, 0, 1
);

void main() {
  gl_Position = viewportScale * vec4(aCoordinate.xy, 0.0, 1.0);
}
