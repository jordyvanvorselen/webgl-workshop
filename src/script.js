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

const createProgram = (gl) => {
  const program = gl.createProgram();

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  return { program, attributes: { coordinate: gl.getAttribLocation(program, "aCoordinate") } }
}

const initBuffers = (gl) => {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // prettier-ignore
  const positions = [
    1.0,  1.0,
   -1.0,  1.0,
    1.0, -1.0,
   -1.0, -1.0,
 ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  const indices = [0, 1, 2, 1, 2, 3];

  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );

  return { position: positionBuffer, indices: indexBuffer, indexBufferLength: indices.length };
};

const main = () => {
  const canvas = document.getElementById("canvas");
  canvas.width = 800;
  canvas.height = 600;
  const gl = canvas.getContext("webgl");
  gl.clearColor(1, 0, 0, 1);

  const programInfo = createProgram(gl);
  const buffers = initBuffers(gl);

  const numComponents = 2; // pull out 2 values per iteration
  const type = gl.FLOAT; // the data in the buffer is 32bit floats
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set of values to the next
  // 0 = use type and numComponents above
  const offset = 0; // how many bytes inside the buffer to start from

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  gl.vertexAttribPointer(
    programInfo.attributes.coordinate,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );

  gl.enableVertexAttribArray(programInfo.attributes.coordinate);
  gl.useProgram(programInfo.program);
  
  const draw = () => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, buffers.indexBufferLength, gl.UNSIGNED_SHORT, 0);
  }

  draw();
}

main();
