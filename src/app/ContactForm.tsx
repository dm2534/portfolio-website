import { useState, useEffect } from 'react';

interface ContactFormProps {
  isFullPage?: boolean;
  onSuccess?: () => void;
}

export default function ContactForm({ isFullPage, onSuccess }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Honeypot check: If 'website' field is filled, it's likely a bot
    if (formData.get('website')) {
      setStatus('success'); // Silently fail for bots
      return;
    }

    setStatus('submitting');

    // Simplified: Simulate a successful submission without a backend
    setTimeout(() => {
      setStatus('success');
      setShowConfirmation(true);
      if (onSuccess) setTimeout(onSuccess, 4000);
    }, 800);
  };

  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => setShowConfirmation(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showConfirmation]);

  if (showConfirmation) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 rounded-full bg-[#c9a96e]/20 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-[#c9a96e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-serif text-[#e8e0d4] mb-2">Message Received</h3>
        <p className="text-[#8a8278]">I'll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field - Hidden from users, visible to bots */}
      <div className="absolute opacity-0 pointer-events-none -z-10 h-0 w-0 overflow-hidden">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] tracking-widest uppercase text-[#c9a96e]">Name</label>
          <input required name="name" type="text" className="w-full bg-[#0d1117] border border-[#c9a96e]/20 p-3 text-[#e8e0d4] focus:border-[#c9a96e] outline-none transition-colors" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] tracking-widest uppercase text-[#c9a96e]">Email</label>
          <input required name="email" type="email" className="w-full bg-[#0d1117] border border-[#c9a96e]/20 p-3 text-[#e8e0d4] focus:border-[#c9a96e] outline-none transition-colors" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] tracking-widest uppercase text-[#c9a96e]">Subject</label>
        <select name="subject" className="w-full bg-[#0d1117] border border-[#c9a96e]/20 p-3 text-[#e8e0d4] focus:border-[#c9a96e] outline-none transition-colors appearance-none">
          <option value="Job opportunity">Job opportunity</option>
          <option value="Collaboration">Collaboration</option>
          <option value="General">General Inquiry</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] tracking-widest uppercase text-[#c9a96e]">Message</label>
        <textarea required name="message" rows={isFullPage ? 8 : 4} className="w-full bg-[#0d1117] border border-[#c9a96e]/20 p-3 text-[#e8e0d4] focus:border-[#c9a96e] outline-none transition-colors resize-none" />
      </div>

      <button 
        disabled={status === 'submitting'}
        className="w-full py-4 bg-[#c9a96e] text-[#0d1117] text-[13px] tracking-widest uppercase hover:bg-[#d4b87e] transition-all disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
      
      {status === 'error' && (
        <p className="text-red-400 text-xs text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}