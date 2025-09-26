import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Highlighter as Highlight, Share, Download, BookOpen } from 'lucide-react';
import { Document, Annotation } from '../../types';

interface DocumentViewerProps {
  document: Document;
  onBack: () => void;
}

export function DocumentViewer({ document, onBack }: DocumentViewerProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'annotations'>('content');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [showAnnotationPanel, setShowAnnotationPanel] = useState(false);

  // Mock document content
  const mockContent = `
    ABSTRACT
    
    Background: HER2-positive breast cancer represents approximately 20% of all breast cancers and has historically been associated with poor prognosis. The introduction of trastuzumab has significantly improved outcomes in this patient population.
    
    Methods: This randomized controlled trial enrolled 1,200 patients with HER2-positive breast cancer across 45 international centers. Patients were randomized to receive either trastuzumab plus chemotherapy (n=600) or chemotherapy alone (n=600). The primary endpoint was overall response rate, with secondary endpoints including progression-free survival and overall survival.
    
    Results: The combination therapy group demonstrated an 85% overall response rate compared to 62% in the chemotherapy-alone group (p<0.001). Median progression-free survival was significantly improved in the combination group (18.5 months vs 12.3 months, HR 0.72, 95% CI 0.61-0.85). Cardiotoxicity was observed in 8% of patients receiving trastuzumab, with most cases being reversible upon drug discontinuation.
    
    Conclusions: The addition of trastuzumab to standard chemotherapy significantly improves outcomes in HER2-positive breast cancer patients with an acceptable safety profile. These findings support the use of combination therapy as standard of care in this patient population.
    
    INTRODUCTION
    
    HER2-positive breast cancer is characterized by overexpression of the human epidermal growth factor receptor 2 protein, which occurs in approximately 15-20% of invasive breast cancers. This subtype was historically associated with aggressive tumor behavior and poor clinical outcomes. The development of HER2-targeted therapies, particularly trastuzumab, has revolutionized treatment approaches and significantly improved patient outcomes.
    
    METHODS
    
    Study Design: This was a multicenter, randomized, open-label phase III clinical trial conducted between January 2020 and December 2023. The study was approved by institutional review boards at all participating sites and conducted in accordance with the Declaration of Helsinki and Good Clinical Practice guidelines.
    
    Patients: Eligible patients were adults (≥18 years) with histologically confirmed HER2-positive breast cancer (defined as IHC 3+ or FISH ratio ≥2.0) with measurable disease according to RECIST criteria. Key exclusion criteria included prior HER2-targeted therapy, significant cardiac dysfunction (LVEF <50%), and uncontrolled comorbidities.
  `;

  const tabs = [
    { id: 'content', label: 'Document', icon: BookOpen },
    { id: 'annotations', label: 'Annotations', icon: MessageSquare, count: annotations.length },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Library</span>
              </button>
              
              <div className="h-6 border-l border-gray-300"></div>
              
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{document.title}</h1>
                <p className="text-sm text-gray-600">{document.authors.join(', ')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowAnnotationPanel(!showAnnotationPanel)}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Highlight className="h-4 w-4" />
                <span>Annotate</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <div className="flex mt-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm mr-2 ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-0.5">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {activeTab === 'content' && (
            <div className="max-w-4xl mx-auto p-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="prose prose-lg max-w-none">
                  {mockContent.split('\n').map((paragraph, index) => {
                    if (paragraph.trim() === '') return null;
                    
                    if (paragraph.trim() === 'ABSTRACT' || 
                        paragraph.trim() === 'INTRODUCTION' || 
                        paragraph.trim() === 'METHODS') {
                      return (
                        <h2 key={index} className="text-xl font-bold text-gray-900 mt-8 mb-4 border-b border-gray-200 pb-2">
                          {paragraph.trim()}
                        </h2>
                      );
                    }
                    
                    if (paragraph.startsWith('    ')) {
                      return (
                        <p key={index} className="text-gray-700 leading-relaxed mb-4">
                          {paragraph.trim()}
                        </p>
                      );
                    }
                    
                    return null;
                  })}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'annotations' && (
            <div className="max-w-4xl mx-auto p-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                {annotations.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No annotations yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Start annotating to collaborate with your team</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {annotations.map((annotation) => (
                      <div key={annotation.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{annotation.userName}</h4>
                            <p className="text-sm text-gray-600 mt-1">{annotation.comment}</p>
                          </div>
                          <span className="text-xs text-gray-500">{annotation.createdAt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Annotation panel */}
      {showAnnotationPanel && (
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Annotation</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selected Text
              </label>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-sm">
                Select text in the document to annotate
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment
              </label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add your comment..."
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Save Annotation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}