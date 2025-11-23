import { useEffect, useState } from 'react';
import './styles.css';
import ProductCard from './ProductCard.js';
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const PAGE_SIZE = 10;

const Pagination = () => {
   const [data, setData] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await fetch('https://dummyjson.com/products?limit=200');
            const result = await res.json();
            setData(result?.products || []);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   // Pagination calculations
   const totalPages = Math.ceil(data.length / PAGE_SIZE);
   const lastIndex = currentPage * PAGE_SIZE;
   const firstIndex = lastIndex - PAGE_SIZE;
   const currentItems = data.slice(firstIndex, lastIndex);

   const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
   const handlePrevious = () => setCurrentPage((p) => Math.max(p - 1, 1));

   // Loading state
   if (loading) return <div>No Products Found</div>;

   // No products state
   if (!loading && data.length === 0) return <h5>No Products Found</h5>;

   return (
      <div>
         {/* Pagination Controls */}
         <div className="pagination-controls">
            <button
               id="previous"
               onClick={handlePrevious}
               disabled={currentPage === 1}
               aria-label="Previous page"
            >
               <FiChevronsLeft />
            </button>

            {[...Array(totalPages)].map((_, index) => (
               <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                
               >
                  {index + 1}
               </button>
            ))}

            <button
               id="next"
               onClick={handleNext}
               disabled={currentPage === totalPages}
               aria-label="Next page"
            >
               <FiChevronsRight />
            </button>
         </div>

         {/* Product Cards */}
         <div className="product-list">
            {currentItems.map((item) => (
               <div className="wrap" key={item.id}>
                  <ProductCard image={item.images} title={item.title} />
               </div>
            ))}
         </div>
      </div>
   );
};

export default Pagination;
