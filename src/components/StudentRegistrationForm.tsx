import React, { useState } from 'react';
import { GraduationCap, Loader2 } from 'lucide-react';
import FormField from './FormField';
import SuccessModal from './SuccessModal';
import AnimatedBackground from './AnimatedBackground';
import { supabase, Student } from '../lib/supabase';

const StudentRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    reg_no: '',
    email: '',
    phone: '',
    department: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const departments = [
    'Event Management',
    'Technical', 
    'Design',
    'Social Media',
    'Content',
    'Outreach',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.reg_no.trim()) {
      newErrors.reg_no = 'Registration number is required';
    } else if (formData.reg_no.trim().length < 3) {
      newErrors.reg_no = 'Registration number must be at least 3 characters long';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
    }

    if (!formData.department) {
      newErrors.department = 'Please select a department';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { count, error: countError } = await supabase
      .from('students')
      .select('*', { count: 'exact', head: true })
      .eq('department', formData.department);

    if (countError) {
      console.error('Error fetching department count:', countError);
      alert('An error occurred while checking department capacity.');
      setIsSubmitting(false);
      return;
    }

    if (count !== null && count >= 20) {
      setErrors({ department: 'This department has reached the limit of 20 students.' });
      setIsSubmitting(false);
      return;
    }

      const studentData: Omit<Student, 'id' | 'created_at'> = {
        name: formData.name.trim(),
        reg_no: formData.reg_no.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        department: formData.department
      };

      const { error } = await supabase
        .from('students')
        .insert([studentData]);

      if (error) {
        if (error.code === '23505') {
          // Unique constraint violation
          if (error.message.includes('reg_no')) {
            setErrors({ reg_no: 'This registration number is already taken' });
          } else if (error.message.includes('email')) {
            setErrors({ email: 'This email address is already registered' });
          }
        } else {
          console.error('Error inserting student:', error);
          alert('An error occurred while submitting the form. Please try again.');
        }
        return;
      }

      // Success
      setShowSuccessModal(true);
      setFormData({
        name: '',
        reg_no: '',
        email: '',
        phone: '',
        department: ''
      });
      
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-green-600 p-3 rounded-full">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              BIOSPHERE FFCS, DEPARTMENT SELECTION FORM
            </h1>
            <p className="text-gray-600">
              Fill out the form below to complete your registration
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-xl px-8 py-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Enter your full name"
              />

              <FormField
                label="Registration Number"
                name="reg_no"
                value={formData.reg_no}
                onChange={handleChange}
                error={errors.reg_no}
                placeholder="Enter your registration number"
              />

              <FormField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="Enter your email address"
              />

              <FormField
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="Enter your phone number"
              />

              <FormField
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                error={errors.department}
                options={departments}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Registration</span>
                )}
              </button>
            </form>
          </div>

          <div className="text-center mt-6 text-sm text-gray-500">
            <p>All fields marked with * are required</p>
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </>
  );
};

export default StudentRegistrationForm;