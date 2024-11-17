{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {
    "name": "data"  // This links the Looker data to the chart
  },
  "layer": [
    {
      "mark": "bar",
      "encoding": {
        "x": {
          "field": "category",
          "type": "ordinal",
          "axis": {"title": "Category"}
        },
        "y": {
          "field": "dollar_value",
          "type": "quantitative",
          "axis": {"title": "Dollar Value"},
          "scale": {"zero": true}
        },
        "color": {"value": "#4CAF50"}  // Green color for bars
      }
    },
    {
      "mark": {"type": "line", "point": true},
      "encoding": {
        "x": {
          "field": "category",
          "type": "ordinal"
        },
        "y": {
          "field": "percentage",
          "type": "quantitative",
          "axis": {"title": "Percentage"},
          "scale": {"domain": [0, 100]}  // Percentage scale
        },
        "color": {"value": "#FF9800"}  // Orange color for line
      }
    }
  },
  "resolve": {
    "scale": {"y": "independent"}  // Separate y-axes for bar and line
  }
}
