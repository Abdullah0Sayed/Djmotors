// Import React Package
import { useTranslation } from "react-i18next";
import Aos from "aos";
import { Helmet } from "react-helmet-async";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Calendar } from "primereact/calendar";
import { fetechAllCarBrands } from "../rtk/slicers/carBrandsSlicer";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from "axios";
import Swal from "sweetalert2";
import { format } from 'date-fns';

// End

// Import Assets / Images
import maintainanceImage from "../images/maintainanceImage.jpg";
// End

// Import Componets
import Sectionheading from "./SectionHeading";
import InputComponent from "./InputComponent";
import BreadCrump from "./BreadCrump";
// End

// Import Css Files
import "aos/dist/aos.css";
import "../css/bookmaintainance.css";
import "primereact/resources/themes/saga-blue/theme.css"; // استبدل الثيم بما تفضله
import "primereact/resources/primereact.min.css"; // ملفات CSS الأساسية لـ PrimeReact

// End

function BookMaintenanceAppointment() {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.webLanguage);
  const { brands, status, error } = useSelector((state) => state.carBrands);
  const dispatch = useDispatch();
  const [carBrandsOptions, setCarBrandsOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [carBrandSelectValue, setCarBrandSelectValue] = useState("");
  const [carModelSelectValue, setCarModelSelectValue] = useState("");
  const [models, setModels] = useState([]);
  const yearOptions = [];
  let currentYear = new Date();
  currentYear = currentYear.getFullYear();
  for (let year = 2000; year <= currentYear; year++) {
    let object = {
      value: year,
      label: year,
    };
    yearOptions.push(object);
  }

  let [datetime12h, setDateTime12h] = useState("");
  useEffect(() => {
    dispatch(fetechAllCarBrands());
  }, []);

  const maintainanceOptions = [
    {
      label: lang === "en" ? "Regular Maintenance" : "صيانة دورية",
      value: lang === "en" ? "Regular Maintenance" : "صيانة دورية",
    },
    {
      label: lang === "en" ? "Other Maintenance" : "صيانة أخرى",
      value: lang === "en" ? "Other Maintenance" : "صيانة أخرى",
    },
  ];

  useEffect(() => {
    if (status === "Success") {
      const brandSelectOptions = brands.map((brand) => ({
        value: brand.uuid,
        label:
          lang === "en" ? brand.car_brand_name_en : brand.car_brand_name_ar,
      }));
      setCarBrandsOptions(brandSelectOptions);
    }
  }, [brands, status, lang]);

  useEffect(() => {
    const fetchModelsBasedOnBrandID = async () => {
      if (carBrandSelectValue) {
        try {
          const res = await axios.get(
            `http://127.0.0.1:8000/api/v1/main-car-model/${carBrandSelectValue}/car-models`
          );
          setModels(res.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchModelsBasedOnBrandID();
  }, [carBrandSelectValue]);

  useEffect(() => {
    const modelsSelectOptions = models.map((model) => ({
      value: model.uuid,
      label:
        lang === "en" ? model.main_model_name_en : model.main_model_name_ar,
    }));
    setModelOptions(modelsSelectOptions);
  }, [models, lang]);

  // Yup For Schema
  const maintenanceRequestSchema = Yup.object({
    client_name: Yup.string().required(t("client_name_required_validation")),
    client_email: Yup.string().email(t("email_valid_validation")),
    client_phone: Yup.string()
      .matches(/^5[0-9]+$/, t("phone_valid_validation"))
      .required(t("phone_required_validation")),
    maintenance_date_time: Yup.string()
      .required(t("maintenance_date_time_required_validation"))
      .test(
        "is-valid-date",
        t("maintenance_date_time_invalid_validation"),
        (value) => {
          if (!value) return false;
          const dateFormat =
            /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4}) (0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;
          return dateFormat.test(value);
        }
      ),
    car_km: Yup.string()
      .matches(/^\d{1,7}$/, t("car_km_invalid_validation"))
      .required(t("car_km_required_validation")),
    car_chassis_number: Yup.string(),
    car_model_year: Yup.string()
      .matches(/^(19|20)\d{2}$/, t("model_year_invalid_validation"))
      .test("is-valid-year", t("model_year_invalid_validation"), (value) => {
        if (!value) return false;
        const year = parseInt(value, 10);
        return year >= 1900 && year <= currentYear;
      })
      .required(t("model_year_required_validation")),
    maintenance_type: Yup.string()
      .required(t("maintenance_type_required_validation"))
      .oneOf([
        "Regular Maintenance",
        "صيانة دورية",
        "Other Maintenance",
        "صيانة أخرى",
      ]),
  });

  //   Formik

  const formik = useFormik({
    initialValues: {
      client_name: "",
      client_email: "",
      client_phone: "",
      maintenance_date_time: "",
      car_km: "",
      car_chassis_number: "",
      car_model_year: "",
      maintenance_type: "",
      maintenance_notes: "",
    },
    validationSchema: maintenanceRequestSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Formik Values:", values);
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/maintenance-booking-request",
          values
        );

        Swal.fire({
          title: t("titleOfSuccessAskBuyRequestMsg"),
          icon: "success",
          confirmButtonText: "حسناً",
        });
        console.log("Api Response With:", response.data);
        resetForm();
      } catch (error) {
        console.error(
          "Error submitting Form:",
          error.response?.data || error.message
        );
        Swal.fire({
          title: t("titleOfErrorRequestMsg"),
          icon: "error",
          confirmButtonText: "حسناً",
        });
      }
    },
  });

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>
          {lang === "en"
            ? "DJ MOTORS | BOOK A Maintenance"
            : "دي جي موتورز | حجز موعد صيانة"}
        </title>
      </Helmet>
      <form action="" method="POST" onSubmit={formik.handleSubmit}>
        <BreadCrump
          mainPageUrl={"/"}
          mainPage={t("home")}
          cuurentPageUrl={"/book-maintenance-appointment"}
          cuurentPage={t("bookaFix")}
        />

        <div className="w-full maintainance-image-hint flex justify-center items-center relative overflow-hidden bg-black sm:h-80 h-40">
          <div className="image-heading"></div>
          <Sectionheading
            heading={t("BookMaintenanceAppointmentHeading")}
            textSize={"lg:text-6xl text-3xl"}
            textColor={"text-white"}
          />
        </div>

        <div className="sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto p-2">
          <Sectionheading heading={t("contactInfo")} textSize={"text-lg"} />
          <div className="grid grid-cols-2 justify-center items-center my-4 gap-4">
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
              inputType={"email"} // تصحيح نوع الحقل
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
            <div className={`w-full flex flex-col gap-2`}>
              <label
                htmlFor={"maintenance_date_time"}
                className="font-bold text-sm text-gray-700"
              >
                {t("labelmaintainanceDate")}
              </label>
              <Calendar
                onChange={(e) => {
                    const value = e.value; 
                    setDateTime12h(format(value, 'MM/dd/yyyy hh:mm a')); 
                    formik.setFieldValue("maintenance_date_time", format(value, 'MM/dd/yyyy hh:mm a'));
                }}
                onBlur={formik.handleBlur}
                value={formik.values.maintenance_date_time}
                error={formik.errors.maintenance_date_time}
                touched={formik.touched.maintenance_date_time}
                showTime
                hourFormat="12"
                name="maintenance_date_time"
                inputClassName={`w-full p-4 border outline-none shadow focus:border-mainRedColor border-r-red-400 border-l-red-400 border-transparent`}
                popup
                placeholder={t("placeHolderForMaintainanceCalendar")}
              />
            </div>

            <div className="flex flex-col items-center"></div>
          </div>
          <Sectionheading heading={t("carInfo")} textSize={"text-lg"} />

          <div className="grid grid-cols-2 justify-center items-center my-4 gap-4">
            <InputComponent
              labelInputID={"car_km"}
              inputLabel={t("labelForCarKm")}
              inputType={"text"}
              inputPlaceHolder={t("placeholderforkmcounting")}
              required={true}
              inputName={"car_km"}
              inputID={"car_km"}
              onChangeHandler={formik.handleChange}
              onBlurHandler={formik.handleBlur}
              value={formik.values.car_km}
              error={formik.errors.car_km}
              touched={formik.touched.car_km}
            />
            <InputComponent
              labelInputID={"car_chassis_number"}
              inputLabel={t("labelForCarChassis")}
              inputType={"text"}
              inputPlaceHolder={t("placeholderforcarchassis")}
              inputName={"car_chassis_number"}
              inputID={"car_chassis_number"}
              onChangeHandler={formik.handleChange}
              onBlurHandler={formik.handleBlur}
              value={formik.values.car_chassis_number}
              error={formik.errors.car_chassis_number}
              touched={formik.touched.car_chassis_number}
            />
            <div className="flex flex-col gap-2">
              <label
                htmlFor="car_model_year"
                className="font-bold text-sm text-gray-700"
              >
                {t("labelForModelYear")}
              </label>
              <Select
                options={yearOptions}
                name="car_model_year"
                onChange={(e) => {
                  formik.setFieldValue("car_model_year", e.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="choose_car_brand"
                className="font-bold text-sm text-gray-700"
              >
                {t("labelForChooseBrandCar")}
              </label>
              <Select
                options={carBrandsOptions}
                name="car_brand_id"
                onChange={(e) => {
                  formik.setFieldValue("car_brand_id", e.value);
                  setCarBrandSelectValue(e.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="choose_car_model"
                className="font-bold text-sm text-gray-700"
              >
                {t("labelForChooseCarModel")}
              </label>
              <Select
                options={modelOptions}
                name="car_model_id"
                onChange={(e) => {
                  formik.setFieldValue("car_model_id", e.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="maintenance_type"
                className="font-bold text-sm text-gray-700"
              >
                {t("labelForMaintainanceType")}
              </label>
              <Select
                options={maintainanceOptions}
                name="maintenance_type"
                onChange={(e) => {
                  formik.setFieldValue("maintenance_type", e.value);
                }}
              />
            </div>
          </div>

          <Sectionheading heading={t("buyNowNotes")} textSize={"text-lg"} />

          <div className="input-card flex flex-col gap-2 col-span-2">
            <InputComponent
              labelInputID={"maintenance_notes"}
              inputLabel={t("labelForNotesAboutMaintainance")}
              inputType={"text"}
              inputPlaceHolder={t("placeholderfornotesaboutmaintainance")}
              inputName={"maintenance_notes"}
              inputID={"maintenance_notes"}
              width={"w-full"}
              height={"h-14"}
              onChangeHandler={formik.handleChange}
              onBlurHandler={formik.handleBlur}
              value={formik.values.maintenance_notes}
              error={formik.errors.maintenance_notes}
              touched={formik.touched.maintenance_notes}
            />
          </div>

          <div className="w-full col-span-2 flex justify-center my-4">
            <button
              className="w-full border bg-red-600 text-white  font-bold flex justify-center items-center px-12 py-4 rounded outline-none hover:bg-mainRedColor transition-all duration-100"
              type="submit"
              onClick={(e)=>{
                console.log(formik.values)
              }}
            >
              {t("confirm")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BookMaintenanceAppointment;
