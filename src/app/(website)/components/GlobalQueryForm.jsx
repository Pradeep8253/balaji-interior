"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, X } from "lucide-react";
import { toast } from "react-toastify";

export default function GlobalQueryForm() {
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
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const formSeenInSession = sessionStorage.getItem("hasSeenForm");

    if (!formSeenInSession) {
      setIsOpen(true);
      sessionStorage.setItem("hasSeenForm", "true");
    }
  }, []); 

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
      if (value && value.length !== 10) {
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
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed z-50 left-1/2 top-1/2 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-0 flex max-h-[95vh]">
          <div className="hidden md:flex md:w-1/2 bg-teal-500 items-center justify-center rounded-l-lg relative">
            <Image
              src="https://res.cloudinary.com/dnekarzit/image/upload/v1757172012/WhatsApp_Image_2025-09-06_at_20.48.32_26eed2f8_uoigzt.jpg"
              alt="query form image"
              fill
              className="object-cover rounded-l-lg"
              priority
            />
          </div>
          <div className="w-full md:w-1/2 p-6 relative overflow-y-auto">
            <Dialog.Close asChild>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </Dialog.Close>
            <h5 className="text-p-md font-bold lg:text-p-lg">
              Need Any Assistance?
            </h5>
            <p className="mb-4 text-p-xs font-light lg:text-p-sm">
              Fill details and we will get back to you soon.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
              <TextInputBlock
                label="Email Address *"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                error={errors.email}
              />
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
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="submit"
                  className="link-button"
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                >
                  {isSubmitting ? "Scheduling..." : "Schedule a Call"}
                </Button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

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
