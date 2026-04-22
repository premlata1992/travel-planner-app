import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { login } from "../utils/auth";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

type FormData = {
  email: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    // Simulate sending magic link
    setTimeout(() => {
      const user = {
        id: Date.now(),
        email: data.email,
        name: data.email.split("@")[0],
      };

      login(user);
      setEmailSent(true);
      setIsLoading(false);
      
      // Redirect after showing success message
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-neutral-900 dark:to-neutral-800 bg-travel-pattern">
      
      {/* Header */}
      <Header showUserGreeting={false} />

      {/* Login Form */}
      <div className="flex flex-1 items-center justify-center px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-primary-100 dark:border-neutral-700"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
              🚀 Welcome Back
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Enter your email to receive a magic link
            </p>
          </div>

          {emailSent ? (
            <div className="text-center space-y-4">
              <div className="text-green-600 dark:text-green-400">
                <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h3 className="text-lg font-semibold mb-2">Check your email!</h3>
                <p className="text-sm">
                  We've sent a magic link to <strong>{getValues("email")}</strong>
                </p>
                <p className="text-sm text-neutral-500 mt-2">
                  Redirecting you to the dashboard...
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-accent-500 focus:border-transparent transition"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-accent-500 to-primary-500 hover:from-accent-600 hover:to-primary-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Magic Link...
                  </div>
                ) : (
                  "Send Magic Link"
                )}
              </button>

              <div className="text-center">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  No password required • Just enter your email
                </p>
              </div>
            </>
          )}
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}