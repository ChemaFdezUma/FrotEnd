import React, { useRef, useState } from 'react';

const DrawingApp = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [density, setDensity] = useState(30);
  const [tool, setTool] = useState('pencil');

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === 'pencil') {
      ctx.lineTo(offsetX, offsetY);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.clearRect(offsetX - lineWidth / 2, offsetY - lineWidth / 2, lineWidth, lineWidth);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'my_drawing.png';
    link.click();
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleLineWidthChange = (e) => {
    setLineWidth(parseInt(e.target.value));
  };

  const handleDensityChange = (e) => {
    setDensity(parseInt(e.target.value));
  };

  const handleToolChange = (e) => {
    setTool(e.target.value);
  };

  const spray = (ctx, x, y) => {
    const radius = lineWidth / 2;

    for (let i = 0; i < density; i++) {
      const offsetX = getRandomOffset(radius);
      const offsetY = getRandomOffset(radius);
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

      if (distance <= radius) {
        const opacity = Math.random() * 0.5 + 0.1; // Adjust opacity here (0.1 to 0.6)
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
      }
    }
  };

  const getRandomOffset = (radius) => {
    return (Math.random() - 0.5) * 2 * radius;
  };

  return (
    <div>
      <h2>Dibujo en Canvas</h2>
      <div>
        <label htmlFor="colorPicker">Color:</label>
        <input
          type="color"
          id="colorPicker"
          value={color}
          onChange={handleColorChange}
        />
      </div>
      <div>
        <label htmlFor="lineWidthRange">Grosor de línea:</label>
        <input
          type="range"
          id="lineWidthRange"
          min="1"
          max="10"
          value={lineWidth}
          onChange={handleLineWidthChange}
        />
      </div>
      <div>
        <label htmlFor="densityRange">Densidad del rotulador:</label>
        <input
          type="range"
          id="densityRange"
          min="10"
          max="100"
          value={density}
          onChange={handleDensityChange}
        />
      </div>
      <div>
        <label htmlFor="toolSelect">Herramienta:</label>
        <select id="toolSelect" value={tool} onChange={handleToolChange}>
          <option value="pencil">Lápiz</option>
          <option value="eraser">Goma de borrar</option>
        </select>
      </div>
      <canvas
        ref={canvasRef}
        width={500}
        height={300}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <button onClick={saveDrawing}>Guardar</button>
    </div>
  );
};

export default DrawingApp;
