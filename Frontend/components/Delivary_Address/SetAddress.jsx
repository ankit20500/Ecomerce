import React, { useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import Person2Icon from '@mui/icons-material/Person2';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import FoundationIcon from '@mui/icons-material/Foundation';
import PinIcon from '@mui/icons-material/Pin';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {useNavigate} from 'react-router-dom'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SetAddress() {
  const navigate=useNavigate()
  const [country, setCountry]=useState('')
  const [selectedState,setSelectedState]=useState('')
  const [state,setState]=useState([])
  const [selectedCity, setSelectedCity]=useState('')
  const [city, setCity]=useState([])
  const [name, setName]=useState('')
  const [number, setNumber]=useState('')
  const [address, setAddress]=useState('')
  const [pinCode, setPinCode]=useState('')

  const tostfn = {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark"
};

  useEffect(()=>{
    const getLocalStorageCartData=localStorage.getItem("Cart_Items");
    if(!getLocalStorageCartData){
      toast.error("please Select the Items in the cart first",tostfn)
      navigate("/cart")
    }
  },[])

  const handleCountryChange=(e)=>{
    const selectedCountry=e.target.value;
    setCountry(selectedCountry);
    const countryname=Country.getAllCountries().find(country=>country.name===selectedCountry)
    if(countryname){
    const stateOfCountry=State.getStatesOfCountry(countryname.isoCode);
    setState(stateOfCountry)
    setCity([])
    setSelectedCity('')
    setSelectedState('')
    }else{
      setState([])
      setCity([])
      setSelectedState('')
      setSelectedCity('')
    }
  }

  const handleStateChange=(e)=>{
    const selectState=e.target.value;
    setSelectedState(selectState)
    const stateName=state.find(state=>state.name === selectState)
    if(stateName){
      const distOfState=City.getCitiesOfState(stateName.countryCode , stateName.isoCode);
      setCity(distOfState);
      setSelectedCity('')
    }else{
      setCity([])
      setSelectedCity('')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const obj={name,address,number,country,selectedState,selectedCity,pinCode};
    if(name!='' && address!='' && number!='' && country!='' && selectedState!='' && selectedCity!='' && pinCode!=''){
      localStorage.setItem("address",JSON.stringify(obj))
      navigate("/shipping-details")
    }else{
      if(name=='')toast.error("Please enter your name",tostfn)
      else if(number=='')toast.error("Please enter your number",tostfn)
      else if(address=='')toast.error("Please enter your address",tostfn)
      else if(country=='')toast.error("Please select your country",tostfn)
      else if(selectedState=='')toast.error("Please select your state",tostfn)
      else if(selectedCity=='')toast.error("Please select your city",tostfn)
      else if(pinCode=='')toast.error("Please enter your pincode",tostfn)
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center items-center">
      <div className="max-w-screen-lg mx-auto">
        <div>
          <div className="flex justify-center">
            <p className="shadow-[0_0_15px_rgba(15,15,15,0.26)] font-[cursive] w-[15rem] border border-b-black text-lg text-gray-800 text-center mb-5 h-[2rem]">
              Shipping Address
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded shadow-lg px-4 md:p-8 mb-6 text-center flex align-middle">
            <div className="grid gap-4 gap-y-5 w-full text-sm grid-cols-1 md:grid-cols-2">
              <div className="flex items-center w-full">
                <Person2Icon style={{ width: '2rem', height: '2rem', marginRight: '0.5rem' }} />
                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  className="border text-center border-gray-700 w-full h-[2rem] font-[cursive]"
                />
              </div>

              <div className="flex items-center w-full">
                <PhoneIcon style={{ width: '2rem', height: '2rem', marginRight: '0.5rem' }} />
                <input
                  type="number"
                  name="phone"
                  placeholder="Enter phone number"
                  value={number}
                  onChange={(e)=>setNumber(e.target.value)}
                  className="border border-gray-900 text-center w-full h-[2rem] font-[cursive]"
                />
              </div>

              <div className="flex items-center w-full">
                <HomeIcon style={{ width: '2rem', height: '2rem', marginRight: '0.5rem' }} />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={address}
                  onChange={(e)=>setAddress(e.target.value)}
                  className="border border-gray-900 text-center w-full h-[2rem] font-[cursive]"
                />
              </div>

              <div className="flex items-center w-full">
                <LocationCityIcon style={{ width: '2rem', height: '2rem', marginRight: '0.5rem' }} />
                <select
                  type="text"
                  name="city"
                  placeholder="City"
                  value={selectedCity}
                  onChange={(e)=>setSelectedCity(e.target.value)}
                  className="border border-gray-900 text-center w-full h-[2rem] font-[cursive]">
                    <option value="">Select City</option>
                    {city.map(city=>(
                      <option key={city.isoCode} value={city.name}>{city.name}</option>
                    ))}
                  </select>
              </div>

              <div className="flex items-center w-full">
                <PublicIcon style={{ width: '2rem', height: '2rem', marginRight: '0.5rem' }} />
                <select
                  name="country"
                  value={country}
                  onChange={handleCountryChange}
                  className="border border-gray-900 text-center w-full h-[2rem] font-[cursive]">
                  <option value="">Select Country</option>
                  {Country.getAllCountries().map((country) => (
                    <option key={country.isoCode} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center w-full">
                <FoundationIcon style={{ width: '2rem', height: '2rem', marginRight: '0.5rem' }} />
                <select
                  name="state"
                  value={selectedState}
                  onChange={handleStateChange}
                  className="border border-gray-900 text-center w-full h-[2rem] font-[cursive]">
                  <option value="">Select State</option>
                  {state.map((state)=>(
                    <option key={state.isoCode} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center w-full">
                <PinIcon style={{ width: '2rem', height: '2rem', marginRight: '0.5rem' }} />
                <input
                  type="number"
                  name="pincode"
                  placeholder="PinCode"
                  value={pinCode}
                  onChange={(e)=>setPinCode(e.target.value)}
                  className="border border-gray-900 text-center w-full h-[2rem] font-[cursive]"
                />
              </div>

              <div className="md:col-span-2 text-center">
                <div className="inline-flex items-end">
                  <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-[cursive] font-bold py-2 px-4 rounded">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SetAddress;
