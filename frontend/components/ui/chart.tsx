interface ChartProps {
  data: { name: string; value: number }[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter: (value: number) => string
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  xAxisWidth?: number
  yAxisWidth?: number
}

export function BarChart({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  showLegend,
  showXAxis,
  showYAxis,
  yAxisWidth,
}: ChartProps) {
  return (
    <div>
      {/* Bar Chart Implementation (Placeholder) */}
      <p>Bar Chart Placeholder</p>
      <p>Data: {JSON.stringify(data)}</p>
      <p>Index: {index}</p>
      <p>Categories: {JSON.stringify(categories)}</p>
      <p>Colors: {JSON.stringify(colors)}</p>
      <p>Value Formatter: {valueFormatter(100)}</p>
      {showLegend && <p>Legend: Visible</p>}
      {showXAxis && <p>X Axis: Visible</p>}
      {showYAxis && <p>Y Axis: Visible, Width: {yAxisWidth}</p>}
    </div>
  )
}

export function LineChart({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  showLegend,
  showXAxis,
  showYAxis,
  yAxisWidth,
}: ChartProps) {
  return (
    <div>
      {/* Line Chart Implementation (Placeholder) */}
      <p>Line Chart Placeholder</p>
      <p>Data: {JSON.stringify(data)}</p>
      <p>Index: {index}</p>
      <p>Categories: {JSON.stringify(categories)}</p>
      <p>Colors: {JSON.stringify(colors)}</p>
      <p>Value Formatter: {valueFormatter(100)}</p>
      {showLegend && <p>Legend: Visible</p>}
      {showXAxis && <p>X Axis: Visible</p>}
      {showYAxis && <p>Y Axis: Visible, Width: {yAxisWidth}</p>}
    </div>
  )
}
