const main = () => {
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");

  gl.clearColor(1, 0, 0, 1);

  gl.clear(gl.COLOR_BUFFER_BIT);
}

main();
