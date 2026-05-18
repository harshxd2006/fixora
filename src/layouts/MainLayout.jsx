import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatWidget from '../components/AIChatWidget';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-ink">
      <Navbar />
      <div className="flex-grow bg-warm-white relative z-10 pb-16 mb-[0]">
        <main className="pt-24">
          <Outlet />
        </main>
      </div>
      <div className="sticky bottom-0 left-0 w-full z-0">
        <Footer />
      </div>
      <AIChatWidget />
    </div>
  );
};

export default MainLayout;
