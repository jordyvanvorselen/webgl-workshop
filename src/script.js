import vertexSource from "./vertexShader.glsl";
import fragmentSource from "./fragmentShader.glsl";

const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    source.split("\n").forEach((line, index) => {
      console.log(index + 1, line);
    });
    throw new Error(gl.getShaderInfoLog(shader));
  }

  return shader;
}

const main = () => {
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");
  gl.clearColor(1, 0, 0, 1);
  
  const program = gl.createProgram();

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);

  gl.clear(gl.COLOR_BUFFER_BIT);
}

main();
