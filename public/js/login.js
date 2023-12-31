document.getElementById('login').addEventListener('submit' , loginUser)

const axiosInstance = axios.create({
    baseURL : "http://51.20.141.54:4000/user"
})


async function loginUser(e){
    e.preventDefault()
    
    const data = {
        email : e.target.email.value,
        password : e.target.password.value
    }
    console.log(data)

    try{
        const result = await axiosInstance.post('/login' , data)
        console.log(result)
        if(result.data.success){
            alert("login succesfully")
            localStorage.setItem('token' , result.data.token)
            localStorage.setItem('isPremiumUser' , result.data.isPremiumUser)
            window.location ="/home"
        }
    }catch(e){
        console.log(e)
        alert(e.response.data.msg)
    }

}