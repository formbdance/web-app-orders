import axios from "axios";

const api_url = 'http://192.168.0.2:5000';

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

// ОРДЕРА



// получение ордеров
export async function getOrders() {
    const res = await axios.get(`${api_url}/orders`)
    if (res.status !== 200) {
        throw new Error('Ошибка при получении ордеров')
    }
    
    return res.data
}

// удаление ордера
export async function deleteOrder(options) {
    const res = await axios.delete(`${api_url}/orders/${options.data._id}`)
    if (res.status !== 204) {
        throw new Error('Ошибка при удалении ордера')
    }
    
    return res.data
}


// сохранение ордера
export async function saveOrder(options) {
    console.log(options)
    const res = await axios.post(`${api_url}/orders`, options.data, 
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
// изменение
export async function editOrder(options) {
    const res = await axios.put(`${api_url}/orders/${options.data._id}`, options.data, 
    {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    },
    )
    if (res.status !== 200) {
        throw new Error('Ошибка при редактировании продукта!')
    }
    return res.data
}
