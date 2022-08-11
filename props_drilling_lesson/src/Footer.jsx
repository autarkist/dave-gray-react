import React from 'react';

const Footer = ({length}) => {
  const today = new Date();
  return (
    <footer>
      {/* <p>{length} List {length === 1 ? "item" : "items"}</p> */}
      <p>
        {length === 0 ? "No item" : 
          length === 1 ? length + " List item" :
          length + " List items"
        }
      </p>
      <p>Copyright &copy; {today.getFullYear()}</p>
    </footer>
  );
};

export default Footer;