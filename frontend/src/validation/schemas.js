import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});

export const signupSchema = yup.object({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[6-9][0-9]{9}$/, 'Enter valid 10-digit mobile number starting with 6-9'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the Terms & Conditions to proceed')
});

export const rechargeSchema = yup.object({
  mobileNumber: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[6-9][0-9]{9}$/, 'Enter valid 10-digit mobile number starting with 6-9'),
  operator: yup
    .string()
    .required('Please select an operator'),
  amount: yup
    .number()
    .required('Please select recharge amount')
    .positive('Amount must be positive')
});