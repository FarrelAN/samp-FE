"use client";
import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface SparklineProps {
  data: number[];
  color: string;
}

const Sparkline: React.FC<SparklineProps> = ({ data, color }) => {
  const formattedData = data.map((value, index) => ({ index, value }));

  return (
    <ResponsiveContainer width="100%" height={50}>
      <LineChart data={formattedData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Sparkline;
