"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Clock } from "lucide-react";
import { toast } from "react-toastify";

const ConsultationForm = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consultationType: "",
    preferredDate: "",
    preferredTime: "",
    meetingType: "",
    projectDetails: "",
    urgency: "",
    hearAbout: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    const valueToStore =
      field === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setFormData((prev) => ({ ...prev, [field]: valueToStore }));

    if (field === "name") {
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
    } else if (field === "email") {
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
    } else if (field === "phone") {
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.phone.length !== 10 ||
      formData.name.trim() === "" ||
      formData.email.trim() === ""
    ) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    setIsSubmitting(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_BOOKING_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          phone: `+91${formData.phone}`,
          consultation_type: formData.consultationType,
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
          meeting_type: formData.meetingType,
          project_details: formData.projectDetails,
          urgency: formData.urgency,
          hear_about: formData.hearAbout,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      toast.success("🎉 Thank you! We’ll contact you within 24 hours.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        consultationType: "",
        preferredDate: "",
        preferredTime: "",
        meetingType: "",
        projectDetails: "",
        urgency: "",
        hearAbout: "",
      });
      setErrors({});
      setIsOpen(false);
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const value = date.toISOString().split("T")[0];
      const label = date.toLocaleDateString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      dates.push({ value, label });
    }
    return dates;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white p-6 rounded-lg shadow-2xl z-[9999]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl font-bold text-amber-800">
            <Calendar className="w-5 h-5" />
            <span>Book Your Consultation</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <TextInputBlock
              label="Full Name *"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              error={errors.name}
            />
            <PhoneInputBlock
              label="Phone Number *"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
            />
          </div>

          <TextInputBlock
            label="Email Address *"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            error={errors.email}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <SelectField
              label="Consultation Type *"
              id="consultationType"
              value={formData.consultationType}
              onChange={handleInputChange}
              options={[
                {
                  value: "initial-consultation",
                  label: "Initial Design Consultation",
                },
                { value: "space-planning", label: "Space Planning Session" },
                {
                  value: "color-material",
                  label: "Color & Material Selection",
                },
                { value: "budget-planning", label: "Budget Planning" },
                { value: "project-review", label: "Project Review" },
                { value: "general-advice", label: "General Design Advice" },
              ]}
            />

            <SelectField
              label="Meeting Preference *"
              id="meetingType"
              value={formData.meetingType}
              onChange={handleInputChange}
              options={[
                { value: "in-person", label: "In-Person Visit" },
                { value: "video-call", label: "Video Call" },
                { value: "phone-call", label: "Phone Call" },
                { value: "site-visit", label: "Site Visit" },
              ]}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <SelectField
              label="Preferred Date *"
              id="preferredDate"
              value={formData.preferredDate}
              onChange={handleInputChange}
              options={getDateOptions()}
            />

            <SelectField
              label="Preferred Time *"
              id="preferredTime"
              value={formData.preferredTime}
              onChange={handleInputChange}
              options={[
                "9:00 am - 10:00 am",
                "10:00 am - 11:00 am",
                "11:00 am - 12:00 pm",
                "12:00 pm - 1:00 pm",
                "2:00 pm - 3:00 pm",
                "3:00 pm - 4:00 pm",
                "4:00 pm - 5:00 pm",
                "5:00 pm - 6:00 pm",
                "6:00 pm - 7:00 pm",
              ].map((t) => ({ value: t, label: t }))}
            />
          </div>

          <SelectField
            label="Project Urgency"
            id="urgency"
            value={formData.urgency}
            onChange={handleInputChange}
            options={[
              { value: "urgent", label: "Urgent (Within 1 week)" },
              { value: "soon", label: "Soon (Within 1 month)" },
              { value: "planning", label: "Planning Phase (2-3 months)" },
              { value: "exploring", label: "Just Exploring Ideas" },
            ]}
          />

          <div className="space-y-2">
            <Label htmlFor="projectDetails">Project Details</Label>
            <Textarea
              id="projectDetails"
              value={formData.projectDetails}
              onChange={(e) =>
                handleInputChange("projectDetails", e.target.value)
              }
              className="bg-white resize-y min-h-[150px] focus:border-gray-300 focus:ring-1 focus:ring-gray-200"
              rows={8}
              placeholder="Please provide details about your project goals, preferences, or any questions you have..."
            />
          </div>

          <SelectField
            label="How did you hear about us?"
            id="hearAbout"
            value={formData.hearAbout}
            onChange={handleInputChange}
            options={[
              { value: "google", label: "Google Search" },
              { value: "social-media", label: "Social Media" },
              { value: "referral", label: "Friend/Family Referral" },
              { value: "website", label: "Website" },
              { value: "advertisement", label: "Advertisement" },
              { value: "other", label: "Other" },
            ]}
          />

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="flex items-start space-x-2">
              <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Consultation Details:</p>
                <ul className="space-y-1 text-amber-700">
                  <li>
                    • Initial consultation is complimentary (up to 1 hour)
                  </li>
                  <li>• We'll discuss your vision, questions, and budget</li>
                  <li>
                    • You'll receive preliminary design ideas and next steps
                  </li>
                  <li>• No obligation to proceed with full project</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="submit"
              className="link-button "
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              {isSubmitting ? "Booking..." : "Book Consultation"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

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

const TextInputBlock = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  required,
  error,
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      className="bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-200"
      required={required}
    />
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

const SelectField = ({ label, id, value, onChange, options }) => (
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

export default ConsultationForm;
