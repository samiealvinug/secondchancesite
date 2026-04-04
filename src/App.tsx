import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Impact from './pages/Impact';
import Media from './pages/Media';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import { useSiteSettings } from './hooks/useSiteSettings';
import { useSiteImages } from './hooks/useSiteImages';
import { SITE_CONFIG } from './constants/config';

function SiteMetadataManager() {
  const { settings } = useSiteSettings();
  const { images } = useSiteImages();

  useEffect(() => {
    const favicon = images.favicon || SITE_CONFIG.favicon;
    if (favicon) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = favicon;
    }
  }, [images.favicon]);

  useEffect(() => {
    if (settings.siteTitle) {
      document.title = settings.siteTitle;
    }
  }, [settings.siteTitle]);

  return null;
}

export default function App() {
  return (
    <Router>
      <SiteMetadataManager />
      <ScrollToTop />
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/media" element={<Media />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
