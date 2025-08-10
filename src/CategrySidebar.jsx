import { useState } from 'react';
import Card from 'react-bootstrap/Card';


function CategrySidebar({ menuData }) {

  const [activeId, setActiveId] = useState(null);

  const handleClick = (id, isDeal=false) => {

    setActiveId(id);
    console.log("isDeal", isDeal)

    const sectionId = isDeal ? id : `category-${id}`
    const section = document.getElementById(sectionId);  
    
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (!menuData) {
    return <p>Loading menu...</p>;
  }

  return (

    <Card>
      <h3 style={{ fontSize: '18px', color: 'var(--dynamic-color)' }} className="p-3 border-bottom mb-0 fw-700">
        CATEGORIES
      </h3>

      <div
        className={`catg-li border-bottom ${activeId == "deal" ? "active-menu" : ""}`}
        onClick={()=> handleClick("deal", true)}
      >
        <p>Deal</p>
      </div>
      {
        menuData.map((category) => {
          
          if (category.CategryName) {
            return (
              <div
                className={`catg-li border-bottom ${activeId === category.CategryId ? "active-menu" : ""}`}
                key={category.CategryId}
                onClick={() => handleClick(category.CategryId)}
              >
                <p>
                  {category.CategryName}
                </p>
              </div>
            )
          }

          
        })
      }
    </Card>

  );
}

export default CategrySidebar;