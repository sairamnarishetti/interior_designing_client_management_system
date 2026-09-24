import React, { useEffect } from 'react';
import Header from '../components/Header'; // Import Header
import './About.css'; // Ensure styles are applied

const About = () => {
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }, []);

    return (
        <div className="about-page">
            <Header />
            <section className="about-us">
                <h2>About Us</h2>
                <p>Learn more about our interior design studio and the passionate team behind our beautiful spaces.</p>

                <div className="about-content">
                    <div className="text">
                        <h3>Our Story</h3>
                        <p>
                        Interior Studio was founded in 2010 with a vision to transform living and working spaces into beautiful, functional environments that inspire and delight.
                    What began as a small operation has grown into a full-service design studio with a reputation for excellence and attention to detail.
                    Our journey has been defined by our commitment to understanding each client's unique needs and translating them into exceptional designs that exceed expectations.
                        </p>
                    </div>
                    <div className="image">
                        <img src="/images/about-image.jpg" alt="Interior Design" />
                    </div>
                </div>
            </section>
            {/* Removed <Footer /> from here if it's already included globally */}
        </div>
    );
};

export default About;
