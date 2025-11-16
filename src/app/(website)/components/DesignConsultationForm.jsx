import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const WhatsAppForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendToWhatsApp = (e) => {
    e.preventDefault();
    const { name, phone, message } = formData;

    const recipient = '919264996345'; // 🔁 Your WhatsApp number (no + or 0)
    const text = `Hello, I'm ${name}\nContact: ${phone}\n\n${message}`;
    const encodedText = encodeURIComponent(text);

    const url = `https://wa.me/${recipient}?text=${encodedText}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4 text-black">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl"
            aria-label="Close form"
          >
            <FaTimes />
          </button>
        )}

        <h2 className="text-2xl font-semibold text-center mb-4 text-green-700">
          Contact via WhatsApp
        </h2>

        <form onSubmit={sendToWhatsApp} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition duration-300"
          >
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default WhatsAppForm;







