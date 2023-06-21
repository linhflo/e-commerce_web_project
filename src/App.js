import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Search from "./pages/Search";
import Success from "./pages/Success";
import Footer from "./shared/components/Layout/Footer";
import Header from "./shared/components/Layout/Header";
import Menu from "./shared/components/Layout/Menu";
import Sidebar from "./shared/components/Layout/Sidebar";
import Slider from "./shared/components/Layout/Slider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCategories } from "./services/Api";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
const App = () => {
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data.data.docs));
  }, []);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header />

            <div id="body">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <Menu categories={categories} />
                  </div>
                </div>
                <div className="row">
                  <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                    <Slider />

                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/Category-:id" element={<Category />} />
                      <Route
                        path="/ProductDetails-:id"
                        element={<ProductDetails />}
                      />
                      <Route path="/Search" element={<Search />} />
                      <Route path="/Cart" element={<Cart />} />
                      <Route path="/Success" element={<Success />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                  <Sidebar />
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    </>
  );
};
export default App;
