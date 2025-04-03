
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Form schemas
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters long'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';

  // If user is already logged in, redirect to home page
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSignInSubmit = async (values: SignInFormValues) => {
    setIsLoading(true);
    setFormError(null);

    try {
      const { error } = await signIn(values.email, values.password);
      if (error) {
        setFormError(error.message || 'Failed to sign in. Please try again.');
      }
    } catch (err) {
      setFormError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSignUpSubmit = async (values: SignUpFormValues) => {
    setIsLoading(true);
    setFormError(null);

    try {
      const { error } = await signUp(values.email, values.password, values.fullName);
      if (error) {
        setFormError(error.message || 'Failed to sign up. Please try again.');
      }
    } catch (err) {
      setFormError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFormType = () => {
    setIsSignUp(!isSignUp);
    setFormError(null);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-10">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-white/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </button>
        
        <div className="max-w-md mx-auto">
          <div className="bg-white/5 rounded-lg p-8 border border-white/10">
            <h1 className="text-2xl font-bold text-white text-center mb-6">
              {isSignUp ? 'Create an Account' : 'Sign In to Your Account'}
            </h1>
            
            {formError && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-md p-3 mb-4 text-white text-sm">
                {formError}
              </div>
            )}
            
            {isSignUp ? (
              <Form {...signUpForm}>
                <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
                  <FormField
                    control={signUpForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your full name"
                            className="bg-black border-white/20"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="your@email.com"
                            className="bg-black border-white/20"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="••••••••"
                            className="bg-black border-white/20"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-[#F2A83B] text-black rounded-md font-medium hover:bg-[#F2A83B]/90 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin mr-2" />
                        Creating Account...
                      </>
                    ) : 'Create Account'}
                  </button>
                </form>
              </Form>
            ) : (
              <Form {...signInForm}>
                <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4">
                  <FormField
                    control={signInForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="your@email.com"
                            className="bg-black border-white/20"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signInForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="••••••••"
                            className="bg-black border-white/20"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-[#F2A83B] text-black rounded-md font-medium hover:bg-[#F2A83B]/90 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin mr-2" />
                        Signing In...
                      </>
                    ) : 'Sign In'}
                  </button>
                </form>
              </Form>
            )}
            
            <p className="text-white/60 text-center mt-6">
              {isSignUp 
                ? 'Already have an account?' 
                : 'Don\'t have an account?'}
              <button
                type="button"
                onClick={toggleFormType}
                className="text-[#F2A83B] ml-2 hover:underline"
                disabled={isLoading}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
