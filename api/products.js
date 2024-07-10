
export const getProducts = () => {
   return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                products: [{
                    id:1,
                    name:'IPhone',
                    price:1000,

                }]
            })
        },2000)
    })
}


export const getProductDetail = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                product: {
                    id: id,
                    name: `Product ${id}`,
                    price:Math.floor(Math.random()*1000),
                }
            })
        },2000)
    })
}