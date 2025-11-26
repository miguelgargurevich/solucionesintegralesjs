import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ClientsSection from '@/components/sections/ClientsSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
