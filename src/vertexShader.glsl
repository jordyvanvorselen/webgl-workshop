attribute vec2 aCoordinate;

void main() {
  gl_Position = vec4(aCoordinate.xy, 0.0, 1.0);
}
