
  import React, { useEffect, useRef, useState } from "react";
  import {
      select,
      axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
  area,
  scalePoint,
  curveCardinal
} from "d3";
import useResizeObserver from "./useResizeObserver";



const StackedBarChart = ({data}) => {
    
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
  
    let allKeys = ["cases", "deaths"];
    useEffect(()=> {
    
  })

const colors = {
  "cases": "green",
  "deaths": "black",
};

const [keys] = useState(allKeys);
/**
 * Component that renders a StackedBarChart
 */

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // stacks / layers
    const stackGenerator = stack()
      .keys(keys)
      .order(stackOrderAscending);
    const layers = stackGenerator(data);
    const extent = [
      0,
      max(layers, layer => max(layer, sequence => sequence[1]))
    ];

    // scales
    const xScale = scalePoint()
      .domain(data.map(d => d.day))
      .range([0, width]);

    const yScale = scaleLinear()
      .domain(extent)
      .range([height, 0]);

    // area generator
    const areaGenerator = area()
      .x(sequence => xScale(sequence.data.day))
      .y0(sequence => yScale(sequence[0]))
      .y1(sequence => yScale(sequence[1]))
      .curve(curveCardinal);

    // rendering
    svg
      .selectAll(".layer")
      .data(layers)
      .join("path")
      .attr("class", "layer")
      .attr("fill", layer => colors[layer.key])
      .attr("d", areaGenerator);

    // axes
    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);
  }, [colors, data, dimensions, keys]);

      return (
        <React.Fragment>
          <div ref={wrapperRef} style={{ padding:'1rem', width: '80%', color:"black"}}>
            <svg ref={svgRef}>
              <g className="x-axis" />
              <g className="y-axis" />
            </svg>
          </div>
        </React.Fragment>
      )
}

export default StackedBarChart;