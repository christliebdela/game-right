'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PasswordResetModal from '@/components/PasswordResetModal';

export default function ResetPassword() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);
  
  const handleSuccess = () => {

    // CLOSE MODAL AND REDIRECT TO SIGN IN PAGE
    
    setShowModal(false);
    router.push('/signin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-950 to-purple-950/80">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-black/90 p-8 rounded-2xl shadow-2xl border border-purple-700/30"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your email and we'll send you instructions to reset your password.
          </p>
        </div>
        <div className="text-center">
          <Link 
            href="/signin" 
            className="inline-flex items-center text-fuchsia-400 hover:text-cyan-400"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to sign in
          </Link>
        </div>
      </motion.div>
      
      <PasswordResetModal 
        isOpen={showModal}
        onClose={() => router.push('/signin')}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
