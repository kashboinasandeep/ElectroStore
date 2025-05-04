import { ListGroup, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaHome, FaOpencart, FaUserSecret } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineCategory, MdAddBox, MdViewDay, MdDashboard } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";

const SideMenu = () => {
  return (
    <ListGroup variant="flush" className="shadow">
      {/* Common menu items */}
      {[
        { to: "/admin/home", icon: <FaHome size={20} />, text: "Home" },
        { to: "/admin/add-category", icon: <BiCategoryAlt size={20} />, text: "Add Category" },
        { to: "/admin/categories", icon: <MdOutlineCategory size={20} />, text: "View Categories" },
        { to: "/admin/add-product", icon: <MdAddBox size={20} />, text: "Add Product" },
        { to: "/admin/products", icon: <MdViewDay size={20} />, text: "View Products" },
        { to: "/admin/orders", icon: <FaOpencart size={20} />, text: "Orders" },
        { to: "/users/home", icon: <MdDashboard size={20} />, text: "Dashboard" },
      ].map((item, idx) => (
        <ListGroup.Item as={NavLink} to={item.to} action key={idx}>
          <div className="d-flex align-items-center">
            {item.icon}
            <span className="ms-2">{item.text}</span>
          </div>
        </ListGroup.Item>
      ))}

      {/* Admin Users with Badge */}
      <ListGroup.Item
        as={NavLink}
        to="/admin/users"
        action
        className="d-flex justify-content-between align-items-center"
      >
        <div className="d-flex align-items-center">
          <FaUserSecret size={20} />
          <span className="ms-2">Users</span>
        </div>
        <Badge pill bg="danger">
          new
        </Badge>
      </ListGroup.Item>

      {/* Logout */}
      <ListGroup.Item action>
        <div className="d-flex align-items-center">
          <HiOutlineLogout size={20} />
          <span className="ms-2">Logout</span>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default SideMenu;
