  "use client"

import React from 'react'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Page () {
const params = useParams()
const slug = params.merken_slug ?? 'Decoratie'
const [brands, setBrands] = useState([]);

useEffect(() => {const fetchMerken = async () => {
    try {
      const response = await fetch(`http://localhost:1337/api/brands?filters[brand_category][category_slug][$eq]=${slug}&populate=*`)

      const data = await response.json();
      if (data && data.data) {
        setBrands(data.data); // Guardamos todas las marcas
        console.log(data.data);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };
  fetchMerken();
}, []);



  return (
    <div>
     
      <ul>
        {brands.map((brand) => (
          <li key={brand.id}>{brand.brand_name}</li>
        ))}
      </ul>
    </div>
  )
}
