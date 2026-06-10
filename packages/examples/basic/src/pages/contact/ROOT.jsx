import { Outlet } from "react-router";
const ContactWrapper = ({ children }) => {
  return (
    <div>
      <Outlet />
      <h1>Contact Wrapper Enabled</h1>
    </div>
  );
};
export default ContactWrapper;
