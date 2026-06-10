import ContactForm from './ContactForm';
import { useAnimationConfig } from '../app/App';

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { fadeUpDuration, reduced } = useAnimationConfig();

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0d1117]/90 backdrop-blur-sm ${reduced ? '' : 'animate-in fade-in'}`}
      style={{ animationDuration: `${fadeUpDuration}ms` }}
    >
      <div className="absolute inset-0" onClick={onClose} />
      <div 
        className={`relative w-full max-w-xl bg-[#0d1117] border border-[#c9a96e]/20 p-8 md:p-12 rounded-[2rem] shadow-2xl ${reduced ? '' : 'animate-in slide-in-from-bottom-4'}`}
        style={{ animationDuration: `${fadeUpDuration}ms` }}
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-[#8a8278] hover:text-[#c9a96e] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="font-serif text-3xl text-[#e8e0d4] mb-8">Get in touch</h2>
        <ContactForm onSuccess={onClose} />
      </div>
    </div>
  );
}