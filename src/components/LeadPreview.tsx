import React, { useState } from 'react';
import { Calendar, MapPin, Package, ExternalLink } from 'lucide-react';
import type { Lead } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';

interface LeadPreviewProps {
  leads: Lead[];
  isPurchased?: boolean;
}

export const LeadPreview = ({ leads, isPurchased = false }: LeadPreviewProps) => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handlePurchase = async (leadId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    // Implement Stripe payment logic here
    console.log('Purchase lead:', leadId);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <Package className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-sm text-gray-600">
                  {lead.equipment.length} items requested
                </span>
              </div>
              <span className={`px-3 py-1 ${
                lead.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              } text-sm rounded-full`}>
                {lead.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span className="text-sm">
                  {new Date(lead.startDate).toLocaleDateString()} - {lead.duration}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-sm">{lead.location}</span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-900">Budget Range:</span>
                <span className="ml-2 text-sm text-gray-600">{lead.budget}</span>
              </div>

              {!isPurchased && (
                <button
                  onClick={() => handlePurchase(lead.id)}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Customer Details ($5)
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};