/* eslint-disable react-refresh/only-export-components */
import React from "react";
import {  useForm} from "react-hook-form"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'




const SurveyForm = () =>{

  // my state
  const [valueCheck, setvalueCheck] = React.useState({
    number_Two: "",
    number_six: "",
    number_twelve: "",
    number_fourteen: ""
  })

  // navigation state code

  const form =  useForm({
    defaultValues: async() =>{
      return{
        respondent_name: '',
        respondent_gender: "",
        location: "",
        respondent_phone_number: "",
        respondent_wheeler: "",
        brand_category_1: "",
        brand_category_2: "",
        brand_category_2_a: "",
        brand_category_3: "",
        brand_category_2_b: "",
        brand_category_4: "",
        brand_category_5: "",
        brand_category_6: "",
        brand_category_7: "",
        brand_category_8: "",
        brand_category_9: "",
        distribution_9:"",
        distribution_10: "",
        area_of_service_11: "",
        area_of_service_12: "",
        area_of_service_13: "",
        media_consumption_14: "",
        media_consumption_15: "",
        media_consumption_16: "",
        media_consumption_17: "",


      }

    }
  })

  const {register, handleSubmit, reset,formState} = form;
  const { isSubmitSuccessful, isSubmitting} = formState;
  console.log({isSubmitSuccessful})

  const onSubmit = async (data) =>{

    // adding date
    const mydate = new Date ();
    const sendYear = mydate.getFullYear();
    const sendMonth = mydate.getMonth() + 1;
    const sendDates = mydate.getDate();
    const fullDate = [sendYear,sendMonth,sendDates].join('/');


    const storeOne = localStorage.getItem("Auth")
    const storeTwo = JSON.parse(storeOne)
    console.log(storeTwo)
    const ba_location = storeTwo.data.ba_location;
    const ba_name = storeTwo.data.ba_name;
    const ba_phone = storeTwo.data.ba_phone;

    console.log("submitted data:", data)
    const formdata = new FormData()

    for(const key in data){
      formdata.append(key, data[key])
    }


    // appending more data
    formdata.append("ba_location", ba_location)
    formdata.append("ba_name",ba_name)
    formdata.append("ba_phone",ba_phone)
    formdata.append("survey_date",fullDate)

   try{

    const res = await fetch("https://api6.staging.iguru.co.ke/api/oryx",{
      method: "POST",
      body: formdata
    })

   const response = await res.json()
   console.log(response)
   const MySwal = withReactContent(Swal)
   MySwal.fire({
   html: <i>Your data have been submitted successfully!</i>,
   icon: 'success'
 })

   }catch(err){
    console.log("Error is:", err)
    const MySwal = withReactContent(Swal)
    MySwal.fire({
    html: <i>Network error. Please check your internet connection and try again!</i>,
    icon: 'error'
  })
   }

   }



  //  handle display for non-user
  const handleNonUser = (e) =>{
    const numberTwo = e.target.value
    // const numberTwo = getValues("brand_category_2")
    console.log(numberTwo)
    setvalueCheck(prev => {
      return{
        ...prev,
        number_Two: numberTwo
      }
    })
  }

  const handleNumSix = (e) =>{
    const numberSix = e.target.value
    setvalueCheck(prev => {
      return{
        ...prev,
        number_six: numberSix
      }
    })
  }

  const handleNumTwelve = (e) =>{
    const numberTwelve = e.target.value
    setvalueCheck(prev => {
      return{
        ...prev,
        number_twelve: numberTwelve
      }
    })
  }

  const handleNumFourteen = (e) =>{
    const numberFourteen = e.target.value
    setvalueCheck(prev => {
      return{
        ...prev,
        number_fourteen: numberFourteen
      }
    })
  }

  console.log(valueCheck.number_Two)

   React.useEffect(() =>{
   if(isSubmitSuccessful){
    reset()
   }
   }, [isSubmitSuccessful, reset])

    return(
        <>
        <div className="card-panel card-relative">
        <form className="form" id="form" method="post" onSubmit={handleSubmit(onSubmit)}>
         <h4>Demographic</h4>
         <label htmlFor="respondent_name">1. Name of the respondent</label>
         <input
           className="input"
           type="text"
           name="respondent_name"
           id="respondent_name"
           placeholder="Enter name of the respondent"
           {...register("respondent_name")}
         />
         <label htmlFor="respondent_gender">2. Gender</label>
         <select name="respondent_gender" id="respondent_gender" className="select_els" {...register("respondent_gender")}>
          <option value="">Select your gender</option>
          <option  value="male">Male</option>
          <option  value="female">Female</option>
        </select>
        <label >3. Location of the respondent</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter the respondent location"
            {...register("location")}
          />
        <label htmlFor="respondent_phone_number">4. Contact Details</label>
        <input
          className="input"
          type="tel"
          name="respondent_phone_number"
          id="respondent_phone_number"
          placeholder="E.g 0767**"
          {...register("respondent_phone_number")}
        />
        <label htmlFor="respondent_wheeler">5. How many 3 wheeler or 2 wheeler per stand?</label>
        <input
          className="input"
          type="text"
          name="respondent_wheeler"
          id="respondent_wheeler"
          placeholder="Enter your respond"
          {...register("respondent_wheeler")}
        />
          <h4>Brand Category</h4>
          <label htmlFor="brand_category_1">1. What comes into your mind if you hear of the word ORYX?</label>
          <input
            className="input"
            type="text"
            name="brand_category_1"
            id="brand_category_1"
            placeholder="Enter your respond here"
            {...register("brand_category_1")}
          />

          <label htmlFor="brand_category_2">2. Have you ever used ORYX Lubricants?</label>
          <select name="brand_category_2" id="brand_category_2"  className="select_els select_parent" {...register("brand_category_2")} onChange={ (e) =>handleNonUser(e)}>
            <option value="">Select your answer</option>
            <option id="yes_user_item" value="yes">YES</option>
            <option id="no_user_item" value="no">NO</option>
          </select>

         {valueCheck.number_Two === "no" ?   <div id="non_user" className="mt-tops">
          <label htmlFor="brand_category_2_a">2a. If not, Why?  and  are you willing to use?</label>
          <input
            className="input authonticate_values"
            type="text"
            name="brand_category_2_a"
            id="brand_category_2_a"
            placeholder="Enter  your respond"
            {...register("brand_category_2_a")}
          />
          <label htmlFor="brand_category_3">3. To non-users, Which brand of lubricants are you using?</label
          >
          <input
            className="input authonticate_values"
            type="text"
            name="brand_category_3"
            id="brand_category_3"
            placeholder="Enter  your respond"
            {...register("brand_category_3")}
          />
        </div> : ""}

        {valueCheck.number_Two === "yes" ?  <div id="user_yes" className="mt-tops">
          <label htmlFor="brand_category_2_b">2b. If yes, Mention one product from ORYX that you normally use?</label>
          <input
            className="input authonticate_values"
            type="text"
            name="brand_category_2_b"
            id="brand_category_2_b"
            placeholder="Enter your respond"
            {...register("brand_category_2_b")}
          />
         </div> : "" }


          <label htmlFor="brand_category_4">4. What do you like from the brand you are currently using?</label>
          <input
            className="input"
            type="text"
            name="brand_category_4"
            id="brand_category_4"
            placeholder="Enter your respond"
            {...register("brand_category_4")}
          />
          <label htmlFor="brand_category_5">5. For how long have you be using the brand?</label>
          <input
            className="input"
            type="text"
            name="brand_category_5"
            id="brand_category_5"
            placeholder="E.g 2 years, 4 months"
            {...register("brand_category_5")}
          />
          <label  htmlFor="brand_category_6">6. How did you come to choosing the brand you are currently using?</label>
          <select name="brand_category_6" id="brand_category_6"  className="select_els select_parent"
          {...register("brand_category_6")}
          onChange={(e) => handleNumSix(e)}
          >
            <option value="">Select your answer</option>
            <option value="Recommended by a friend">Recommended by a friend</option>
            <option value="Found online search  ">Found online search</option>
            <option value="Saw an advert">Saw an advert</option>
            <option value="Social media">Social media</option>
            <option value="Visited a physical store">Visited a physical store</option>
            <option id="water_bottle" value="Other">Other</option>
          </select>

          {valueCheck.number_six === "Other" ?  <div className="mt-tops" id="specify_user">
            <label  htmlFor="brand_category_7">Please specify</label>
          <input
            className="input authonticate_values"
            type="text"
            name="brand_category_7"
            id="brand_category_7"
            placeholder="Enter your respond"
            {...register("brand_category_7")}
          />
          </div> : ""}


          <label  htmlFor="brand_category_8">7. What other names of the lubricants brands do you remember?</label>
          <input
            className="input"
            type="text"
            name="brand_category_8"
            id="brand_category_8"
            placeholder="Enter your respond"
            {...register("brand_category_8")}

          />
          <label  htmlFor="brand_category_9">8. How often do you change your oil on the 3wheeler or 2wheeler?</label>
          <input
            className="input"
            type="text"
            name="brand_category_9"
            id="brand_category_9"
            placeholder="E.g daily weekly yearly"
            {...register("brand_category_9")}
          />

          <h4>Distribution Awareness</h4>
          <label htmlFor="distribution_9">9. Where do you purchase your lubricants?</label>
          <input
            className="input"
            type="text"
            name="distribution_9"
            id="distribution_9"
            placeholder="Enter your respond"
            {...register("distribution_9")}
          />
          <label htmlFor="distribution_10">10. Do they provide services or just selling the product?</label>
          <select name="distribution_10" id="distribution_10"  className="select_els"
          {...register("distribution_10")}
          >
            <option value="">Select your answer </option>
            <option value="selling the product">Selling the product</option>
            <option value="provide the services">Provide the services</option>
          </select>

          <h4>Area Of Services</h4>
          <label htmlFor="area_of_service_11">11. Where do you service your Boda Boda or Bajaj?</label>
          <input
            className="input"
            type="text"
            name="area_of_service_11"
            id="area_of_service_11"
            placeholder="Enter your respond"
            {...register("area_of_service_11")}
          />
          <label htmlFor="area_of_service_12">12. The oil brand that you use, is it decided by you or the mechanic?</label>
          <select name="area_of_service_12" id="area_of_service_12"  className="select_els select_parent"
          {...register("area_of_service_12")}
          onChange={(e) => handleNumTwelve(e)}
          >
            <option value="">Select your answer </option>
            <option value="By me">By me</option>
            <option id="mechanic_item" value="By mechanic">By mechanic</option>
          </select>

         {valueCheck.number_twelve === "By mechanic" ?  <div className="mt-tops" id="mechanic_users">
          <label htmlFor="area_of_service_13">13. Does the mechanic sell the lubricants at his store?</label>
          <select name="area_of_service_13" id="area_of_service_13"  className="select_els authonticate_values"
          {...register("area_of_service_13")}
          >
            <option value="">Select your answer </option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
        </div> : "" }



         <h4>Media Consuption</h4>

          <label htmlFor="media_consumption_14">14. Have you ever heard of any lubricant radio or TV adverts?</label>
          <select name="media_consumption_14" id="media_consumption_14"  className="select_els select_parent"
          {...register("media_consumption_14")}
          onChange = {(e) => handleNumFourteen(e)}
          >
            <option value="">Select your answer</option>
            <option id="yes_advert" value="yes">YES</option>
            <option id="no_advert" value="no">NO</option>
          </select>

          {valueCheck.number_fourteen == "yes" ?  <div id="tv_adverts" className="mt-tops">
            <label htmlFor="media_consumption_15">
                15. In which Radio or TV station have you heard or seen the advert?
                </label>
            <input
              className="input authonticate_values"
              type="text"
              name="media_consumption_15"
              id="media_consumption_15"
              placeholder="Enter your respond"
              {...register("media_consumption_15")}
            />
            <label htmlFor="media_consumption_16">
                16. Can you recall the advert name or offer attached to the Adverts?
                </label>
            <input
              className="input authonticate_values"
              type="text"
              name="media_consumption_16"
              id="media_consumption_16"
              placeholder="Enter your respond"
              {...register("media_consumption_16")}
            />
            <label htmlFor="media_consumption_17">17. Which brand was the advert about?</label>
            <input
              className="input authonticate_values"
              type="text"
              name="media_consumption_17"
              id="media_consumption_17"
              placeholder="Enter your respond"
              {...register("media_consumption_17")}
            />
          </div> : "" }


          <button className="btn-large" id="hide_icons" disabled = {isSubmitting}>
            {isSubmitting ? <>submitting  <div className="preloader-wrapper icon-submit active" id="preloader_icon_three">
              <div className="spinner-layer spinner-green-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div></> : (<>submit  <i className="material-icons" id="buttonSubmit_icon">send</i></> )}

          </button>
        </form>

      </div>
        </>
    )
}

export default SurveyForm;