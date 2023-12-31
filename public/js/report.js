const axiosReportInstance = axios.create({
    baseURL : 'http://51.20.141.54:4000/report',
    headers : {
        'auth-token' : localStorage.getItem('token')
    }
})

window.addEventListener('load' , ()=>{
    document.getElementById('date').value = new Date().toISOString().split('T')[0]
})





document.getElementById('expense-display').addEventListener('change', (e)=>{
    console.log(e.target.value)
    if(e.target.value == "daily"){
        document.getElementById('daily-form').classList.remove('hide')
        document.getElementById('monthly-form').classList.add('hide')
        document.getElementById('yearly-form').classList.add('hide')
    }
    else if(e.target.value == "monthly"){
        document.getElementById('monthly-form').classList.remove('hide')
        document.getElementById('daily-form').classList.add('hide')
        document.getElementById('yearly-form').classList.add('hide')
    }
    else if(e.target.value == "yearly"){
        document.getElementById('monthly-form').classList.add('hide')
        document.getElementById('daily-form').classList.add('hide')
        document.getElementById('yearly-form').classList.remove('hide')
    }else{
        
        document.getElementById('monthly-form').classList.add('hide')
        document.getElementById('daily-form').classList.add('hide')
        document.getElementById('yearly-form').classList.add('hide')
    }
})

document.getElementById('daily-form').addEventListener('submit' , async(e)=>{
    e.preventDefault()
    console.log(e.target.date.value)
    const date = e.target.date.value
    try{

        const res = await axiosReportInstance.post('/getdate' , {date} )
        console.log(res)
        document.getElementById('daily').classList.remove('hide')
        document.getElementById('monthly').classList.add('hide')
        document.getElementById('yearly').classList.add('hide')
        document.getElementById('weekly').classList.add('hide')


        const tbody = document.querySelector('#daily table tbody')
        console.log(tbody)
        let total =0
        tbody.innerHTML = ``
        document.querySelector('#daily h3 span').textContent = date
        res.data.forEach(elem => {
            console.log(elem)
            const tr = document.createElement('tr')
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')

            td1.textContent = elem.description
            td2.textContent = elem.expense

            total = total + +elem.expense
            tr.appendChild(td1)
            tr.appendChild(td2)

            tbody.appendChild(tr)

        })

        document.getElementById('daily-total').textContent = total
    }catch(e){
        console.log(e)
    }
})



document.getElementById('yearly-form').addEventListener('submit' , async(e)=>{
    e.preventDefault()
    console.log(e.target['year-picker'].value)
    const year = e.target['year-picker'].value
    try{

        const res = await axiosReportInstance.post('/getYearly' , {year} )
        console.log(res)
        document.getElementById('daily').classList.add('hide')
        document.getElementById('monthly').classList.add('hide')
        document.getElementById('yearly').classList.remove('hide')
        document.getElementById('weekly').classList.add('hide')


        const tbody = document.querySelector('#yearly table tbody')
        console.log(tbody)
        let total =0
        tbody.innerHTML = ``
        document.querySelector('#yearly h3 span').textContent = year
        res.data.forEach(elem => {
            console.log(elem)
            const tr = document.createElement('tr')
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')

            td1.textContent = elem.month
            td2.textContent = elem.totalAmount

            total = total + +elem.totalAmount
            tr.appendChild(td1)
            tr.appendChild(td2)

            tbody.appendChild(tr)

        })

        document.getElementById('yearly-total').textContent = total
    }catch(e){
        console.log(e)
    }
})


document.getElementById('yearly-form').addEventListener('submit' , async(e)=>{
    e.preventDefault()
    console.log(e.target['year-picker'].value)
    const year = e.target['year-picker'].value
    try{

        const res = await axiosReportInstance.post('/getYearly' , {year} )
        console.log(res)
        document.getElementById('daily').classList.add('hide')
        document.getElementById('monthly').classList.add('hide')
        document.getElementById('yearly').classList.remove('hide')
        document.getElementById('weekly').classList.add('hide')


        const tbody = document.querySelector('#yearly table tbody')
        console.log(tbody)
        let total =0
        tbody.innerHTML = ``
        document.querySelector('#yearly h3 span').textContent = year
        res.data.forEach(elem => {
            console.log(elem)
            const tr = document.createElement('tr')
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')

            td1.textContent = elem.month
            td2.textContent = elem.totalAmount

            total = total + +elem.totalAmount
            tr.appendChild(td1)
            tr.appendChild(td2)

            tbody.appendChild(tr)

        })

        document.getElementById('yearly-total').textContent = total
    }catch(e){
        console.log(e)
    }
})