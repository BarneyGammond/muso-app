import axios from 'axios'

export default axios.create({
    headers: {
        'Authorization': 'Basic OGQ1MmY4YmI1NTI5NDcwMzhiODQwNzdjYWQ2ZDE2ZTY6NGU0N2YyYWQ2ZTg3NGZhM2I3ODQ3Y2NhNzdhMWExMDg=',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})