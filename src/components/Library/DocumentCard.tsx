import React from 'react';
import { FileText, Calendar, User, ExternalLink, Tag } from 'lucide-react';
import { Document } from '../../types';

interface DocumentCardProps {
  document: Document;
  onClick: (documentId: string) => void;
}

export function DocumentCard({ document, onClick }: DocumentCardProps) {
  const getEvidenceLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-green-100 text-green-800 border-green-200';
      case 2:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 3:
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 4:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div
      onClick={() => onClick(document.id)}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer hover:border-blue-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 leading-tight">
              {document.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {document.authors.join(', ')}
            </p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getEvidenceLevelColor(document.evidenceLevel)}`}>
          Level {document.evidenceLevel}
        </span>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {document.summary}
      </p>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Key Findings</h4>
          <ul className="space-y-1">
            {document.keyFindings.slice(0, 2).map((finding, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {finding}
              </li>
            ))}
            {document.keyFindings.length > 2 && (
              <li className="text-sm text-blue-600 font-medium">
                +{document.keyFindings.length - 2} more findings
              </li>
            )}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {document.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
            >
              <Tag className="h-3 w-3" />
              <span>{tag}</span>
            </span>
          ))}
          {document.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-500">
              +{document.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(document.uploadedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{document.specialty}</span>
            </div>
          </div>
          
          {document.doi && (
            <button className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700">
              <ExternalLink className="h-3 w-3" />
              <span>DOI</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}