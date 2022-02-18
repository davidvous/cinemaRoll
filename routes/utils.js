const csrf = require('csurf');
const csurfProtection = csrf({cookie:true})

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const removeTimeFromDates =  (arrayOfReviews) =>{
    
    arrayOfReviews.forEach(review => {
        let dateWithYear = review.createdAt
        let dateArray = dateWithYear.toString().split(" ")
        let monthDayYear = dateArray.slice(0,4)  
        monthDayYear[2] = monthDayYear[2]+","
        let newDateString = monthDayYear.join(" ")
        review.createdAt = newDateString
        
    });
    return arrayOfReviews
}
const removeTimeFromLoggedInUserReview = (dateObj)=>{
    let dateArray = dateObj.toString().split(" ")
    let monthDayYear = dateArray.slice(0,4)
    monthDayYear[2] = monthDayYear[2]+","
    let newDateString = monthDayYear.join(" ")
    return newDateString
}
module.exports = {csurfProtection, asyncHandler, removeTimeFromDates, removeTimeFromLoggedInUserReview};
