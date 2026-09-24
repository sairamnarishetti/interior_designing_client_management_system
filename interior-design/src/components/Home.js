import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleExploreServices = () => {
        navigate('/services', { state: { fromHome: true } });
    };

    return (
        <div className="home">
            <h1 className="home-heading">Transforming Spaces Into Beautiful Experiences</h1>
            <p className="home-subheading">
                We bring your interior vision to life, creating timeless spaces that blend aesthetics, functionality, and your unique personality.
            </p>

            <div className="home-buttons">
                <button className="home-button" onClick={handleExploreServices}>Explore Services</button>
                <button className="home-button">Get Started</button>
            </div>

            {/* Image Gallery Section */}
            <div className="home-gallery">
                <div className="image-card">
                    <img src="/images/livingroom.jpg" alt="Living Room Design" className="gallery-img" />
                </div>
                <div className="image-card">
                    <img src="/images/kitchen.jpg" alt="Kitchen Design" className="gallery-img" />
                </div>
                <div className="image-card">
                    <img src="/images/bedroom.jpg" alt="Bedroom Design" className="gallery-img" />
                </div>
                <div className="image-card">
                    <img src="/images/studyroom.jpg" alt="Study Room Design" className="gallery-img" />
                </div>
            </div>

            {/* Statistics Section */}
            <div className="home-stats">
                <div className="home-stat-box">
                    <div className="home-stat-number">500+</div>
                    <div className="home-stat-label">Projects Completed</div>
                </div>
                <div className="home-stat-box">
                    <div className="home-stat-number">50+</div>
                    <div className="home-stat-label">Design Awards</div>
                </div>
                <div className="home-stat-box">
                    <div className="home-stat-number">98%</div>
                    <div className="home-stat-label">Client Satisfaction</div>
                </div>
            </div>
        </div>
    );
};

export default Home;
