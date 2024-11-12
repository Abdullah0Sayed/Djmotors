// Import React Package
import { useTranslation } from "react-i18next";
import Aos from "aos";
import { Helmet } from "react-helmet-async";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import * as Yup from 'yup';
import {useFormik} from 'formik';
import axios from "axios";
import Swal from 'sweetalert2';
// End

// Import Assets / Images
import satha from "../images/services/satha.jpg";
import fix from "../images/services/fix.jpg";
// End

// Import Componets
import Sectionheading from "./SectionHeading";
import BreadCrump from "./BreadCrump";
import ServiceCard from "./ServiceCard";
import InputComponent from "./InputComponent";
// End

// Import Css Files
import "aos/dist/aos.css";

// End

function Services() {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.webLanguage);
  let [overlay , setOverLay] = useState(false);
  
  // Fetch Services
  let [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/v1/services`);
        console.log(`Services : ${res.data.data}`);
        setServices(res.data.data);
      } catch (error) {
        console.log("Errors From Fetch Services : " + error);
      }
    };

    fetchServices();
  }, []);


//   openOverLayFunction
const openOverLay = ()=> {
    setOverLay(true);
}

//   closeOverLayFunction
const closeOverLay = ()=> {
    setOverLay(false);
}


// Service Request Schema Validation
const serviceSchemaValidationRequest = Yup.object({
    client_name: Yup.string().required(t('client_name_required_validation')),
    client_email: Yup.string().email(t('email_valid_validation')),
    client_phone: Yup.string().matches(/^5[0-9]+$/, t('phone_valid_validation')).required(t('phone_required_validation')),
    notes: Yup.string()
});
// Formik
const formik = useFormik({
    initialValues: {
        client_name: '',
        client_email: '',
        client_phone: '',
        notes: ''
    }, 
    validationSchema: serviceSchemaValidationRequest,
    onSubmit: async(values , {resetForm})=>{
        try {
            console.log(`Service Request Form : ${values}` )
                const response = await axios.post('http://127.0.0.1:8000/api/v1/services-request', values);
                Swal.fire({
                    title: t('titleOfSuccessAskBuyRequestMsg'),
                    icon: 'success',
                    confirmButtonText: 'حسناً'
                });
                window.location.reload();
                resetForm();
        } catch (error) {
            console.error('Error submitting Form:', error.response?.data || error.message);
                Swal.fire({
                    title: t('titleOfErrorRequestMsg'),
                    icon: 'error',
                    confirmButtonText: 'حسناً'
                });
        }
    }
});

  return (
    <div className="min-h-screen">
      {
        overlay && <div
        className={`overlay absolute top-0 left-0 flex justify-end w-full min-h-screen h-full bg-[rgba(0,0,0,0.34)]`}
       
      >
        <div
          className={`service-request-side w-80 p-4 h-full flex flex-col items-center bg-[rgba(255,255,255)]`}
        >
        <div className="w-full flex flex-en">
            <button className="bg-red-800 text-white text-xs font-black p-2 rounded hover:bg-mainRedColor" onClick={closeOverLay}>{t('closeSideBarRequest')}</button>
        </div>
          <div className="sidebar-heading-hint flex flex-col gap-4 justify-center items-center">
            <p className="text-xl font-black">{t("serviceRequestHeading")}</p>
            <span className="text-sm w-60 text-justify">
              {t("serviceRequestHint")}
            </span>
          </div>
          <hr className="bg-slate-800 w-full my-4" />
        <form action="" method="post" className="w-full" onSubmit={formik.handleSubmit}>
            <div className={`w-full flex flex-col gap-4`}>
                <InputComponent
                labelInputID={"client_name"}
                inputLabel={t("labelForClientName")}
                inputType={"text"}
                inputPlaceHolder={t("placeholderforclientname")}
                required={true}
                inputName={"client_name"}
                inputID={"client_name"}
                onChangeHandler={formik.handleChange}
                onBlurHandler={formik.handleBlur}
                value={formik.values.client_name}
                error={formik.errors.client_name}
                touched={formik.touched.client_name}
                />
                <InputComponent
                labelInputID={"client_email"}
                inputLabel={t("labelForEmail")}
                inputType={"email"}
                inputPlaceHolder={t("placeholderforemail")}
                required={false}
                inputName={"client_email"}
                inputID={"client_email"}
                onChangeHandler={formik.handleChange}
                onBlurHandler={formik.handleBlur}
                value={formik.values.client_email}
                error={formik.errors.client_email}
                touched={formik.touched.client_email}
                />

                <InputComponent
                labelInputID={"client_phone"}
                inputLabel={t("labelForPhone")}
                inputType={"text"}
                maxLength={9}
                inputPlaceHolder={t("placeholderforphone")}
                required={true}
                inputName={"client_phone"}
                inputID={"client_phone"}
                onChangeHandler={formik.handleChange}
                onBlurHandler={formik.handleBlur}
                value={formik.values.client_phone}
                error={formik.errors.client_phone}
                touched={formik.touched.client_phone}
                />

                <InputComponent
                labelInputID={"notes"}
                inputLabel={t("labelForNotes")}
                inputType={"text"}
                inputPlaceHolder={t("placeholderfornotes")}
                inputName={"notes"}
                inputID={"notes"}
                width={"w-full"}
                height={"h-14"}
                  onChangeHandler={formik.handleChange}
                  onBlurHandler={formik.handleBlur}
                  value={formik.values.notes}
                  error={formik.errors.notes}
                  touched={formik.touched.notes}
                />
                
            </div>
            <hr className="bg-slate-800 w-full my-4" />
            <div className="w-full flex">
                    <button className="w-full bg-mainRedColor text-white py-2 px-4 rounded hover:bg-red-600 hover:text-white" type='submit'>
                        {t('confirmBuyNow')}
                    </button>
            </div>
        </form>
        </div>
      </div>
      }

      <div className="services-container">
        <Helmet>
          <title>
            {lang === "en" ? "DJ-MOTORS | Services" : "دي جي موتورز | الخدمات "}
          </title>
        </Helmet>
        <BreadCrump
          mainPageUrl={"/"}
          mainPage={t("home")}
          cuurentPageUrl={"/services"}
          cuurentPage={t("services")}
        />
        <Sectionheading heading={t("servicesHeading")} />
        <div className="services sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto my-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
          {services.map((service, index) => {
            return (
              <ServiceCard
                key={index}
                serviceTitle={
                  lang === "en"
                    ? service.service_name_en
                    : service.service_name_ar
                }
                serviceImage={service.service_images.full_path}
                serviceDescription={
                  lang === "en"
                    ? service.service_description_en
                    : service.service_description_ar
                }
                service_id={service.uuid}
                onButtonClick={()=>{
                    openOverLay()
                    formik.setFieldValue('service_id' , service.uuid)
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Services;
