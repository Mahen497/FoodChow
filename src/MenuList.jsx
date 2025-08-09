import React, { useEffect, useState } from "react";

function MenuList() {
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    fetch("https://www.foodchow.com/api/FoodChowWD/GetRestaurantMenuWDWidget_multi?ShopId=3161&locale_id=null")
      .then((res) => res.json())
      .then((data) => {
        console.log("Full API response:", data);
        console.log("typeof data.data:", typeof data.data);

        let menuArray = data.data;

        // Step 1: Parse string if needed
        if (typeof menuArray === "string") {
          try {
            menuArray = JSON.parse(menuArray);
          } catch (err) {
            console.error("❌ JSON parse error:", err);
            return;
          }
        }

        // Step 2: Convert object-of-arrays to single array
        if (!Array.isArray(menuArray)) {
          menuArray = Object.values(menuArray).flat();
        }

        // console.log("✅ Final menuArray:", menuArray);
        
        setMenuData(menuArray);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(menuData)

  if (!menuData) {
    return <p>Loading menu...</p>;
  }

  return (
    <div>
      {
        menuData.map((category)=> {

          const itemCount = category.ItemListWidget?.length || 0; 

          return(
            <div key={category.CategryId}>
              <h2>
                {category.CategryName}  ({itemCount})
              </h2>

              <ul>
                {
                  category.ItemListWidget && category.ItemListWidget.map((item)=>(
                    <li key={item.ItemId}>
                      {item.ItemName} - ₹{item.Price || "N/A"}
                    </li>
                    
                  ))
                }
              </ul>
            </div>
          );

        })
      }
    </div>
  );
}

export default MenuList;
