import React from 'react'

export default ({rating}) => {

    let starArray = [0,0,0,0,0].map((star,i) => {
        return i < rating ? 1 : 0;
    })

    return (
        <div>
            {
                starArray.map((star,i) => {
                    return star ? 
                        <svg
                            key={i} 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            fill="white"
                            height="20" 
                            viewBox="0 0 24 24">
                                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                        </svg> : null
                })
            }
        </div>
    )
}