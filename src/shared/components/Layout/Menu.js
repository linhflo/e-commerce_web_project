import { Link } from "react-router-dom";

const Menu = ({ categories }) => {
  return (
    <>
      <nav>
        <div id="menu" className="collapse navbar-collapse">
          <ul>
           {categories.map((category,index) => <li className="menu-item"><Link to={`/Category-${category._id}`}>{category.name}</Link></li>)}
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Menu;
