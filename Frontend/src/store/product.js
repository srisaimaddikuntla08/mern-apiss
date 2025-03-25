import { create } from "zustand"

export const useProductStore = create((set) => ({

    products: [],
    setProducts: (products) => set({ products }),
    handleCreateProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { sucess: false, message: "please fill all fields" }
        }

        const res = await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)

        })

        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }))
        return { sucess: true, message: "product created sucessfully" }
    },

    fetchProducts: async () => {
        const res = await fetch("/api/products")
        const data = await res.json();
        set({ products: data.data })
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
            method: "DELETE"
        });

        const data = await res.json();
        if (!res.ok) return { success: false, message: data.message };

        set(state => ({
            products: state.products.filter(product => product._id !== pid)
        }));

        return { success: true, message: data.message };
    },

    updateProduct: async (pid, updatedProduct) => {

        const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(updatedProduct)
        })


        const data = await res.json();
        if (res.status !== 200) return { sucess: false, message: data.message }
        set((state) => {
            console.log("before: ",state)
            const stateAfter = {
                products: state.products.map((product) => (product._id === pid ? data.data : product))
            }
            console.log("after: ",stateAfter)
            return stateAfter;
        })
    }

}))

