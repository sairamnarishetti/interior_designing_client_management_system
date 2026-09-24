import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [successMessage, setSuccessMessage] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate form submission
        setSuccessMessage(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

        // Hide success message after 3 seconds
        setTimeout(() => setSuccessMessage(false), 3000);
    };

    return (
        <div className="contact-container">
            <h2 className="contact-heading">Contact Us</h2>
            <p className="contact-subtext">
                Have questions or ready to start your design journey? Reach out to us.
            </p>

            {successMessage && <div className="notification">✅ Message Sent Successfully!</div>}

            <form className="contact-form" onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Phone (optional)</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

                <label>Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />

                <label>Message</label>
                <textarea name="message" rows="4" value={formData.message} onChange={handleChange} required />

                <button type="submit">Send Message</button>
            </form>

            <div className="contact-info">
                <h3>Contact Information</h3>
                <p><strong>Office Location:</strong> 123 Design Studio St., New York, NY 10001</p>
                <p><strong>Phone:</strong> (212) 555-1234 (Mon-Fri: 9am - 6pm)</p>
                <p><strong>Email:</strong> info@interiorstudio.com</p>
                <p><strong>Business Hours:</strong><br />
                    Monday - Friday: 9am - 6pm <br />
                    Saturday: 10am - 4pm <br />
                    Sunday: Closed
                </p>
            </div>
        </div>
    );
};

export default Contact;
