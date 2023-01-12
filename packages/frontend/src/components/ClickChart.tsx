import { Box, useColorModeValue } from '@chakra-ui/react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useMemo } from 'react';
import { format, isSameDay, subDays } from 'date-fns';

interface ClickChartProps {
  timestamps: number[];
}

type ChartDataItem = {
  name: string;
  value: number;
};

export function ClickChart({ timestamps }: ClickChartProps) {
  const gridColor = useColorModeValue('#E2E8F0', '#4A5568');
  const tooltipColor = useColorModeValue('white', '#2D3748');
  const themeColor = useColorModeValue('#0C7189', '#9DC6D0');
  const data = useMemo<ChartDataItem[]>(() => {
    const arr: ChartDataItem[] = [];
    for (let i = 0; i < 10; i++) {
      const date = subDays(new Date(), i);
      const count = timestamps.filter((ts) => isSameDay(ts, date)).length;
      arr.push({ name: format(date, 'MM. dd.'), value: count });
    }
    return arr.reverse();
  }, [timestamps]);
  return (
    <Box w='100%' height={500}>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray='3 3' stroke={gridColor} />
          <Tooltip contentStyle={{ backgroundColor: tooltipColor }} />
          <YAxis allowDecimals={false} />
          <XAxis dataKey='name' />
          <Area type='monotone' dataKey='value' fill={themeColor} stroke={themeColor} activeDot={{ r: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
