
export interface CartItem{
    productId : string,
    quantity : number
    // _id : false
}

export interface ICart {
    userId : string
    items : CartItem[]
}