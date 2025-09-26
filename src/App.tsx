import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { StatsCard } from './components/Dashboard/StatsCard';
import { RecentActivity } from './components/Dashboard/RecentActivity';
import { AlertsPanel } from './components/Dashboard/AlertsPanel';
import { CaseCard } from './components/Cases/CaseCard';
import { CaseDetail } from './components/Cases/CaseDetail';
import { DocumentCard } from './components/Library/DocumentCard';
import { DocumentViewer } from './components/Library/DocumentViewer';
import { AlertsManager } from './components/Alerts/AlertsManager';
import { mockCases, mockDocuments } from './data/mockData';
import { 
  Users, 
  FileText, 
  Activity, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  Shield
} from 'lucide-react';

function Dashboard() {
  return (
    <div className="space-y-6">
      <Header title="Dashboard" subtitle="Welcome back! Here's your research overview" />
      
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Cases"
            value={15}
            change="+3 this week"
            changeType="positive"
            icon={Users}
            color="blue"
          />
          <StatsCard
            title="Pending Reviews"
            value={8}
            change="+2 since yesterday"
            changeType="neutral"
            icon={Clock}
            color="amber"
          />
          <StatsCard
            title="Documents Processed"
            value={245}
            change="+18 this month"
            changeType="positive"
            icon={FileText}
            color="green"
          />
          <StatsCard
            title="Success Rate"
            value="94%"
            change="+2% from last month"
            changeType="positive"
            icon={Activity}
            color="green"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
}

function Cases() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  
  if (selectedCase) {
    const caseData = mockCases.find(c => c.id === selectedCase);
    if (caseData) {
      return (
        <CaseDetail
          case={caseData}
          onBack={() => setSelectedCase(null)}
        />
      );
    }
  }

  return (
    <div className="space-y-6">
      <Header title="Patient Cases" subtitle="Manage and track patient research cases" />
      
      <div className="px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockCases.map((case_) => (
            <CaseCard
              key={case_.id}
              case={case_}
              onClick={setSelectedCase}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Library() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  
  if (selectedDocument) {
    const document = mockDocuments.find(d => d.id === selectedDocument);
    if (document) {
      return (
        <DocumentViewer
          document={document}
          onBack={() => setSelectedDocument(null)}
        />
      );
    }
  }

  return (
    <div className="space-y-6">
      <Header 
        title="Research Library" 
        subtitle="Browse and analyze medical literature"
        onUploadClick={() => console.log('Upload document')}
      />
      
      <div className="px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockDocuments.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              onClick={setSelectedDocument}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Compliance() {
  const mockComplianceChecks = [
    {
      id: '1',
      protocol: 'HER2+ Breast Cancer Treatment',
      status: 'compliant',
      guidelines: ['NCCN', 'WHO'],
      lastChecked: '2024-12-15T14:30:00Z'
    },
    {
      id: '2',
      protocol: 'STEMI Management Protocol',
      status: 'warning',
      guidelines: ['AHA/ACC'],
      issues: ['Dosage adjustment needed for renal impairment'],
      lastChecked: '2024-12-15T10:15:00Z'
    }
  ];

  return (
    <div className="space-y-6">
      <Header title="Compliance Monitor" subtitle="Validate protocols against medical guidelines" />
      
      <div className="px-6">
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {mockComplianceChecks.map((check) => (
            <div key={check.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{check.protocol}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Guidelines: {check.guidelines.join(', ')}</span>
                    <span>•</span>
                    <span>Last checked {new Date(check.lastChecked).toLocaleDateString()}</span>
                  </div>
                  {check.issues && (
                    <div className="mt-3">
                      <div className="bg-amber-50 border border-amber-200 rounded p-3">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-amber-800">Issues Found</p>
                            <ul className="text-sm text-amber-700 mt-1">
                              {check.issues.map((issue, index) => (
                                <li key={index}>• {issue}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="ml-4">
                  {check.status === 'compliant' ? (
                    <div className="flex items-center space-x-2 text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Compliant</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-amber-700">
                      <AlertCircle className="h-5 w-5" />
                      <span className="font-medium">Warning</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Analytics() {
  const analyticsData = [
    { metric: 'Documents Processed', value: '245', trend: '+15%', color: 'blue' },
    { metric: 'Average Processing Time', value: '2.3min', trend: '-12%', color: 'green' },
    { metric: 'Research Recommendations', value: '89', trend: '+8%', color: 'purple' },
    { metric: 'Compliance Score', value: '94%', trend: '+2%', color: 'green' }
  ];

  return (
    <div className="space-y-6">
      <Header title="Analytics" subtitle="Research insights and performance metrics" />
      
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analyticsData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{item.metric}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{item.value}</p>
                  <p className="text-sm text-green-600 mt-2">{item.trend}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Research Activity Over Time</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <BarChart3 className="h-16 w-16 mb-4" />
            <p>Analytics charts would be rendered here with a charting library</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainApp() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'cases':
        return <Cases />;
      case 'library':
        return <Library />;
      case 'alerts':
        return <AlertsManager />;
      case 'compliance':
        return <Compliance />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;