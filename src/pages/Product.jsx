import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { categories } from "../others/constants/sampleCategories";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Product() {
    const [productId, setProductId] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate(); // <-- here

    useEffect(() => {
        const newId = uuidv4().split("-")[0].toUpperCase();
        setProductId(newId);
    }, []);

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            productId,
        };

        try {
            const response = await axios.post(
                "http://localhost:5000/products",
                payload
            );
            console.log("Product created:", response.data);

            // Reset form and generate new ID 
            reset();
            const newId = uuidv4().split("-")[0].toUpperCase();
            setProductId(newId);

            navigate("/products/list"); // redirect
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    const subCategories = selectedCategory ? categories[selectedCategory] : [];

    return (
        <div className="pt-[100px] min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Create Product</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded p-6 max-w-md">
                <div className="mb-4">
                    <label className="block font-semibold">Product ID</label>
                    <input
                        type="text"
                        value={productId}
                        readOnly
                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Category</label>
                    <select
                        {...register("category")}
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        defaultValue="">
                        <option value="" disabled>
                            Select a category
                        </option>
                        {Object.keys(categories).map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Subcategory</label>
                    <select
                        {...register("subcategory")}
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                        defaultValue="">
                        <option value="" disabled>
                            Select a subcategory
                        </option>
                        {subCategories.map((sub) => (
                            <option key={sub} value={sub}>
                                {sub}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Product Name</label>
                    <input
                        {...register("name")}
                        placeholder="Enter product name"
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Create Product
                </button>
            </form>
        </div>
    );
}

export default Product;
