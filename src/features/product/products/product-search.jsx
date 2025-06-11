"use client";
import { Input } from "@/components/ui/input";
import { useSelector, useDispatch } from "react-redux";
import {
  searchProducts,
  setFilteredProducts,
} from "@/store/slices/productsSlice";
import { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";

export default function ProductSearch() {
  const { searchQuery, products } = useSelector((state) => state.products);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(searchQuery);
  const suggestionRef = useRef(null);
  const dispatch = useDispatch();

  const fuse = useRef(null);

  useEffect(() => {
    if (products.length > 0) {
      fuse.current = new Fuse(products, {
        keys: ["brandName", "modelName"],
        threshold: 0.4,
        distance: 100,
        includeScore: true,
      });
    }
  }, [products]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setInputValue(query);

    if (query.trim() && fuse.current) {
      const results = fuse.current.search(query).slice(0, 5);
      setSuggestions(results.map((result) => result.item));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    dispatch(searchProducts(query));
  };

  const selectSuggestion = (suggestion) => {
    dispatch({
      type: "products/exactProductSearch",
      payload: suggestion.id,
    });

    const selectedQuery = `${suggestion.brandName} ${suggestion.modelName}`;
    setInputValue(selectedQuery);

    setShowSuggestions(false);
  };

  return (
    <div className="flex justify-center min-w-25 relative">
      <div className="w-full">
        <Input
          className=""
          placeholder="Search by brand or model..."
          onChange={handleSearch}
          value={inputValue}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        />

        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionRef}
            className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto"
          >
            <ul className="py-1">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => selectSuggestion(item)}
                >
                  <span className="font-medium">{item.brandName}</span>{" "}
                  {item.modelName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
