import { connect } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate , useLocation} from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  userLogout,
  requestCountNotification,
  requestLogin,
} from "../Redux/actions";
import { categoryJob } from "../Redux/adminapi";

import {gotToTop} from './header'


const initState=false;
function ManageAccount(props) {
  // console.log("malasi===",props);
  const [user, setUser] = useState({});
  const [count, setcount] = useState(props.notificationCount || 0);
  const navigate = useNavigate();
  function logout() {
    props.userLogout();
    navigate("/home");
  }

  const [show, setShow] = useState(props.from=="submenu"?true:false);
  const [show2, setShow2] = useState(props.from=="submenu2"?true:false);
  const [show3, setShow3] = useState(false);
  useEffect(() => {
    // console.log("show===" + show);
    // if(props.from=="submenu")
    // setShow(true)
  }, [show]);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setUser(loginData.data.data);
        props.requestCountNotification({
          token: loginData.data.data.token,
        });
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [props.candidate.loginData]);

  const [setting, setSetting] = useState(false);
  function displayOption() {
    if (show === "none") {
      setShow("block");
    } else {
      setShow("none");
    }
  }
  function displayOptionhide() {
    setShow("none");
  }

  const setOpen = () => {
    console.log("hh")
    setShow("block");
  };

  useEffect(() => {
    let countNotificationData = props.candidate.countNotificationData;
    if (countNotificationData !== undefined) {
      if (countNotificationData?.data?.status === "success") {
        setcount(countNotificationData.data.data);
      }
    }
  }, [props.candidate.countNotificationData]);



  
  const [categories, setCategories] = useState([
    // Start One Menu
    {
      id: 1,
      name: 'My Profile',
      icon : 'fa fa-file-o',
     
      items: [
        {
          id: 11,
          name: 'Resume',
          link : '#0',
          icon : 'fa fa-file-o',
          items: [
            // {
            //   id: 21,
            //   cat_id:1,
            //   sub_cat_id:11,
            //  name: 'Profile Photo',
            //  icon : 'fa fa-file-o',
            //  link : '/picture'
             
            // }, 
            {
              id: 22,
              cat_id:1,
              sub_cat_id:11,
              name: 'Create Resume',
              icon : 'fa fa-file-o',
              link : '/profile?type-cp'

            }, 
            // {
            //   id: 23,
            //   cat_id:1,
            //   sub_cat_id:11,
            //   name : ' References',
            //   icon : 'fa fa-file-o',
            //   link : '/references'
            // },
            {
              id: 24,
              cat_id:1,
              sub_cat_id:11,
              name : 'Supporting Documents',
              icon : 'fa fa-file-o',
              link : '/supportingdocuments',
            },
            {
              id: 25,
              cat_id:1,
              sub_cat_id:11,
              name : 'Upload Resume',
              icon : 'fa fa-file-o',
              link : '/adduploadresume',
              // link : '/addResumeForm',
            },
            // {
            //   id: 26,
            //   cat_id:1,
            //   sub_cat_id:11,
            //   name : 'View Resume',  
            //   icon : 'fa fa-file-o',
            //   link : '/resume'
            // },
                
          ],
          isOpen: false,
        },
        {
          id: 12,
          cat_id:1,
          name: 'Personality Score',
          icon : 'fa fa-file-o',
          link : '/videopitchtwo',
          isOpen: false,
        },
        {
          id: 13,
          cat_id:1,
          name: 'Psychometric Test',
          icon : 'fa fa-file-o',
          link : '/psychometrictest',
          isOpen: false,
        },
        {
          id: 14,
          cat_id:1,
          name: 'Skill Test',
          icon : 'fa fa-file-o',
          link : '/takeskilltest',
          isOpen: false,
        },
        {
          id: 15,
          cat_id:1,
          name: 'Wellness Report',
          icon : 'fa fa-file-o',
          link : '/wellnessreport',
          isOpen: false,
        },
        {
          id: 16,
          cat_id:1,
          name: 'Trust Score',
          icon : 'fa fa-file-o',
          link : '/trustscore',
          isOpen: false,
        },
        {
          id: 17,
          cat_id:1,
          name: 'References',
          icon : 'fa fa-file-o',
          link : '/references',
          isOpen: false,
        },
      ],
      isOpen: false,
    },
    // End One Menu
    // Start One  Menu 
    {
      id: 2,
      name: ' My Applications',
      icon : 'fa fa-handshake-o',
      link : '/appliedJobs',
      items: []
},
    // End One  Menu

    {
      id: 3,
      name: 'Notifications',
      icon : 'fa fa-bell-o',
      link : '/notifications/1/5',
      items: []
},
    // End One  Menu

//     {
//       id: 4,
//       name: ' Messages',
//       icon : 'fa fa-comments-o',
//       link : '/messages',
//       items: []
// },
    // End One  Menu
//     {
//       id: 5,
//       name: ' My Report',
//       icon : 'fa fa-comments-o',
//       link : '/resume',
//       items: []
// },

{
  id: 6,
  name: 'Job Alerts',
  icon : 'fa fa-exclamation',
  link : '/jobAlerts',
  items: []
},

{
  id: 7,
  name: 'Settings',
  icon : 'fa fa-cog',
  link : '/settings',
  items: []
},

{
  id: 8,
  name: 'Sign Out',
  icon : 'fa fa-sign-out',
  link : '/home',
  items: []
},
    
    
  ]);


  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [activeMinisubmenuId, setActiveMinisubmenuId] = useState(null);

  const [menucat, setMenucat] = useState(null);


const gotodashboard = useRef(null);

const scrollfun = () => {
  if(window.location.href.includes('profile?type-cp') || !window.location.href.includes('profile')){

     console.log("getting height");
    if (gotodashboard.current) {
      const element = gotodashboard.current;
  
      // Calculate the offset for scrolling (100 pixels from the top)
      const offset = element.getBoundingClientRect().top + window.pageYOffset - 140;
      window.scrollTo({
        top: offset,
        behavior: 'smooth', // Optional: Add smooth scrolling animation
      });
    }
  }
  // console.log("testing", gotodashboard.current);
};











//============================Start nes changes here 
const handleCategoryClick = (categoryId) => {
  // alert(2121)
  setCategories((prevCategories) =>
    prevCategories.map((category) => ({
      ...category,
      isOpen: category.id === categoryId ? !category.isOpen : false,
    }))
  );
  setSelectedCategory(categoryId);
  setSelectedSubcategory(null);
};


const handleSubcategoryClick = (categoryId, subcategoryId) => {
  setSelectedCategory(categoryId);
  setSelectedSubcategory(subcategoryId);
  setCategories((prevCategories) =>
    prevCategories.map((category) => {
      if (category.id === categoryId) {
        const updatedSubcategories = category.items.map((subcategory) => {
          if (subcategory.id === subcategoryId) {
            return { ...subcategory, isOpen: !subcategory.isOpen };
          }
          return { ...subcategory, isOpen: false };
        });

        return { ...category, items: updatedSubcategories };
      }
      return { ...category, isOpen: false };
    })
  );
};



const handleMenusubClick = (categoryId, subcategoryId, minisubmenuId) => {
    
  setActiveMinisubmenuId(minisubmenuId);

  console.log(  "state >>>>>>>>>",  activeMinisubmenuId);

};

const [SelectedTab, setSelectedTab] =  useState({})

let findDeep = function(data, activity) {
  return data.some(function(e) {
    if(e.link == activity) {
      setSelectedTab(e)
      // console.log('e++++ ', e)
      return e
    }
    else if(e.items){
      return findDeep(e.items, activity)
    }
  })
}


useEffect(() => {
  
  let a1 = window.location.href
  let a1Arr = a1.split('/')
  let slug = a1Arr[a1Arr.length-1]

  let a0 = findDeep(categories, `/${slug}`);
  // console.log( "reload function", a0);
  // console.log( "SelectedTab >>sss>>> ", SelectedTab);
// console.log('1111111111111')


}, [])
useEffect(() => {
  // console.log('2222', SelectedTab)
  if(SelectedTab){
    handleCategoryClick(SelectedTab.cat_id)
    if(SelectedTab?.sub_cat_id){
      setActiveMinisubmenuId(SelectedTab.id)
      handleSubcategoryClick(SelectedTab.cat_id, SelectedTab.sub_cat_id)
    }
  }
  
  // gotToTop()
  // dashboardToTop()
  scrollfun()


  
}, [SelectedTab])



// =========================================End nes changes here 





  return (
    <div class="col-lg-4 col-12 " ref={gotodashboard}>
      <div class="dashbord-sidebar" >
        <ul>
          <li class="heading">Manage Your Account</li>
        
       {/* Start new drop down */}
       <>


    

       <nav id="sidebar" >
      <div className="list-group sidebar-menulist">
        {categories.map((category) => (
          <ul key={category.id} className="mb-4 pl-0">
            <li className="dropList">
              <Link
                to={category.link ? category.link : ''}
                className={`list-group-item list-group-item-action ${ SelectedTab.id === category.id || category.isOpen  ? 'active' : ''}`}
                onClick={(e) =>
                {
                  if(category.items && category.items.length > 0){
                    
                    handleCategoryClick(category.id)
                   
                    e.preventDefault();
                  }
                }
                 
                }
              >
                <i className={category.icon}></i> {category.name}

                {category.items && category.items.length > 0 && (
                  <div className="dropMiniList"><i className={`fa ${category.isOpen ? 'fa-caret-up' : 'fa-caret-down'}`} /></div>
                )}

              </Link>
              {category.isOpen && (
                <ul className="submenu mt-2">
                  {category.items.map((subcategory) => (
                    <li key={subcategory.id} className="dropList">
                      <Link
                        to= {subcategory.link}
                        className={`list-group-item list-group-item-action ${
                          SelectedTab.id === subcategory.id ||  subcategory.isOpen  ? 'active' : ''
                        }`}
                        onClick={(e) =>
                         { 
                          if(subcategory.items && subcategory.items.length > 0){
                            handleSubcategoryClick(category.id, subcategory.id)
                            e.preventDefault();
                          }
                          }
                        }
                      >
                        <i className={subcategory.icon}></i> {subcategory.name}

                        { subcategory.items && subcategory.items.length > 0 &&
                        subcategory.items.length > 0 && (
                         <div className="dropMiniList"> <i className={`fa ${ subcategory.isOpen ? 'fa-caret-up' : 'fa-caret-down'}`}/></div>
                        )}
                      </Link>
                      { subcategory.items && subcategory.items.length > 0 && subcategory.isOpen && (
                        <ul className="minisubmenu mt-2">
                          { subcategory.items && subcategory.items.length > 0 && subcategory.items.map((minisubmenu, index) => (
                            <li key={index}>
                              <Link

                                to={minisubmenu.link}
                                className={`list-group-item list-group-item-action d-flex align-items-center ${minisubmenu.id === activeMinisubmenuId ? 'active' : ''}`}

                               onClick={(e) => {
                              console.log("iddd", minisubmenu.id)
                              handleMenusubClick(category.id, subcategory.id, minisubmenu.id);
                              
                               }}

                              >
                                <i className={minisubmenu.icon}></i> {minisubmenu.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        ))}
      </div>
    </nav>


  


  
       </>
       {/* End new drop down */}
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { userLogout, requestCountNotification, requestLogin },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
