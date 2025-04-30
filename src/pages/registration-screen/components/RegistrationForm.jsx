import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "components/AppIcon";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    address: "",
    city: "",
    postalCode: "",
    taxId: "",
    accountType: "individual",
    currency: "USD",
    acceptTerms: false,
    acceptPrivacy: false,
    allowMarketing: false
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const countries = [
    "United States", "United Kingdom", "Canada", "Australia", 
    "Germany", "France", "Japan", "Singapore", "Switzerland", "New Zealand"
  ];

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "NZD", name: "New Zealand Dollar" }
  ];

  const accountTypes = [
    { id: "individual", name: "Individual", description: "Personal trading account" },
    { id: "corporate", name: "Corporate", description: "Business trading account" }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }

    // Password strength check
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return { text: "Very Weak", color: "bg-danger" };
    if (passwordStrength === 1) return { text: "Weak", color: "bg-danger" };
    if (passwordStrength === 2) return { text: "Fair", color: "bg-warning" };
    if (passwordStrength === 3) return { text: "Good", color: "bg-warning" };
    if (passwordStrength === 4) return { text: "Strong", color: "bg-success" };
    if (passwordStrength === 5) return { text: "Very Strong", color: "bg-success" };
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.country) newErrors.country = "Country is required";
    }

    if (step === 2) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (passwordStrength < 3) {
        newErrors.password = "Password is too weak";
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    }

    if (step === 3) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    }

    if (step === 4) {
      if (!formData.acceptTerms) newErrors.acceptTerms = "You must accept the terms of service";
      if (!formData.acceptPrivacy) newErrors.acceptPrivacy = "You must accept the privacy policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // In a real app, this would submit the form data to an API
      console.log("Form submitted:", formData);
      navigate("/dashboard");
    }
  };

  const renderProgressBar = () => {
    const steps = [
      { number: 1, label: "Personal Info" },
      { number: 2, label: "Account Setup" },
      { number: 3, label: "Address" },
      { number: 4, label: "Verification" }
    ];

    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {steps.map((step) => (
            <div 
              key={step.number} 
              className="flex flex-col items-center"
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === step.number 
                    ? "bg-primary text-white" 
                    : currentStep > step.number 
                      ? "bg-success text-white" :"bg-gray-100 text-text-tertiary"
                }`}
              >
                {currentStep > step.number ? (
                  <Icon name="Check" size={16} />
                ) : (
                  step.number
                )}
              </div>
              <span className={`text-xs mt-1 ${
                currentStep === step.number 
                  ? "text-primary font-medium" 
                  : currentStep > step.number 
                    ? "text-success" :"text-text-tertiary"
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
        <div className="relative h-1 bg-gray-100 rounded-full">
          <div 
            className="absolute h-1 bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(currentStep - 1) * 33.33}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderPersonalInfoStep = () => {
    return (
      <>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Personal Information</h2>
          <p className="text-text-secondary text-sm">Please provide your personal details to get started.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-text-secondary mb-1">
              First Name
            </label>
            <input
              type="text" id="firstName" name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.firstName ? 'border-danger' : 'border-border'} rounded-lg focus:ring-primary focus:ring-2 focus:outline-none`}
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className="mt-1 text-xs text-danger">{errors.firstName}</p>}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-text-secondary mb-1">
              Last Name
            </label>
            <input
              type="text" id="lastName" name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.lastName ? 'border-danger' : 'border-border'} rounded-lg focus:ring-primary focus:ring-2 focus:outline-none`}
              placeholder="Enter your last name"
            />
            {errors.lastName && <p className="mt-1 text-xs text-danger">{errors.lastName}</p>}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
            Email Address
          </label>
          <input
            type="email" id="email" name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.email ? 'border-danger' : 'border-border'} rounded-lg focus:ring-primary focus:ring-2 focus:outline-none`}
            placeholder="Enter your email address"
          />
          {errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-1">
            Phone Number
          </label>
          <input
            type="tel" id="phone" name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.phone ? 'border-danger' : 'border-border'} rounded-lg focus:ring-primary focus:ring-2 focus:outline-none`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="mt-1 text-xs text-danger">{errors.phone}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-text-secondary mb-1">
            Country of Residence
          </label>
          <select
            id="country" name="country"
            value={formData.country}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.country ? 'border-danger' : 'border-border'} rounded-lg focus:ring-primary focus:ring-2 focus:outline-none bg-white`}
          >
            <option value="">Select your country</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <p className="mt-1 text-xs text-danger">{errors.country}</p>}
        </div>
      </>
    );
  };

  const renderAccountSetupStep = () => {
    return (
      <>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Account Setup</h2>
          <p className="text-text-secondary text-sm">Create your secure trading account credentials.</p>
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">
            Password
            <span className="ml-1 text-xs text-text-tertiary">(min. 8 characters)</span>
          </label>
          <div className="relative">
            <input
              type="password" id="password" name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.password ? 'border-danger' : 'border-border'} rounded-lg focus:ring-primary focus:ring-2 focus:outline-none`}
              placeholder="Create a strong password"
            />
            <div className="absolute right-3 top-2.5 text-text-tertiary">
              <Icon name="Lock" size={16} />
            </div>
          </div>
          {errors.password && <p className="mt-1 text-xs text-danger">{errors.password}</p>}
          
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-secondary">Password Strength:</span>
                <span className="text-xs font-medium" style={{ color: getPasswordStrengthLabel().color === "bg-danger" ? "#EF4444" : getPasswordStrengthLabel().color === "bg-warning" ? "#F59E0B" : "#10B981" }}>
                  {getPasswordStrengthLabel().text}
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getPasswordStrengthLabel().color}`} 
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-text-tertiary">
                <div className="flex items-center">
                  <Icon name={passwordStrength >= 1 ? "CheckCircle" : "Circle"} size={12} className={passwordStrength >= 1 ? "text-success mr-1" : "text-text-tertiary mr-1"} />
                  <span>At least 8 characters</span>
                </div>
                <div className="flex items-center">
                  <Icon name={/[A-Z]/.test(formData.password) ? "CheckCircle" : "Circle"} size={12} className={/[A-Z]/.test(formData.password) ? "text-success mr-1" : "text-text-tertiary mr-1"} />
                  <span>Uppercase letter</span>
                </div>
                <div className="flex items-center">
                  <Icon name={/[a-z]/.test(formData.password) ? "CheckCircle" : "Circle"} size={12} className={/[a-z]/.test(formData.password) ? "text-success mr-1" : "text-text-tertiary mr-1"} />
                  <span>Lowercase letter</span>
                </div>
                <div className="flex items-center">
                  <Icon name={/[0-9]/.test(formData.password) ? "CheckCircle" : "Circle"} size={12} className={/[0-9]/.test(formData.password) ? "text-success mr-1" : "text-text-tertiary mr-1"} />
                  <span>Number</span>
                </div>
                <div className="flex items-center">
                  <Icon name={/[^A-Za-z0-9]/.test(formData.password) ? "CheckCircle" : "Circle"} size={12} className={/[^A-Za-z0-9]/.test(formData.password) ? "text-success mr-1" : "text-text-tertiary mr-1"} />
                  <span>Special character</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type="password" id="confirmPassword" name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-danger' : 'border-border'} rounded-lg focus:ring-primary focus:ring-2 focus:outline-none`}
              placeholder="Confirm your password"
            />
            <div className="absolute right-3 top-2.5 text-text-tertiary">
              <Icon name="Lock" size={16} />
            </div>
          </div>
          {errors.confirmPassword && <p className="mt-1 text-xs text-danger">{errors.confirmPassword}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-text-secondary mb-1">
            Date of Birth
          </label>
          <input
            type="date" id="dateOfBirth" name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.dateOfBirth ? 'border-danger' : 'border-border'} rounded-lg focus:ring-primary focus:ring-2 focus:outline-none`}
          />
          {errors.dateOfBirth && <p className="mt-1 text-xs text-danger">{errors.dateOfBirth}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Account Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {accountTypes.map((type) => (
              <div 
                key={type.id}
                className={`border ${formData.accountType === type.id ? 'border-primary bg-primary-light bg-opacity-30' : 'border-border'} rounded-lg p-3 cursor-pointer transition-colors`}
                onClick={() => setFormData({ ...formData, accountType: type.id })}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border ${formData.accountType === type.id ? 'border-primary' : 'border-text-tertiary'} flex items-center justify-center mr-2`}>
                    {formData.accountType === type.id && (
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-text-primary">{type.name}</h3>
                    <p className="text-xs text-text-tertiary">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="currency" className="block text-sm font-medium text-text-secondary mb-1">
            Preferred Currency
          </label>
          <select
            id="currency" name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-primary focus:ring-2 focus:outline-none bg-white"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  };

  const renderAddressStep = () => {
    return (
      <>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Address Information</h2>
          <p className="text-text-secondary text-sm">Please provide your residential address details.</p>
        </div>
        
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-text-secondary mb-1">
            Street Address
          </label>
          <input
            type="text" id="address" name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.address ? 'border-danger' : 'border-border'} rounded-lg focus:ring-primary focus:ring-2 focus:outline-none`}
            placeholder="Enter your street address"
          />
          {errors.address && <p className="mt-1 text-xs text-danger">{errors.address}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-text-secondary mb-1">
              City
            </label>
            <input
              type="text" id="city" name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.city ? 'border-danger' : 'border-border'} rounded-lg focus:ring-primary focus:ring-2 focus:outline-none`}
              placeholder="Enter your city"
            />
            {errors.city && <p className="mt-1 text-xs text-danger">{errors.city}</p>}
          </div>
          
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-text-secondary mb-1">
              Postal Code
            </label>
            <input
              type="text" id="postalCode" name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.postalCode ? 'border-danger' : 'border-border'} rounded-lg focus:ring-primary focus:ring-2 focus:outline-none`}
              placeholder="Enter your postal code"
            />
            {errors.postalCode && <p className="mt-1 text-xs text-danger">{errors.postalCode}</p>}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="taxId" className="block text-sm font-medium text-text-secondary mb-1">
            Tax ID / SSN <span className="text-xs text-text-tertiary">(Optional)</span>
          </label>
          <input
            type="text" id="taxId" name="taxId"
            value={formData.taxId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-primary focus:ring-2 focus:outline-none" placeholder="Enter your tax ID or social security number"
          />
          <p className="mt-1 text-xs text-text-tertiary">This information helps us comply with tax regulations.</p>
        </div>
      </>
    );
  };

  const renderVerificationStep = () => {
    return (
      <>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Verification & Agreements</h2>
          <p className="text-text-secondary text-sm">Please review and accept our terms to complete your registration.</p>
        </div>
        
        <div className="bg-primary-light bg-opacity-30 p-4 rounded-lg mb-6">
          <div className="flex items-start">
            <Icon name="Info" size={20} className="text-primary mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-1">Identity Verification Required</h3>
              <p className="text-xs text-text-secondary">
                To comply with financial regulations, you'll need to verify your identity after registration. 
                Please have a valid government ID and proof of address ready.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className={`p-4 border ${errors.acceptTerms ? 'border-danger' : 'border-border'} rounded-lg`}>
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  id="acceptTerms" name="acceptTerms" type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
              </div>
              <label htmlFor="acceptTerms" className="ml-3 text-sm text-text-secondary">
                I have read and agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a>
              </label>
            </div>
            {errors.acceptTerms && <p className="mt-1 text-xs text-danger">{errors.acceptTerms}</p>}
          </div>
          
          <div className={`p-4 border ${errors.acceptPrivacy ? 'border-danger' : 'border-border'} rounded-lg`}>
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  id="acceptPrivacy" name="acceptPrivacy" type="checkbox"
                  checked={formData.acceptPrivacy}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
              </div>
              <label htmlFor="acceptPrivacy" className="ml-3 text-sm text-text-secondary">
                I have read and agree to the <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </label>
            </div>
            {errors.acceptPrivacy && <p className="mt-1 text-xs text-danger">{errors.acceptPrivacy}</p>}
          </div>
          
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  id="allowMarketing" name="allowMarketing" type="checkbox"
                  checked={formData.allowMarketing}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
              </div>
              <label htmlFor="allowMarketing" className="ml-3 text-sm text-text-secondary">
                I agree to receive marketing communications about Deriv Trader products, services, and promotions
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-success-light p-4 rounded-lg mb-6">
          <div className="flex items-start">
            <Icon name="ShieldCheck" size={20} className="text-success mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-1">Your Data is Secure</h3>
              <p className="text-xs text-text-secondary">
                We use industry-standard encryption and security measures to protect your personal information.
                Your data will never be shared with third parties without your consent.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfoStep();
      case 2:
        return renderAccountSetupStep();
      case 3:
        return renderAddressStep();
      case 4:
        return renderVerificationStep();
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      {renderProgressBar()}
      
      {renderStepContent()}
      
      <div className="flex justify-between mt-8">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handlePrevious}
            className="flex items-center px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-gray-50 transition-colors"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back
          </button>
        ) : (
          <div></div>
        )}
        
        {currentStep < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
          >
            Continue
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </button>
        ) : (
          <button
            type="submit" className="flex items-center px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
          >
            Complete Registration
            <Icon name="Check" size={16} className="ml-2" />
          </button>
        )}
      </div>
    </form>
  );
};

export default RegistrationForm;