import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AnimatedButton from './AnimatedButton';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

interface ContactFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await onSubmit(data);
      setSubmitted(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (!submitted && !loading) {
      handleSubmit(handleFormSubmit)();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-screen mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">Name</label>
        <input type="text" id="name" className="w-full p-2 border rounded-lg shadow-md" {...register("name", { required: true })} />
        {errors.name && <p className="text-red-500">Name is required.</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">Email</label>
        <input type="email" id="email" className="w-full p-2 border rounded-lg shadow-md" {...register("email", { required: true })} />
        {errors.email && <p className="text-red-500">Email is required.</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block mb-2">Message</label>
        <textarea id="message" className="w-full p-2 border rounded-lg shadow-md" {...register("message", { required: true })} />
        {errors.message && <p className="text-red-500">Message is required.</p>}
      </div>
      <AnimatedButton
        text={submitted ? 'Fold and Submit' : 'Submit'}
        disabled={submitted || loading}
        loading={loading}
        onClick={handleButtonClick}
        animationEnabled={!submitted}
      />
    </form>
  );
};

export default ContactForm;
