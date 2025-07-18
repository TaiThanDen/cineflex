import React from 'react';
import AdManager from './AdManager';
import Header from '../../components/admin/LayoutAdmin/Header';

const AdAdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto">
        <AdManager />
      </main>
    </div>
  );
};

export default AdAdminPage;
