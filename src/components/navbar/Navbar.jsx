

import "./navbar.css";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { CartContext } from "../../pages/cart/CartContext";
import { useState, useContext, useRef, useEffect } from "react";
import { CurrencyContext } from "../all_context/CurrencyContext";
import Select from "react-select";
import { useAuth } from "../AuthContext/AuthContext";

const Navbar = () => {
  const [shownav, setShownav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown menu
  const use_auth = useAuth()

  const { calculateTotalLength } = useContext(CartContext);
  const totalItems = calculateTotalLength();

  const { selectedCurrency, handleCurrencyChange, currencySymbols, currencyNames } = useContext(CurrencyContext);
  const handleCurrencySelect = (selectedOption) => {
    if (selectedOption) {
      handleCurrencyChange(selectedOption.value); // Update the currency based on user selection
    }
  };

  const sortedCurrencyOptions = Object.keys(currencySymbols).sort().map(currency => ({
    value: currency,
    label: `${currencySymbols[currency]} ${currencyNames[currency]} (${currency})`
  }));

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      <header className="navbar-component-container">
        <div className="">
          <div className="">
            <div className="wrapper">
              <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                <div style={{ fontSize: "30px" }} className="hamburgermenubar">
                  <i style={{ cursor: "pointer" }} className="fa-solid fa-bars" onClick={() => setShownav(true)}></i>
                </div>
                <div className="">
                  <Link to="/" className="" style={{ textDecoration: "none" }}>
                    <Logo />
                  </Link>
                </div>
                <div className={shownav ? "links-container-show" : "links-container"} onClick={() => setShownav(false)}>
                  <div className={shownav ? "links-wrapper-show" : "links-wrapper"} onClick={(e) => e.stopPropagation()}>
                    <div style={{ fontSize: "30px" }} className="cancelmenubar">
                      <i style={{ cursor: "pointer" }} className="fa-solid fa-xmark" onClick={() => setShownav(false)}></i>
                    </div>
                    <div>
                      <Link to="/" style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>Home</Link>
                    </div>
                    <div>
                      <a href="#" style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>Shop all</a>
                    </div>
                    <div>
                      <label htmlFor="currency" style={{ fontWeight: "bold", color: "white"}}>Currency: </label>
                      <Select
                        options={sortedCurrencyOptions}
                        onChange={handleCurrencySelect}
                        value={sortedCurrencyOptions.find(option => option.value === selectedCurrency)}
                      />
                    </div>
                    <div>
                      <a href="#" style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>contact</a>
                    </div>
                    <div>
                      <Link to="/policies/refund-policy" style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>Refund policy</Link>
                    </div>
                    <div>
                      <Link to="/policies/shipping-policy" style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>Shipping policy</Link>
                    </div>
                    <div>
                      <Link to="/policies/delivery-policy" style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>Delivery policy</Link>
                    </div>
                    <div>
                      <Link style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>Tracking</Link>
                    </div>
                    <div style={{display: "flex", gap: "15px"}}>
                      <a style={{ color: "white" }} href="https://www.instagram.com/beauty_bykiaraa/" target="_blank">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                      <a style={{ color: "white" }} href="https://www.tiktok.com/@beauty_bykiara" target="_blank">
                        <i className="fa-brands fa-x-twitter"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="d-flex float-end text-light">
                  <div className="dropdown" ref={dropdownRef}>
                    <button onClick={() => setDropdown(prev => !prev)} style={{ fontWeight: "bold" }} className="account-details-dropdown dropdown-toggle me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
                      <i className="fas fa-user-alt m-1 me-md-2"></i>
                      <p className="d-none d-md-block mb-0">{use_auth.user.is_user_logged ? `Hi, ${use_auth.user.user.firstname}` : "Account"}</p>
                    </button>
                    {dropdown && (
                      <div className="account-details-dropdown-list-black">
                        <ul className="account-details-dropdown-list" type="none">
                        {
                            use_auth.user.is_user_logged && use_auth.user.user.firstname &&  <div style={{backgroundColor: "purple", color: "white", margin: "10px", borderRadius: "5px", padding: "10px"}} className="d-block d-md-none">Hi, {use_auth.user.user.firstname}</div>
                              
                            
                          }
                          
                          {
                            !use_auth.user.is_user_logged && <span>
                              <li>
                            <Link to="/identification" className="me-1 nav-link d-flex align-items-center">Create account</Link>
                          </li>
                          <li>
                            <Link to="/login" className="me-1 nav-link d-flex align-items-center">Login</Link>
                          </li>
                            </span>
                            
                          }
                          <li>
                            <Link to={use_auth.user.is_user_logged ? "/user-account" : "/login"} className="me-1 nav-link d-flex align-items-center" style={{gap: "12px"}}> <i class="fa-regular fa-user " style={{fontSize: "20px"}}></i>My Account</Link>
                          </li>
                          <li>
                            <Link className="me-1 nav-link d-flex align-items-center" style={{gap: "12px"}}> <i class="fa-regular fa-heart" style={{fontSize: "20px"}}></i>Wishlist</Link>
                          </li>
                          <li>
                            <Link className="me-1 nav-link d-flex align-items-center" style={{gap: "12px"}}> <i class="fa-regular fa-message"style={{fontSize: "20px"}}></i> Live chat</Link>
                          </li>
                          {use_auth.user.is_user_logged && <span>
                            <hr />
                            <li style={{paddingTop: "0", display: "flex", justifyContent: "center"}}>
                              <button className="me-1 nav-link text-danger" onClick={()=> use_auth.logoutUser()}>Logout</button>
                            </li>
                              
                            </span>
                            
                          }
                          
                        </ul>
                      </div>
                    )}
                  </div>
                  <Link to="/cart" style={{ fontWeight: "bold" }} className="border rounded py-1 px-3 nav-link d-flex align-items-center">
                    <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                    <p className="d-none d-md-block mb-0">My cart</p>&nbsp;{totalItems}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;


































// import "./navbar.css"
// import Logo from "../Logo/Logo"
// import { Link } from "react-router-dom"
// import { CartContext } from "../../pages/cart/CartContext"
// import { useState, useContext } from "react"
// import { CurrencyContext } from "../all_context/CurrencyContext"
// import Select from "react-select"
// const Navbar = () => {
//   const [shownav, setShownav] = useState(false)
//   const [dropdown, setDropdown] = useState(false)

//   const { calculateTotalLength } = useContext(CartContext);
//   const totalItems = calculateTotalLength();


//     const { selectedCurrency, convertCurrency, handleCurrencyChange, currencySymbols, currencyNames } = useContext(CurrencyContext);
//     const handleCurrencySelect = (selectedOption) => {
//       if (selectedOption) {
//         handleCurrencyChange(selectedOption.value); // Update the currency based on user selection
//       }
//     };
//     const sortedCurrencyOptions = Object.keys(currencySymbols).sort().map(currency => ({
//       value: currency,
//       label: `${currencySymbols[currency]} ${currencyNames[currency]} (${currency})`
//     }));

//     return <div>
//         <header className="navbar-component-container">
 
//   <div className="">
//     <div className="">
//       <div className="wrapper">
      
//        <div style={{display: "flex", alignItems: "center", gap: "30px"}}>
//           <div style={{fontSize: "30px"}} className="hamburgermenubar"><i style={{cursor: "pointer"}} class="fa-solid fa-bars" onClick={()=> setShownav(true)}></i></div>
//         <div className="">
//             <Link to="/"className="" style={{textDecoration: "none"}}>
//               <Logo />
//             </Link>
//           </div>
//           <div className={shownav ? "links-container-show" : "links-container"} onClick={()=> setShownav(false)}>
//             <div className={shownav ? "links-wrapper-show" : "links-wrapper"} onClick={(e)=>e.stopPropagation()}>
//             <div style={{fontSize: "30px"}} className="cancelmenubar"><i style={{cursor: "pointer"}} class="fa-solid fa-xmark" onClick={()=> setShownav(false)}></i></div>
//               <div>
//                 <Link to="/" style={{fontWeight: "bold"}}>Home</Link>
//               </div>
//               <div>
//                 <a href="#" style={{fontWeight: "bold"}}>Shop all</a>
//               </div>
//               <div>
//                 <label htmlFor="currency" className="text-muted" style={{fontWeight: "bold"}}>Currency: </label>
//                 <Select
//                   options={sortedCurrencyOptions}
//                   onChange={handleCurrencySelect}
//                   value={sortedCurrencyOptions.find(option => option.value === selectedCurrency)}
//                 />
//               </div>
//               <div>
//                 <a href="#" style={{fontWeight: "bold"}}>contact</a>
//               </div>
//               <div>
//                 <Link to="/policies/refund-policy" style={{fontWeight: "bold"}}>Refund policy</Link>
//               </div>
//               <div>
//                 <Link to="/policies/shipping-policy"style={{fontWeight: "bold"}}>Shipping policy</Link>
//               </div>
//               <div>
//                 <Link to="/policies/delivery-policy"style={{fontWeight: "bold"}}>Delivery policy</Link>
//               </div>
//               <div>
//                 <Link style={{fontWeight: "bold"}}>Tracking</Link>
//               </div>
//               <div>
//                 <a style={{color: "white"}} href="https://www.instagram.com/beauty_bykiaraa/" target="_blank" >
//                   <i class="fa-brands fa-instagram"></i>
//                 </a>
//                 <a style={{color: "white"}} href="https://www.tiktok.com/@beauty_bykiara" target="_blank" >
//                   <i class="fa-brands fa-x-twitter"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//        </div>
        

        
//         <div className="">
//           <div className="d-flex float-end text-light">

//             {/* <Link to="/login"style={{fontWeight: "bold"}} className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-user-alt m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Sign in</p> </Link> */}
// <div class="dropdown">
//   {/* <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//     Dropdown button
//   </button> */}
//   <button onClick={()=> setDropdown(true)} style={{fontWeight: "bold"}} className="account-details-dropdown dropdown-toggle me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-user-alt m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Account</p> </button>
// {
//   dropdown &&
//     <div className="account-details-dropdown-list-black">
//       <ul class="account-details-dropdown-list" type="none">
//       <div style={{width: "100%", display: "flex", justifyContent: "right", paddingRight: "20px"}}> <span style={{cursor: "pointer", fontWeight: "500"}} onClick={()=> setDropdown(false)}>X</span> </div>
//         <li>
//           <Link to="/identification" className="me-1 nav-link d-flex align-items-center">Create account</Link>
//         </li>
//         <li>
//           <Link to="/login" className="me-1 nav-link d-flex align-items-center">Login</Link>
//         </li>
//         {/* <li><a class="dropdown-item" href="#">Something else here</a></li> */}
//       </ul>
//     </div>
// }
// </div>
//             {/* <Link to="/login"style={{fontWeight: "bold"}} className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-user-alt m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Sign in</p> </Link> */}
//             <Link to="/cart"style={{fontWeight: "bold"}} className="border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-shopping-cart m-1 me-md-2"></i><p className="d-none d-md-block mb-0">My cart</p>&nbsp;{totalItems} </Link>
//           </div>
//         </div>
    
       
//       </div>
//     </div>
//   </div>

//         </header>





//     </div>
// }
// export default Navbar












{/* <header className="navbar-component-container">
 
<div className="py-3 text-center border-bottom">
  <div className="container">
    <div className="d-flex align-items-center row gy-3">
    
      <div className="col-lg-2 col-sm-4 col-4">
        <Link to="/"className="float-start" style={{textDecoration: "none"}}>
          <Logo />
        </Link>
      </div>
      

      
      <div className="order-lg-last col-lg-5 col-sm-8 col-8">
        <div className="d-flex float-end">
          <Link to="/login" className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-user-alt m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Sign in</p> </Link>
          <a href="#" className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-heart m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Wishlist</p> </a>
          <Link to="/cart" className="border rounded py-1 px-3 nav-link d-flex align-items-center"> <i className="fas fa-shopping-cart m-1 me-md-2"></i><p className="d-none d-md-block mb-0">My cart</p>&nbsp;{totalItems} </Link>
        </div>
      </div>
  
     
    </div>
  </div>
</div>

      </header> */}