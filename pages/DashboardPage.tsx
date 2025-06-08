
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { DashboardMetric, ChartDataPoint } from '../types';
import { getMockDashboardMetrics, getMockChatVolumeData, getMockChatsOverTimeData, getMockTagDistributionData } from '../services/mockDataService';
import Card from '../components/Card';
import { ChartBarIcon } from '../constants';


const MetricCard: React.FC<{ metric: DashboardMetric }> = ({ metric }) => (
  <Card className="p-4 md:p-6">
    <h3 className="text-sm font-medium text-brand-secondary truncate">{metric.title}</h3>
    <div className="mt-1 flex items-baseline justify-between">
        <p className="text-2xl md:text-3xl font-semibold text-brand-primary">{metric.value}</p>
        {metric.change && (
            <span className={`text-xs font-medium ${metric.changeType === 'positive' ? 'text-brand-success' : 'text-brand-danger'}`}>
                {metric.change}
            </span>
        )}
    </div>
  </Card>
);

const DashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [chatVolumeData, setChatVolumeData] = useState<ChartDataPoint[]>([]);
  const [chatsOverTimeData, setChatsOverTimeData] = useState<ChartDataPoint[]>([]);
  const [tagDistributionData, setTagDistributionData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    setMetrics(getMockDashboardMetrics());
    setChatVolumeData(getMockChatVolumeData());
    setChatsOverTimeData(getMockChatsOverTimeData());
    setTagDistributionData(getMockTagDistributionData());
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-brand-primary flex items-center">
            <ChartBarIcon className="w-8 h-8 mr-3 text-brand-accent" /> Analytics Dashboard
        </h1>
        {/* Date Range Picker Placeholder */}
        <select className="px-3 py-2 border border-brand-border rounded-md text-sm focus:ring-brand-accent focus:border-brand-accent">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} metric={metric} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-4 md:p-6 h-[400px]">
          <h3 className="text-lg font-semibold text-brand-primary mb-4">Chat Volume by Platform</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chatVolumeData} margin={{ top: 5, right: 0, left: -20, bottom: 45 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.5}/>
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} tick={{fontSize: 10}}/>
              <YAxis tick={{fontSize: 12}} />
              <Tooltip wrapperStyle={{fontSize: "12px"}}/>
              <Legend wrapperStyle={{fontSize: "12px"}}/>
              <Bar dataKey="value" name="Chats" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={30}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4 md:p-6 h-[400px]">
          <h3 className="text-lg font-semibold text-brand-primary mb-4">Chat Trends (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chatsOverTimeData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.5}/>
              <XAxis dataKey="name" tick={{fontSize: 12}}/>
              <YAxis tick={{fontSize: 12}}/>
              <Tooltip wrapperStyle={{fontSize: "12px"}}/>
              <Legend wrapperStyle={{fontSize: "12px"}}/>
              <Line type="monotone" dataKey="value" name="Total Chats" stroke="#0ea5e9" strokeWidth={2} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        
        <Card className="p-4 md:p-6 h-[400px] lg:col-span-2"> {/* Make Pie chart take full width on large screens if needed */}
          <h3 className="text-lg font-semibold text-brand-primary mb-4">Tag Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={tagDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={"70%"}
                fill="#8884d8"
                dataKey="value"
                tick={{fontSize: 12}}
              >
                {tagDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{fontSize: "12px"}}/>
              <Legend wrapperStyle={{fontSize: "12px"}} layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Placeholder for Admin Performance Table/Chart */}
        <Card className="p-4 md:p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-brand-primary mb-4">Admin Performance (Mock)</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-brand-border">
                    <thead className="bg-slate-50">
                        <tr>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-brand-secondary uppercase tracking-wider">Admin</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-brand-secondary uppercase tracking-wider">Chats Handled</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-brand-secondary uppercase tracking-wider">Avg. Response Time</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-brand-secondary uppercase tracking-wider">Sales Closed</th>
                        </tr>
                    </thead>
                    <tbody className="bg-brand-surface divide-y divide-brand-border">
                        {/* Mock Data */}
                        <tr>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-brand-primary">Admin Jane</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-brand-secondary">75</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-brand-secondary">1m 50s</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-brand-secondary">฿8,200</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-brand-primary">Admin Tom</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-brand-secondary">62</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-brand-secondary">2m 30s</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-brand-secondary">฿4,300</td>
                        </tr>
                         <tr>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-brand-primary">AI Assistant</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-brand-secondary">150 (Auto-replied)</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-brand-secondary">~5s</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-brand-secondary">N/A</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
