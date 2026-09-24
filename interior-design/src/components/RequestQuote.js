// RequestQuote.js
import React from "react";
import "./RequestQuote.css";

const RequestQuote = () => {
    return (
        <div className="request-quote-container">
            <h1>Request a Quote</h1>
            <form>
                <label>Name:</label>
                <input type="text" name="name" placeholder="Enter your name" required />
                
                <label>Email:</label>
                <input type="email" name="email" placeholder="Enter your email" required />
                
                <label>Phone (optional):</label>
                <input type="tel" name="phone" placeholder="Enter your phone number" />

                <label>Project Type:</label>
                <select name="projectType" required>
                    <option>Select project type</option>
                    <option>Residential</option>
                    <option>Commercial</option>
                </select>

                <label>Property Type:</label>
                <select name="propertyType" required>
                    <option>Select property type</option>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Office</option>
                </select>

                <label>Budget Range:</label>
                <div className="radio-group">
                    <label><input type="radio" name="budget" value="under5k" /> Under $5,000</label>
                    <label><input type="radio" name="budget" value="5k-15k" /> $5,000 - $15,000</label>
                    <label><input type="radio" name="budget" value="15k-30k" /> $15,000 - $30,000</label>
                    <label><input type="radio" name="budget" value="30k-50k" /> $30,000 - $50,000</label>
                    <label><input type="radio" name="budget" value="50k+" /> $50,000+</label>
                </div>

                <label>Desired Timeline:</label>
                <select name="timeline" required>
                    <option>Select timeline</option>
                    <option>1-3 Months</option>
                    <option>3-6 Months</option>
                    <option>6+ Months</option>
                </select>

                <label>Location:</label>
                <input type="text" name="location" placeholder="City, State" required />

                <label>Project Description:</label>
                <textarea name="description" placeholder="Describe your project..." required></textarea>

                <label>Services Interested In:</label>
                <div className="checkbox-group">
                    <label><input type="checkbox" name="services" value="interior-design" /> Interior Design</label>
                    <label><input type="checkbox" name="services" value="3d-visualization" /> 3D Visualization</label>
                    <label><input type="checkbox" name="services" value="furniture-selection" /> Furniture Selection</label>
                    <label><input type="checkbox" name="services" value="space-planning" /> Space Planning</label>
                    <label><input type="checkbox" name="services" value="color-consultation" /> Color Consultation</label>
                    <label><input type="checkbox" name="services" value="project-management" /> Project Management</label>
                </div>

                <label>How did you hear about us?</label>
                <select name="referral">
                    <option>Select an option</option>
                    <option>Google</option>
                    <option>Social Media</option>
                    <option>Friend</option>
                    <option>Other</option>
                </select>
                
               

                <button type="submit" className="submit-btn">Submit Quote Request</button>
            </form>
        </div>
    );
};

export default RequestQuote;
