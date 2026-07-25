import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { User, Mail, DollarSign, MessageSquare, Send, Loader2 } from 'lucide-react';
import { BUDGET_RANGES } from '@/constants';
import { leadsApi } from '@/services/leads';

/**
 * Lead Form Validation Schema (Matches backend leadsValidators.js)
 */
const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters'),
  budget_range: z.enum(BUDGET_RANGES, {
    errorMap: () => ({ message: 'Please select a budget range' }),
  }),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must not exceed 2000 characters'),
});

const LeadForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: '',
      email: '',
      budget_range: BUDGET_RANGES[1], // Default to '$1,000–$5,000'
      message: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await leadsApi.create(data);
      toast.success('Lead Submitted Successfully!', {
        description: response.message || "Thank you! We'll be in touch shortly.",
      });
      reset();
    } catch (err) {
      const errorMessage =
        err.data?.message || err.message || 'Failed to submit lead. Please try again.';
      toast.error('Submission Failed', {
        description: errorMessage,
      });
    }
  };

  return (
    <div id="contact" className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
        {/* Top Decorative Border Highlight */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 via-blue-500 to-indigo-500" />

        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Let&apos;s Talk About Your Project
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Full Name <span className="text-brand-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <User className="w-4 h-4" />
              </div>
              <input
                id="name"
                type="text"
                disabled={isSubmitting}
                placeholder="John Doe"
                className={`w-full pl-10 pr-4 py-3 bg-gray-950/80 border rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none transition-all ${
                  errors.name
                    ? 'border-red-500/80 focus:ring-2 focus:ring-red-500/30'
                    : 'border-gray-800 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'
                } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                {...register('name')}
              />
            </div>
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fade-in">
                <span>•</span> {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Work Email <span className="text-brand-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                type="email"
                disabled={isSubmitting}
                placeholder="john@company.com"
                className={`w-full pl-10 pr-4 py-3 bg-gray-950/80 border rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none transition-all ${
                  errors.email
                    ? 'border-red-500/80 focus:ring-2 focus:ring-red-500/30'
                    : 'border-gray-800 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'
                } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fade-in">
                <span>•</span> {errors.email.message}
              </p>
            )}
          </div>

          {/* Budget Range Dropdown */}
          <div>
            <label htmlFor="budget_range" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Project Budget Range <span className="text-brand-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <DollarSign className="w-4 h-4" />
              </div>
              <select
                id="budget_range"
                disabled={isSubmitting}
                className={`w-full pl-10 pr-4 py-3 bg-gray-950/80 border rounded-xl text-white text-sm focus:outline-none transition-all appearance-none ${
                  errors.budget_range
                    ? 'border-red-500/80 focus:ring-2 focus:ring-red-500/30'
                    : 'border-gray-800 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'
                } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                {...register('budget_range')}
              >
                {BUDGET_RANGES.map((range) => (
                  <option key={range} value={range} className="bg-gray-900 text-white">
                    {range}
                  </option>
                ))}
              </select>
            </div>
            {errors.budget_range && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fade-in">
                <span>•</span> {errors.budget_range.message}
              </p>
            )}
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Project Brief / Message <span className="text-brand-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3.5 left-3.5 pointer-events-none text-gray-500">
                <MessageSquare className="w-4 h-4" />
              </div>
              <textarea
                id="message"
                rows={4}
                disabled={isSubmitting}
                placeholder="Tell us about your project requirements, target timeline, or scope..."
                className={`w-full pl-10 pr-4 py-3 bg-gray-950/80 border rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none transition-all resize-none ${
                  errors.message
                    ? 'border-red-500/80 focus:ring-2 focus:ring-red-500/30'
                    : 'border-gray-800 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'
                } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                {...register('message')}
              />
            </div>
            {errors.message && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fade-in">
                <span>•</span> {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 shadow-lg shadow-brand-600/25 transition-all duration-200 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.99]'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Your Lead...</span>
              </>
            ) : (
              <>
                <span>Submit Lead Request</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
