export function handleSupabaseError(error) {
  const messages = {
    'Invalid login credentials': 'Wrong email or password',
    'User already registered': 'An account with this email exists',
    'Email not confirmed': 'Please check your email to confirm',
    'JWT expired': 'Session expired, please login again',
    'Email rate limit exceeded': 'Too many attempts, try later',
    'Password should be at least 6 characters': 
      'Password must be at least 8 characters',
    'Unable to validate email address': 'Please enter a valid email',
  };
  return messages[error?.message] || error?.message || 'Something went wrong';
}
