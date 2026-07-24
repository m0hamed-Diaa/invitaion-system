"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface Props {
    attending: number;
    pending: number;
    declined: number;
}

export default function GuestStatusChart({
    attending,
    pending,
    declined,
}: Props) {

    const data = [
        {
            name: "سيحضر",
            value: attending,
        },
        {
            name: "بانتظار الرد",
            value: pending,
        },
        {
            name: "اعتذر",
            value: declined,
        },
    ];

    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    حالة المدعوين
                </CardTitle>

            </CardHeader>

            <CardContent>

                <div className="h-87.5 w-full">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 10,
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="name"
                            />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="value"
                                name="عدد المدعوين"
                                radius={[6, 6, 0, 0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </CardContent>

        </Card>
    );
}