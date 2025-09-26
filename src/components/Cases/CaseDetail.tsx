import React, { useState } from 'react';
import { ArrowLeft, User, Calendar, Activity, FileText, Plus, CheckCircle } from 'lucide-react';
import { PatientCase, Recommendation, TreatmentProtocol } from '../../types';
import { mockRecommendations, mockTreatmentProtocols } from '../../data/mockData';

interface CaseDetailProps {
  case: PatientCase;
  onBack: () => void;
}

export function CaseDetail({ case: patientCase, onBack }: CaseDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations' | 'protocols'>('overview');
  
  const recommendations = mockRecommendations.filter(r => r.caseId === patientCase.id);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'recommendations', label: 'AI Recommendations', icon: Activity },
    { id: 'protocols', label: 'Treatment Protocols', icon: FileText },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Condition:</span>
              <span className="font-medium">{patientCase.condition}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Age:</span>
              <span className="font-medium">{patientCase.age} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="capitalize font-medium">{patientCase.status}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical Details</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Genetic Markers</h4>
              <div className="flex flex-wrap gap-2">
                {patientCase.geneticMarkers.map((marker, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {marker}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Comorbidities</h4>
              <div className="flex flex-wrap gap-2">
                {patientCase.comorbidities.map((comorbidity, index) => (
                  <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                    {comorbidity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">AI Summary</h3>
        <div className="space-y-3">
          <p className="text-blue-800">
            • Based on patient's BRCA1+ status and stage II diagnosis, aggressive treatment approach is recommended
          </p>
          <p className="text-blue-800">
            • Age 45 with manageable comorbidities supports combination therapy eligibility
          </p>
          <p className="text-blue-800">
            • Recent literature strongly supports HER2-targeted therapy for optimal outcomes
          </p>
        </div>
        <div className="mt-4 flex items-center space-x-2 text-sm text-blue-700">
          <CheckCircle className="h-4 w-4" />
          <span>Based on 15 relevant studies • Last updated 2 hours ago</span>
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      {recommendations.length > 0 ? (
        recommendations.map((rec) => (
          <div key={rec.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Treatment Recommendation</h3>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  rec.certainty === 'High' ? 'bg-green-100 text-green-800' :
                  rec.certainty === 'Moderate' ? 'bg-amber-100 text-amber-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {rec.certainty} Certainty
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                  Level {rec.evidenceLevel} Evidence
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Recommendation</h4>
                <p className="text-gray-700">{rec.recommendation}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Rationale</h4>
                <p className="text-gray-700">{rec.rationale}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Supporting Citations</h4>
                <div className="space-y-1">
                  {rec.citations.map((citation, index) => (
                    <p key={index} className="text-blue-600 hover:text-blue-700 cursor-pointer text-sm">
                      {citation}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <Activity className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No recommendations yet</h3>
          <p className="mt-1 text-sm text-gray-500">Generate AI recommendations based on latest literature</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Generate Recommendation
          </button>
        </div>
      )}
    </div>
  );

  const renderProtocols = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTreatmentProtocols.map((protocol) => (
          <div key={protocol.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{protocol.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-600">{protocol.effectiveness}%</span>
                <span className="text-sm text-gray-500">effective</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  protocol.evidenceLevel === 1 ? 'bg-green-100 text-green-800' :
                  protocol.evidenceLevel === 2 ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  Level {protocol.evidenceLevel} Evidence
                </span>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Side Effects</h4>
                <div className="flex flex-wrap gap-2">
                  {protocol.sideEffects.map((effect, index) => (
                    <span key={index} className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs">
                      {effect}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Contraindications</h4>
                <div className="flex flex-wrap gap-2">
                  {protocol.contraindications.map((contra, index) => (
                    <span key={index} className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs">
                      {contra}
                    </span>
                  ))}
                </div>
              </div>
              
              <button className="w-full mt-4 bg-blue-50 text-blue-700 border border-blue-200 py-2 rounded hover:bg-blue-100 transition-colors">
                Select Protocol
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Cases</span>
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{patientCase.id}</h1>
            <p className="text-gray-600 mt-1">{patientCase.condition}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <CheckCircle className="h-4 w-4" />
              <span>Approve Treatment</span>
            </button>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Note</span>
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`group inline-flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'recommendations' && renderRecommendations()}
        {activeTab === 'protocols' && renderProtocols()}
      </div>
    </div>
  );
}