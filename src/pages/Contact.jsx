import { useState } from 'react';
import '../CssPages/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess('Thank you! Your message has been recorded in this demo.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <span className="section-tag">WE'RE HERE TO HELP</span>
        <h1>Let's talk about your learning goals.</h1>
        <p>
          Have a question about finding a tutor, becoming a tutor, or using
          TutorConnect? Send our team a message.
        </p>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <h2>Get in touch</h2>
          <p>
            We want to make finding the right learning support simple and
            comfortable for everyone.
          </p>

          <div className="contact-info-item">
            <h3>Email support</h3>
            <p>support@tutorconnect.example</p>
          </div>

          <div className="contact-info-item">
            <h3>Support hours</h3>
            <p>Monday – Friday</p>
            <p>9:00 AM – 5:00 PM</p>
          </div>

          <div className="contact-info-item">
            <h3>What can we help with?</h3>
            <p>Finding tutors, bookings, accounts, and technical issues.</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send us a message</h2>

          <label htmlFor="contact-name">Full name</label>
          <input
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="contact-email">Email address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="contact-subject">Subject</label>
          <select
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="">Choose a subject</option>
            <option value="finding-tutor">Finding a tutor</option>
            <option value="becoming-tutor">Becoming a tutor</option>
            <option value="booking">Booking and scheduling</option>
            <option value="account">Account support</option>
            <option value="technical">Technical problem</option>
            <option value="other">Other</option>
          </select>

          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us how we can help..."
            rows="5"
            required
          />

          <button type="submit" className="primary-btn">
            Send message
          </button>

          {success && <p className="contact-success">{success}</p>}
        </form>
      </section>
    </main>
  );
}

export default Contact;
