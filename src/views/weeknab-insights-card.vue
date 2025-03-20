import React, { useState } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

const WeeklyInsightsCard = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  // Sample data for the insights
  const weekData = {
    weekNumber: 12,
    startDate: "Jun 14",
    endDate: "Jun 20",
    daysLeft: 2,
    status: "You're doing okay",
    insights: [
      {
        title: "Spending Trend",
        description: "You're spending less on groceries compared to last week.",
        impact: "+$18.50",
        category: "Groceries",
        trend: "positive"
      },
      {
        title: "Budget Alert",
        description: "You've exceeded your Dining Out budget for this week.",
        impact: "-$15.00",
        category: "Dining Out",
        trend: "negative"
      },
      {
        title: "Savings Opportunity",
        description: "Entertainment spending is 40% below your weekly average.",
        impact: "+$30.00",
        category: "Entertainment",
        trend: "positive"
      }
    ],
    spendingTrend: [
      { day: 'M', spent: 45.75 },
      { day: 'T', spent: 32.30 },
      { day: 'W', spent: 68.25 },
      { day: 'T', spent: 53.50 },
      { day: 'F', spent: 0 },
      { day: 'S', spent: 0 },
      { day: 'S', spent: 0 },
    ],
    goalProgress: {
      name: "Monthly Savings Goal",
      target: 200,
      current: 85,
      thisWeekContribution: 35
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg w-full max-w-md mx-auto text-white">
      {/* Back navigation */}
      <div className="flex justify-between items-center p-4">
        <button className="text-gray-400 flex items-center text-sm">
          ← Back to Budget
        </button>
        <div className="bg-green-900 px-3 py-1 rounded-md">
          <span className="text-green-500 text-sm">• Demo</span>
        </div>
      </div>
      
      {/* Weekly Insights Header */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Weekly Insights</h2>
        
        {/* Week Navigation */}
        <div className="bg-gray-800 rounded-lg p-2 mb-4">
          <div className="flex justify-between items-center">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 bg-gray-700 rounded-md">
              &lt;
            </button>
            <div className="text-center">
              <div className="text-white">{weekData.startDate} - {weekData.endDate}</div>
              <div className="text-gray-400 text-sm">{weekData.daysLeft} days left</div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 bg-gray-700 rounded-md">
              &gt;
            </button>
          </div>
        </div>
        
        {/* Status & Spending Overview */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="bg-green-900/30 rounded-md py-2 mb-3 text-center">
            <span className="text-green-500">{weekData.status}</span>
          </div>
          
          <div className="text-center mb-2">
            <h3 className="text-green-500 text-4xl font-bold">$374.50</h3>
            <p className="text-gray-400 text-sm mb-1">remaining this week</p>
            <p className="text-gray-400 text-sm">• {weekData.daysLeft} days left</p>
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div className="bg-green-500 h-2 rounded-full" style={{width: '70%'}}></div>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <span className="text-gray-400">Assigned</span>
                <p className="text-white">$1,250.00</p>
              </div>
              <div className="text-right">
                <span className="text-gray-400">Spent</span>
                <p className="text-white">$875.50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Insights Section */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-4">Insights</h3>
        
        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-4">
          {['All', 'Savings', 'Alerts'].map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedFilter === filter 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        {/* Insights Cards */}
        <div className="space-y-3">
          {weekData.insights.map((insight, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-white font-medium">{insight.title}</h4>
                  <p className="text-gray-400 text-sm">{insight.description}</p>
                </div>
                <span className={`${
                  insight.trend === 'positive' 
                    ? 'text-green-500' 
                    : 'text-red-500'
                } font-bold`}>
                  {insight.impact}
                </span>
              </div>
              <div className="flex items-center mt-3">
                <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                  {insight.category}
                </span>
                <div className={`ml-auto ${
                  insight.trend === 'positive' 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {insight.trend === 'positive' ? '↑' : '↓'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Spending Trend */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-3">Daily Spending</h3>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData.spendingTrend}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                />
                <Bar 
                  dataKey="spent" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-center text-sm text-gray-400">
            Average daily spend: $49.95
          </div>
        </div>
      </div>
      
      {/* Goal Progress */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-3">Goal Progress</h3>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-white font-medium">{weekData.goalProgress.name}</h4>
            <span className="text-green-500 text-sm">+${weekData.goalProgress.thisWeekContribution} this week</span>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-gray-400">
                  ${weekData.goalProgress.current} of ${weekData.goalProgress.target}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-gray-400">
                  {Math.round((weekData.goalProgress.current / weekData.goalProgress.target) * 100)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-1 text-xs flex rounded-full bg-gray-700">
              <div 
                style={{ width: `${(weekData.goalProgress.current / weekData.goalProgress.target) * 100}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyInsightsCard;
