import React, { useState, useEffect } from 'react';
import './services.css';

const servicesData = [
    { id: 1, title: "Interior Design", price: "$1,500", icon: "🏠", image: "/images/interior-design.jpg", description: "We create beautiful, functional spaces tailored to your taste." },
    { id: 2, title: "Space Planning", price: "$1,200", icon: "📐", image: "/images/space-planning.jpg", description: "Maximize your space with expert layout and planning." },
    { id: 3, title: "3D Visualization", price: "$1,000", icon: "🖥️", image: "/images/3d-visualization.jpg", description: "See your designs come to life with realistic 3D visuals." },
    { id: 4, title: "Consultation", price: "$250", icon: "📞", image: "/images/consultation.jpg", description: "Expert advice to bring your vision to reality." },
    { id: 5, title: "Project Management", price: "$2,000", icon: "📋", image: "/images/project-management.jpg", description: "We handle all aspects of your design project for seamless execution." }
];

const Services = () => {
    const [selectedService, setSelectedService] = useState(null);

    // Scroll to top when the component is mounted
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="services-container">
            {/* Header */}
            <h1 className="services-header">Transform Your Space with Our Expertise</h1>

            {/* "Our Services" Title Below Header */}
            <h2 className="services-title">Our Services</h2>

            {/* Service Grid (3 in first row, 2 in second) */}
            <div className="services-grid">
                <div className="services-row">
                    {servicesData.slice(0, 3).map(service => (
                        <div key={service.id} className="service-card" onClick={() => setSelectedService(service)}>
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <img src={service.image} alt={service.title} className="service-image" />
                            <p>Starting from <strong>{service.price}</strong></p>
                            <button className="book-now">Book Now →</button>
                        </div>
                    ))}
                </div>

                <div className="services-row">
                    {servicesData.slice(3).map(service => (
                        <div key={service.id} className="service-card" onClick={() => setSelectedService(service)}>
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <img src={service.image} alt={service.title} className="service-image" />
                            <p>Starting from <strong>{service.price}</strong></p>
                            <button className="book-now">Book Now →</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for Service Details */}
            {selectedService && (
                <div className="modal-overlay" onClick={() => setSelectedService(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedService(null)}>×</button>
                        <h2>{selectedService.title}</h2>
                        <img src={selectedService.image} alt={selectedService.title} className="modal-image" />
                        <p className="modal-description">{selectedService.description}</p>
                        <p className="modal-price">{selectedService.price}</p>
                        <button className="modal-button">Book Now</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Services;
