import React from 'react'
import './starRating.css'

export default ({setRating,rating}) => {

    return (
        <div className="starRatingWrapper">
            { [1,2,3,4,5].map((num) => (
                <div 
                    key={num}
                    className="starWrapper"
                    onClick={() => {setRating(num)}}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        fill={rating >= num ? "yellow" : "white"}
                        height="24" 
                        viewBox="0 0 24 24">
                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                    </svg>
                </div>
            ))}
        </div>
    )

}