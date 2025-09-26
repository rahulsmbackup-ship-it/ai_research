import React from 'react';
import { Clock, User, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
import { PatientCase } from '../../types';

interface CaseCardProps {
  case: PatientCase;
  onClick: (caseId: string) => void;
}

export function CaseCard({ case: patientCase, onClick }: CaseCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'completed':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div
      onClick={() => onClick(patientCase.id)}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer hover:border-blue-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900">{patientCase.id}</h3>
            <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(patientCase.status)}`}>
              {getStatusIcon(patientCase.status)}
              <span className="capitalize">{patientCase.status}</span>
            </span>
          </div>
          
          <p className="text-gray-600 mt-1">{patientCase.condition}</p>
          
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>Age {patientCase.age}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(patientCase.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {patientCase.geneticMarkers.map((marker, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700"
                >
                  {marker}
                </span>
              ))}
              {patientCase.comorbidities.map((comorbidity, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-50 text-red-700"
                >
                  {comorbidity}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}