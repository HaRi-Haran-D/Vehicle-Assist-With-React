import { Sidebar } from '../components/Sidebar';

export function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-primary">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
