
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ActivationType } from '../types';

interface Props {
  activation: ActivationType;
  weight: number;
  bias: number;
  onKnobChange: (w: number, b: number) => void;
}

const LinearFitting: React.FC<Props> = ({ activation, weight, bias, onKnobChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [points] = useState(() => 
    d3.range(20).map(() => ({
      x: Math.random() * 10 - 5,
      y: (Math.random() * 10 - 5) + (Math.random() * 2 - 1)
    }))
  );

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear().domain([-6, 6]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([-10, 10]).range([innerHeight, 0]);

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${innerHeight / 2})`)
      .call(d3.axisBottom(xScale).ticks(5))
      .attr("color", "#475569");
    
    g.append("g")
      .attr("transform", `translate(${innerWidth / 2},0)`)
      .call(d3.axisLeft(yScale).ticks(5))
      .attr("color", "#475569");

    // Points
    g.selectAll(".point")
      .data(points)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 4)
      .attr("fill", "#60a5fa")
      .attr("opacity", 0.6);

    // Function line
    const lineData = d3.range(-6, 6.1, 0.2).map(x => {
      let y = weight * x + bias;
      if (activation === ActivationType.RELU) {
        y = Math.max(0, y);
      } else if (activation === ActivationType.GELU) {
        // Simple approximation
        y = x * (1 / (1 + Math.exp(-1.702 * x)));
        y = weight * y + bias;
      }
      return { x, y };
    });

    const line = d3.line<{x: number, y: number}>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(lineData)
      .attr("fill", "none")
      .attr("stroke", "#f472b6")
      .attr("stroke-width", 3)
      .attr("d", line);

  }, [activation, weight, bias, points]);

  return (
    <div className="w-full h-full relative">
      <svg ref={svgRef} className="w-full h-full rounded-xl bg-slate-900 shadow-inner" />
      <div className="absolute top-4 right-4 bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-xs space-y-2">
        <div className="font-bold text-pink-400">目前公式:</div>
        <div className="font-mono">
          {activation === ActivationType.LINEAR && `y = ${weight.toFixed(2)}x + ${bias.toFixed(2)}`}
          {activation === ActivationType.RELU && `y = ReLU(${weight.toFixed(2)}x + ${bias.toFixed(2)})`}
          {activation === ActivationType.GELU && `y = GeLU(${weight.toFixed(2)}x + ${bias.toFixed(2)})`}
        </div>
      </div>
    </div>
  );
};

export default LinearFitting;
