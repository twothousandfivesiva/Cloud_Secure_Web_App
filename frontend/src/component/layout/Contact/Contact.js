
import "./Contact.css";
import { Button } from "@mui/material";


const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:velvetwings2005@gmail.com">
        <Button>Contact: velvetwings2005@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;