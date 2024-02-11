<template>
  <div class="scichart-container">
    <div id="scichart-root"></div>
  </div>
</template>

<script lang="ts">
import { fetchData } from "../api/api";
import { defineComponent } from "vue";
import {
  SciChartSurface,
  NumericAxis,
  DateTimeNumericAxis,
  FastLineRenderableSeries,
  FastColumnRenderableSeries,
  XyDataSeries,
  SweepAnimation,
  NumberRange,
  MouseWheelZoomModifier,
  ZoomPanModifier,
  ZoomExtentsModifier,
  LegendModifier,
} from "scichart";

async function initSciChart() {
  const fetchedData = await fetchData();

  const price = fetchedData.map(({ price }) => price);
  const amount = fetchedData.map(({ amount }) => amount);
  const date = fetchedData.map(({ dt }) => dt);

  const { sciChartSurface, wasmContext } = await SciChartSurface.create(
    "scichart-root",
    {
      title: "SciChart.js Chart",
      titleStyle: { fontSize: 22 },
    }
  );

  const growBy = new NumberRange(0.1, 0.1);
  sciChartSurface.xAxes.add(
    new DateTimeNumericAxis(wasmContext, { axisTitle: "Time Axis", growBy })
  );
  sciChartSurface.yAxes.add(
    new NumericAxis(wasmContext, { axisTitle: "Price Axis", growBy })
  );
  sciChartSurface.yAxes.add(
    new NumericAxis(wasmContext, {
      id: "yAxis2",
      drawLabels: false,
      drawMajorGridLines: false,
    })
  );
  sciChartSurface.renderableSeries.add(
    new FastLineRenderableSeries(wasmContext, {
      stroke: "steelblue",
      strokeThickness: 3,
      dataSeries: new XyDataSeries(wasmContext, {
        dataSeriesName: "Price",
        xValues: date,
        yValues: price,
      }),
      animation: new SweepAnimation({ duration: 300, fadeEffect: true }),
    })
  );
  sciChartSurface.renderableSeries.add(
    new FastColumnRenderableSeries(wasmContext, {
      fill: "orange",
      stroke: "orange",
      strokeThickness: 0,
      dataSeries: new XyDataSeries(wasmContext, {
        dataSeriesName: "Amount",
        xValues: date,
        yValues: amount,
      }),
      yAxisId: "yAxis2",
      animation: new SweepAnimation({ duration: 300, fadeEffect: true }),
    })
  );
  sciChartSurface.chartModifiers.add(
    new LegendModifier({
      showCheckboxes: false,
      showSeriesMarkers: true,
      showLegend: true,
    })
  );

  sciChartSurface.chartModifiers.add(
    new MouseWheelZoomModifier(),
    new ZoomPanModifier(),
    new ZoomExtentsModifier()
  );

  return sciChartSurface;
}

export default defineComponent({
  data() {
    return {
      chartInitializationPromise: undefined,
    };
  },
  mounted() {
    this.chartInitializationPromise = initSciChart();
  },
  beforeUnmount() {
    this.chartInitializationPromise.then((sciChartSurface) => {
      sciChartSurface.delete();
    });
  },
  name: "scichart2d",
  props: {
    msg: String,
  },
});
</script>
<style>
#scichart-root {
  width: 90vw;
  height: 80vh;
  margin: auto;
}
</style>
