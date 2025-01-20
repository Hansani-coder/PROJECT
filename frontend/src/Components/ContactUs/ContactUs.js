import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


function ContactUs() {
    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_ojdwdgo', 'template_sha8cl5', form.current, {
        publicKey: 'dv0aPC-5K-aEMXjv9',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  return (
    <div>
      <h1>Contact Us</h1>
      <form ref={form} onSubmit={sendEmail}>
      <label>Name</label><br></br>
      <input type="text" name="user_name" /><br></br><br></br>
      <label>Email</label><br></br>
      <input type="email" name="user_email" /><br></br><br></br>
      <label>Message</label><br></br>
      <textarea name="message" /><br></br><br></br>
      <input type="submit" value="Send" />
    </form>
    </div>
  )
}

export default ContactUs;
