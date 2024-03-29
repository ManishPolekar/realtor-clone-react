import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { db } from '../firebase';
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

import { FaShareSquare, FaMapMarkerAlt, FaBed, FaParking, FaChair } from "react-icons/fa";
import { MdBathroom } from "react-icons/md";
import { getAuth } from "firebase/auth";
import Contact from '../components/Contact';
//import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';


function Listing() {
    const auth = getAuth();
    const params = useParams()
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);
    const [contactLandlord , setContactLandlord] = useState(false);


    useEffect(() => {
        async function fetchListing() {
            const docRef = doc(db, "listings",params.listingId )
            const docSnap = await  getDoc(docRef)

            if (docSnap.exists()) {
                setListing(docSnap.data())
                setLoading(false);
            }
        }
        fetchListing();

    }, [params.listingId]);
    if (loading) {
        return <Spinner/>;
        
    }
    return ( 
    <main>
        <Swiper modules={[Navigation, Pagination, EffectFade, Autoplay]} 
         slidesPerView={1}
         navigation 
         pagination={{ type: "progressbar" }}
         autoplay={{ delay: 3000 }} effect="fade"
        >
            {listing.imgUrls.map((url, index) => (
                <SwiperSlide key={index}>
                <div
                    className="relative w-full overflow-hidden h-[300px]"
                    style={{ background: `url(${listing.imgUrls[index]}) center no-repeat`,
                    backgroundSize: "cover"}}>
                </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-gray-400 rounded -full w-12 h-12 flex justify-center items-center" onClick={() => {
        navigator.clipboard.writeText(window.location.href) 
        setShareLinkCopied(true) 
        setTimeout(() => {
            setShareLinkCopied(false)
        }, 2000);
      }}>
        <FaShareSquare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && ( <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">Link Copied</p> )}
      
      <div className= "m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className=" w-full ">
            <p className="text-2xl font-bold mb-3 text-blue-900">
                {listing.name} - ${" "} {listing.offer ? listing.discountedPrice.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : listing.regularPrice.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
                {listing.type === "rent" ? "/ month" : ""}
            </p>
            <p className="flex items-center mt-6 mb-3 font-semibold">
                <FaMapMarkerAlt className="text-green-700 mr-1" />
                {listing.address}
            </p>
            <div className="flex justify-start items-center space-x-4 w-[75%]">
                <p className=" bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">{listing.type === "rent" ? "Rent" : "Sale"}</p>
                {listing.offer && (
                    <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                    ${+listing.regularPrice - +listing.discountedPrice} discount</p>
                )}
            </div>
            <p className="mt-3 mb-3">
                <span className="font-semibold"> Description:- </span>
                {listing.description}
            </p>
            <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
                <li className="flex items-center whitespace-nowrap">
                    <FaBed className="text-lg mr-1" />
                    {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
    
                </li>

                <li className="flex items-center whitespace-nowrap">
                    <MdBathroom  className="text-lg mr-1" />
                    {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Baths"}
                </li>
                <li className="flex items-center whitespace-nowrap">
                    <FaParking  className="text-lg mr-1" />
                    {listing.parking  ? "Parking spot" : "No Parking"}
                </li>
                <li className="flex items-center whitespace-nowrap">
                    <FaChair  className="text-lg mr-1" />
                    {listing.furnished  ? "Furnished" : "Not Furnished"}
                </li>
            </ul>
            {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
                <div className="mt-6">
                   <button onClick={() => setContactLandlord(true) } className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out">
                       Contact Land
                   </button>
                </div>
            )}
            {contactLandlord && (
                <Contact userRef = {listing.userRef} listing={listing}/>
            )}
        </div>
        <div className="bg-blue-500 w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2">
        </div>
      </div>
    </main>    
  
)   
}

export default Listing