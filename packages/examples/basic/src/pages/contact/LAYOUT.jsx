import { Outlet } from "react-router";
const ContactLayout = ({ children }) => {
  return (
    <div>
      <Outlet />
      <h1>Contact Layout Enabled</h1>
    </div>
  );
};
export default ContactLayout;
