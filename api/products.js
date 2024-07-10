
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