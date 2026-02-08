import React, { useState } from 'react';
import './ContactForm.css';
import contactImage from  '/contactus.png';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
   <div className="contact-container">
    <div className="contact-wrapper">
      <div className="image-section">
        <img src={contactImage} alt="Contact illustration" />
      </div>

      {/* Right side - Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Contact Us</h2>
        
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows="5"
          />
        </div>

        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </div>
  </div>
  );
};

export default ContactForm;