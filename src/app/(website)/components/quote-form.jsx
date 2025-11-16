"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calculator } from "lucide-react";
import { toast } from "react-toastify";

const QuoteForm = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    propertyType: "",
    area: "",
    budget: "",
    location: "",
    timeline: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (key, value) => {
    let valueToStore = value;
    if (key === "phone") {
      valueToStore = value.replace(/\D/g, "").slice(0, 10);
    } else if (key === "area") {
      valueToStore = value.replace(/\D/g, "");
    }
    setForm((prev) => ({ ...prev, [key]: valueToStore }));

    if (key === "name") {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          name: "Name can only contain letters and spaces.",
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.name;
          return newErrors;
        });
      }
    } else if (key === "email") {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address.",
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      }
    } else if (key === "phone") {
      if (/\D/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          phone: "Phone can contain numbers only.",
        }));
      } else if (value && value.length !== 10) {
        setErrors((prev) => ({
          ...prev,
          phone: "Phone number must be 10 digits.",
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.phone;
          return newErrors;
        });
      }
    } else if (key === "location") {
      if (value && !/^[A-Za-z0-9\s,-]*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          location: "Location contains invalid characters.",
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.location;
          return newErrors;
        });
      }
    } else if (key === "area") {
        if (value && /\D/.test(value)) {
            setErrors(prev => ({ ...prev, area: "Area must be a number." }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.area;
                return newErrors;
            });
        }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'email', 'phone', 'location', 'area', 'projectType', 'propertyType'];
    for (const field of requiredFields) {
        if (!form[field]) {
            toast.error(`Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return;
        }
    }

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_QUOTE_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: `+91${form.phone}`,
          project_type: form.projectType,
          property_type: form.propertyType,
          area: form.area,
          budget: form.budget || 'Not specified',
          location: form.location,
          timeline: form.timeline || 'Not specified',
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      toast.success(
        "🎉 Thank you! Your query has been submitted. We will get back to you."
      );

      setForm({
        name: "", email: "", phone: "", projectType: "", propertyType: "",
        area: "", budget: "", location: "", timeline: "", message: "",
      });
      setErrors({});
      setIsOpen(false);
    } catch (error) {
      console.error("Email send error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white z-[9999] p-6 shadow-xl max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-amber-800">
            <Calculator className="w-5 h-5" />
            Submit a Query
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <InputBlock
              label="Full Name *"
              id="name"
              value={form.name}
              onChange={handleInputChange}
              error={errors.name}
            />
            <InputBlock
              label="Email Address *"
              id="email"
              type="email"
              value={form.email}
              onChange={handleInputChange}
              error={errors.email}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <PhoneInputBlock
              label="Phone Number *"
              id="phone"
              value={form.phone}
              onChange={handleInputChange}
              error={errors.phone}
            />
            <InputBlock
              label="Project Location *"
              id="location"
              value={form.location}
              onChange={handleInputChange}
              error={errors.location}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <SelectBlock
              label="Project Type *"
              id="projectType"
              value={form.projectType}
              options={[
                { value: "complete-interior", label: "Complete Interior Design" },
                { value: "partial-renovation", label: "Partial Renovation" },
                { value: "consultation", label: "Design Consultation" },
                { value: "furniture-selection", label: "Furniture Selection" },
                { value: "space-planning", label: "Space Planning" },
              ]}
              onChange={handleInputChange}
            />
            <SelectBlock
              label="Property Type *"
              id="propertyType"
              value={form.propertyType}
              options={[
                { value: "apartment", label: "Apartment" },
                { value: "villa", label: "Villa/Bungalow" },
                { value: "office", label: "Office Space" },
                { value: "retail", label: "Retail Store" },
                { value: "restaurant", label: "Restaurant/Cafe" },
                { value: "other", label: "Other" },
              ]}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <InputBlock
              label="Area (sq ft) *"
              id="area"
              type="text" 
              inputMode="numeric"
              value={form.area}
              onChange={handleInputChange}
              error={errors.area}
            />
            <SelectBlock
              label="Budget Range"
              id="budget"
              value={form.budget}
              options={[
                { value: "under-5 lakhs", label: "Under ₹5 Lakhs" },
                { value: "5-10 lakhs", label: "₹5 - 10 Lakhs" },
                { value: "10-20 lakhs", label: "₹10 - 20 Lakhs" },
                { value: "20-50 lakhs", label: "₹20 - 50 Lakhs" },
                { value: "above-50 lakhs", label: "Above ₹50 Lakhs" },
              ]}
              onChange={handleInputChange}
            />
          </div>

          <SelectBlock
            label="Project Timeline"
            id="timeline"
            value={form.timeline}
            options={[
              { value: "immediate", label: "Immediately" },
              { value: "1-month", label: "Within 1 Month" },
              { value: "2-3-months", label: "2-3 Months" },
              { value: "3-6-months", label: "3-6 Months" },
              { value: "flexible", label: "Flexible" },
            ]}
            onChange={handleInputChange}
          />

          <div className="space-y-2">
            <Label htmlFor="message">Project Description</Label>
            <Textarea
              id="message"
              className="bg-white resize-y min-h-[150px] focus:border-gray-300 focus:ring-1 focus:ring-gray-200"
              rows={8}
              value={form.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Please provide details about your project goals, preferences, or any questions you have..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
              className="text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-amber-800 hover:bg-amber-900 text-white cursor-pointer"
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              {isSubmitting ? "Submitting..." : "Submit Query"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};


const InputBlock = ({ label, id, type = "text", value, onChange, error, ...props }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      className="bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-200"
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      required={label.includes("*")}
      {...props}
    />
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

const SelectBlock = ({ label, id, value, options, onChange }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Select
      value={value}
      onValueChange={(val) => onChange(id, val)}
      required={label.includes("*")}
    >
      <SelectTrigger className="w-full bg-white border border-gray-300 focus:border-gray-300 focus:ring-1 focus:ring-gray-200">
        <SelectValue
          placeholder={`Select ${label.replace(" *", "").toLowerCase()}`}
        />
      </SelectTrigger>

      <SelectContent className="bg-white z-[99999]">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const PhoneInputBlock = ({ label, id, value, onChange, error }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <div className="flex items-center">
      <span className="px-2 py-1.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l text-gray-700">
        +91
      </span>
      <Input
        id={id}
        type="tel"
        maxLength={10}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        className="bg-white rounded-l-none focus:border-gray-300 focus:ring-1 focus:ring-gray-200"
        required
      />
    </div>
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

export default QuoteForm;