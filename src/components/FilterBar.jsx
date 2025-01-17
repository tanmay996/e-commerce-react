import React, { useState } from 'react'
import Select from 'react-select';
const FilterBar = ({ onFilterChange }) => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const categoryOptions = [
        { value: '', label: 'All Categories' },
        { value: "beauty", label: "Beauty" },
        { value: "fragrances", label: "Fragrances" },
        { value: "furniture", label: "Furniture" },
        { value: "groceries", label: "Groceries" }
    ];
    const priceRangeOptions = [
        { value: '', label: 'All Price Ranges' },
        { value: 'asc', label: 'Price: Low to High' },
        { value: 'desc', label: 'Price: High to Low' },
      ];
      
    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption);
        onFilterChange({
            category: selectedOption ? selectedOption.value : '',
            priceRange: selectedPriceRange ? selectedPriceRange.value : ''
        });
    };

    const handlePriceRangeChange = (selectedOption) => {
        setSelectedPriceRange(selectedOption);
        onFilterChange({
            category: selectedCategory ? selectedCategory.value : '',
            priceRange: selectedOption ? selectedOption.value : ''
        });
    };
    return (
        <div className="flex gap-4 p-4 rounded-md shadow-md mb-6">
            {/* Category Filter Dropdown */}
            <div className="flex flex-col w-1/3">
                <span className="font-semibold text-gray-700 mb-2">Category</span>
                <Select
                    options={categoryOptions}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    placeholder="Select Category"
                />
            </div>

            {/* Price Range Filter Dropdown */}
            <div className="flex flex-col w-1/3">
                <span className="font-semibold text-gray-700 mb-2">Price Range</span>
                <Select
                    options={priceRangeOptions}
                    value={selectedPriceRange}
                    onChange={handlePriceRangeChange}
                    placeholder="Select Price Range"
                />
            </div>
        </div>
    );
}

export default FilterBar