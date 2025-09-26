import React from 'react';
import { Clock, FileText, Users, AlertCircle } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'document' | 'case' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'document',
    title: 'New Research Paper Added',
    description: 'EGFR Tyrosine Kinase Inhibitors in Advanced NSCLC uploaded by Dr. Chen',
    timestamp: '2 hours ago',
    user: 'Dr. Sarah Chen'
  },
  {
    id: '2',
    type: 'case',
    title: 'Case Updated',
    description: 'CASE-0001 - Stage II Breast Cancer treatment plan revised',
    timestamp: '4 hours ago',
    user: 'Dr. Michael Rodriguez'
  },
  {
    id: '3',
    type: 'alert',
    title: 'Literature Alert Triggered',
    description: 'New HER2 trial results available for review',
    timestamp: '6 hours ago',
    user: 'System'
  },
  {
    id: '4',
    type: 'document',
    title: 'Document Annotated',
    description: 'New comments added to Trastuzumab efficacy study',
    timestamp: '1 day ago',
    user: 'Dr. Emily Watson'
  }
];

export function RecentActivity() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'document':
        return FileText;
      case 'case':
        return Users;
      case 'alert':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const getColorClass = (type: string) => {
    switch (type) {
      case 'document':
        return 'bg-blue-50 text-blue-600';
      case 'case':
        return 'bg-green-50 text-green-600';
      case 'alert':
        return 'bg-amber-50 text-amber-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {mockActivities.map((activity) => {
          const Icon = getIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getColorClass(activity.type)}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                <div className="flex items-center mt-2 text-xs text-gray-400 space-x-4">
                  <span>{activity.timestamp}</span>
                  <span>•</span>
                  <span>{activity.user}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
        View all activity
      </button>
    </div>
  );
}