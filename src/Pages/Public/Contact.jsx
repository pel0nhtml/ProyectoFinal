import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import Sidebar from '../../Components/Sidebar';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'Underworld_Myco_Service',  // Reemplaza con tu Service ID
      'Templ_Under_Myco', // Reemplaza con tu Template ID
      form.current,
      'YOUR_USER_ID'      // Reemplaza con tu User ID
    )
    .then((result) => {
      console.log(result.text);
      alert('Message sent successfully!');
    }, (error) => {
      console.log(error.text);
      alert('Failed to send message. Try again later.');
    });
  };

  return (
    <div>
      <Sidebar/>
      <div className="contact-form-container">
        <h2>Contact Us</h2>
        <form ref={form} onSubmit={sendEmail}>
          <div>
            <label>Name</label>
            <input type="text" name="user_name" required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="user_email" required />
          </div>
          <div>
            <label>Message</label>
            <textarea name="message" required></textarea>
          </div>
          <div>
            <button type="submit">Send</button>
          </div>
        </form>

        <div className="social-links">
          <h3>Follow us on:</h3>
          <a href="https://www.instagram.com/underworld_mycologist/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          {/* Puedes agregar más enlaces a otras redes sociales aquí */}
        </div>
      </div>
    </div>
  );
};

export default Contact;