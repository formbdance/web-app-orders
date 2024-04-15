import axios from "axios";

const api_url = 'http://127.0.0.1:5000';

export async function getProducts() {
    const res = await axios.get(`${api_url}/products`)
    if (res.status !== 200) {
        throw new Error('Ошибка при получении продуктов')
    }
    
    return res.data
}

export async function saveProduct(options) {
    const res = await axios.post(`${api_url}/products`, options.data, 
    {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Access-Control-Allow-Origin": "*"
        }
    },
    )
    if (res.status !== 200) {
        throw new Error('Ошибка при сохранении продукта!')
    }
    
    return res.data
}