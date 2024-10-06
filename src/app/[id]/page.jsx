import React from 'react'
import Show from './Show'
export default async function Details(props) {
   
    const res = await fetch("https://api.imgflip.com/get_memes")
    const result = await res.json()

    let singleProduct = result.data.memes.filter((data) => data.id == props.params.id)

    singleProduct = singleProduct[0]


    return (
        <>
            <Show singleProduct={singleProduct} />
        </>

    )
}
