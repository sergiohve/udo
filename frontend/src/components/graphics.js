import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function GraficaTimeRepair({arrayMaquinas}) {
    console.log(arrayMaquinas)
  return (
    <BarChart
      series={[
        { data: arrayMaquinas }
      ]}
      height={200}
      xAxis={[{ data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}