"use client";
import { ChartDataType } from "@/type";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function AllProductSaleChart({
  chartData,
}: {
  chartData: ChartDataType;
}) {
  const myMap = new Map();

//   console.log("chartData :::: ", chartData);

  chartData?.forEach(({ date, quantity }) => {
    if (!myMap.has(date)) {
      myMap.set(date, { date, quantity: 0 });
    }
    myMap.get(date).quantity += quantity;
  });

  const mergedChartData = Array.from(myMap.values());
//   console.log("mergedChartData :::: ", mergedChartData);
  return (
    <div className="max-w-full h-full ">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Sale Chart</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Sales Chart</Dialog.Title>
          <Dialog.Description size="2" mb="4" color="gray">
            View and analyze sales data.
          </Dialog.Description>

          <div className="w-full h-[400px] p-4 shadow rounded-2xl">
            <h2 className="text-xl font-semibold mb-4">
              Sales Throughout the Day
            </h2>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={mergedChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="quantity"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
