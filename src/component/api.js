export async function loginUser(creds) {
    const res = await fetch("https://api6.staging.iguru.co.ke/api/baregister",
        { method: "POST", body:creds }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

export async function surveyForm(test){
  const res = await fetch("https://api6.staging.iguru.co.ke/api/oryx", {
    method: "POST",  headers: {
        'Content-Type': 'application/json', // Adjust the content type if necessary
      }, body:test
  })
  const data = await res.json()
  console.log(data)
  if(!res.ok){
    throw{
        message: data.message,
        statusText:  res.statusText,
        status: res.status
    }
  }
 return data

}

export async function sleep (ms) {
 return new Promise((resolve) => {
    setTimeout(()=>{
     resolve()
    },ms)
 })
}


export async function getUserData (){
    await sleep(1000)
    const storeOne = localStorage.getItem("Auth")
    const storeTwo = JSON.parse(storeOne)
    console.log(storeTwo)
    return storeTwo.data
}