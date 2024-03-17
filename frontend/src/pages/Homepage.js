import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";
import img1 from "../Images/drink.png";
import img2 from "../Images/biryani.png";
import img3 from "../Images/noodles.png";
import img4 from "../Images/chicken.png"
const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("drinks");
  const categories = [
    {
      name: "drinks",
      image: img1,
    },
    {
      name: "rice",
      image: img2,
    },
    {
      name: "noodles",
      image: img3,
    },
    {
      name: "chicken",
      image: img4
    }
  ];
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, [dispatch]);
  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selectedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelectedCategory(category.name)}>
            <h4>{category.name}</h4>
            <img
              src={category.image}
              alt={category.name}
              height="40px"
              width="60"
            />
          </div>
        ))}
      </div>
      <Row>
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList key={item.id} item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;
