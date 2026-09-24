import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FAQ.css";

const faqData = [
  {
    category: "Services",
    questions: [
      {
        question: "What services does Interior Studio offer?",
        answer: "We offer full-service interior design, space planning, furniture selection, and more."
      },
      {
        question: "Do you work on both residential and commercial projects?",
        answer: "Yes, we handle both residential and commercial design projects tailored to your needs."
      },
      {
        question: "Do you offer virtual design services?",
        answer: "Yes, we provide online consultations and virtual design packages."
      }
    ]
  },
  {
    category: "Process",
    questions: [
      {
        question: "How long does a typical design project take?",
        answer: "The duration depends on the project scope but generally ranges from a few weeks to several months."
      },
      {
        question: "What is your design process?",
        answer: "We begin with a consultation, followed by concept development, design execution, and final installation."
      },
      {
        question: "How involved will I be in the design process?",
        answer: "Your involvement depends on your preference. We collaborate closely but can handle everything if desired."
      }
    ]
  },
  {
    category: "Pricing",
    questions: [
      {
        question: "What is your fee structure?",
        answer: "Our fees are based on project scope and complexity. Contact us for a customized quote."
      },
      {
        question: "Do you offer free consultations?",
        answer: "Yes, we offer a complimentary initial consultation to discuss your project."
      },
      {
        question: "Are there additional costs beyond your design fee?",
        answer: "Additional costs may include furniture, materials, and contractor fees."
      }
    ]
  },
  {
    category: "Working Together",
    questions: [
      {
        question: "Do you work with existing furniture and décor?",
        answer: "Yes, we can incorporate your existing pieces into the new design."
      },
      {
        question: "How do you handle disagreements about design choices?",
        answer: "We focus on collaboration and provide options to ensure you are happy with the final design."
      },
      {
        question: "Do you work with clients' contractors or do you have your own?",
        answer: "We can work with your contractors or recommend trusted professionals."
      }
    ]
  }
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Hook to navigate to different pages

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <p>Find answers to common questions about our interior design services, process, and pricing.</p>
      
      <input 
        type="text" 
        className="faq-search" 
        placeholder="Search for questions..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {filteredFAQs.map((category, index) => (
        <div key={index} className="faq-category">
          <h2>{category.category}</h2>
          {category.questions.map((q, i) => (
            <details key={i} className="faq-item">
              <summary>{q.question}</summary>
              <p>{q.answer}</p>
            </details>
          ))}
        </div>
      ))}

      <div id="contact-section" className="faq-footer">
        <h2>Still Have Questions?</h2>
        <p>If you couldn't find the answer, feel free to contact us.</p>
        <button className="faq-button" onClick={() => navigate("/contact")}>
          Contact Us
        </button>
        <button className="faq-button">Request a Consultation</button>
      </div>
    </div>
  );
};

export default FAQ;
