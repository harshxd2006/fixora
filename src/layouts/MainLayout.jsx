import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatWidget from '../components/AIChatWidget';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-ink">
      <Navbar />
      <div className="flex-grow bg-warm-white relative z-10">
        <main className="pt-24">
          <Outlet />
        </main>
      </div>
      <Footer />
      <AIChatWidget />
    </div>
  );
};

export default MainLayout;
