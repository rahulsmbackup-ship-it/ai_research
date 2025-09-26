import React from 'react';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface AlertItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  read: boolean;
}

const mockAlerts: AlertItem[] = [
  {
    id: '1',
    title: 'New HER2 Trial Results',
    description: 'Phase III results showing improved outcomes with combination therapy',
    priority: 'high',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: '2',
    title: 'FDA Approval Update',
    description: 'New indication approved for osimertinib in early-stage NSCLC',
    priority: 'medium',
    timestamp: '1 day ago',
    read: false
  },
  {
    id: '3',
    title: 'Guideline Update',
    description: 'NCCN breast cancer guidelines updated with new recommendations',
    priority: 'medium',
    timestamp: '2 days ago',
    read: true
  }
];

export function AlertsPanel() {
  const getPriorityColor = (priority: string, read: boolean) => {
    const opacity = read ? 'opacity-60' : '';
    switch (priority) {
      case 'high':
        return `bg-red-50 text-red-700 border-red-200 ${opacity}`;
      case 'medium':
        return `bg-amber-50 text-amber-700 border-amber-200 ${opacity}`;
      case 'low':
        return `bg-blue-50 text-blue-700 border-blue-200 ${opacity}`;
      default:
        return `bg-gray-50 text-gray-700 border-gray-200 ${opacity}`;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return AlertCircle;
      case 'medium':
        return Clock;
      case 'low':
        return CheckCircle;
      default:
        return AlertCircle;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Literature Alerts</h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          2 new
        </span>
      </div>
      
      <div className="space-y-3">
        {mockAlerts.map((alert) => {
          const Icon = getPriorityIcon(alert.priority);
          return (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 transition-all hover:shadow-sm cursor-pointer ${getPriorityColor(alert.priority, alert.read)}`}
            >
              <div className="flex items-start space-x-3">
                <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-medium ${alert.read ? 'opacity-60' : ''}`}>
                      {alert.title}
                    </h4>
                    {!alert.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${alert.read ? 'opacity-60' : ''}`}>
                    {alert.description}
                  </p>
                  <p className={`text-xs mt-2 ${alert.read ? 'opacity-40' : 'opacity-70'}`}>
                    {alert.timestamp}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
        Manage alerts
      </button>
    </div>
  );
}