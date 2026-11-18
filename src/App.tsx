'use client';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { EstimatorSection } from './components/EstimatorSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import type { ServiceCategoryId } from './data/servicesData';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceCategoryId | 'integral'>('integral');
  const [prefilledSummary, setPrefilledSummary] = useState<string>('');

  const scrollToContact = () => {
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (category: ServiceCategoryId) => {
    setSelectedService(category);
    const labels: Record<ServiceCategoryId, string> = {
      cctv: 'Solicito evaluación técnica para sistema de Videovigilancia y Cámaras (CCTV / IP).',
      redes: 'Solicito evaluación técnica para Redes de Datos, Cableado Estructurado y Switching.',
      wifi: 'Solicito estudio Site Survey e implementación de Wi-Fi de Alta Cobertura y Alta Densidad.',
    };
    setPrefilledSummary(labels[category]);
    scrollToContact();
  };

  const handleApplyEstimateToQuote = (category: ServiceCategoryId, summary: string) => {
    setSelectedService(category);
    setPrefilledSummary(summary);
    scrollToContact();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111827]">
      <Navbar onRequestQuote={scrollToContact} />
      <main className="flex-1">
        <HeroSection onRequestEvaluation={scrollToContact} />
        <ServicesSection onSelectServiceForQuote={handleSelectServiceForQuote} />
        <EstimatorSection onApplyEstimateToQuote={handleApplyEstimateToQuote} />
        <ProjectsSection />
        <ContactSection
          preselectedService={selectedService}
          prefilledSummary={prefilledSummary}
        />
      </main>
      <Footer />
    </div>
  );
}
