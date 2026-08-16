import { Outlet } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatWidget from '../components/AIChatWidget';

const MainLayout = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    let observer;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !document.hidden) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        },
        { threshold: 0.01 }
      );
      observer.observe(videoEl);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        videoEl.pause();
      } else {
        videoEl.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (observer) observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-ink relative overflow-hidden">
      {/* PERSISTENT CINEMATIC ENVIRONMENT BACKDROP */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transform-gpu">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/hero.mp4"
          aria-hidden="true"
          className="fixed inset-0 w-full h-full object-cover pointer-events-none opacity-55 sm:opacity-40 transform-gpu"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="fixed inset-0 z-10 bg-gradient-to-b from-[#0A0A0A]/75 via-[#0A0A0A]/60 to-[#0A0A0A]/85 pointer-events-none" />
      </div>

      <Navbar />
      <div className="flex-grow relative z-10">
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
