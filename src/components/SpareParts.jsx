// Import React Package
import { useTranslation } from "react-i18next";
import Aos from "aos";
import { Helmet } from "react-helmet-async";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from 'react-select'
import { fetechAllCarBrands } from '../rtk/slicers/carBrandsSlicer';
import axios from "axios";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { useFormik } from "formik";
// End

// Import Assets / Images

// End

// Import Componets
import Sectionheading from "./SectionHeading";
import BreadCrump from "./BreadCrump";
import Loading from "./Loading";
import InputComponent from "./InputComponent";
// End

// Import Css Files
import "aos/dist/aos.css";
import "../css/spareparts.css";

// End

function SpareParts() {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.webLanguage);
  const [carBrandsOptions, setCarBrandsOptions] = useState([]);
  const [models, setModels] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [car_brand_id, setCarBrandId] = useState('');
  const [car_model_id, setCarModelId] = useState('');
  const [selectedValue, setSelectedValue] = useState(undefined);
  const { brands, status, error } = useSelector(state => state.carBrands);
  const [carBrandSelectValue, setCarBrandSelectValue] = useState('');


  const dispatch = useDispatch();

  const handleSelect = (value) => {
    setSelectedValue(value);
  };


  useEffect(() => {
    dispatch(fetechAllCarBrands());
  }, [dispatch]);



  useEffect(() => {
    if (status === 'Success') {
      const brandSelectOptions = brands.map(brand => ({
        value: brand.uuid,
        label: lang === 'en' ? brand.car_brand_name_en : brand.car_brand_name_ar
      }));
      setCarBrandsOptions(brandSelectOptions);
    }
  }, [brands, status, lang]);


  useEffect(() => {
    const fetchModelsBasedOnBrandID = async () => {
      if (carBrandSelectValue) {
        try {
          const res = await axios.get(`http://127.0.0.1:8000/api/v1/main-car-model/${carBrandSelectValue}/car-models`);
          setModels(res.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchModelsBasedOnBrandID();
  }, [carBrandSelectValue]);


  useEffect(() => {
    const modelsSelectOptions = models.map(model => ({
      value: model.uuid,
      label: lang === 'en' ? model.main_model_name_en : model.main_model_name_ar
    }));
    setModelOptions(modelsSelectOptions);
  }, [models, lang]);



  // Yup For Schema Validation

  const memberBuyOrderRequestSchemaValidation = Yup.object({
    client_name: Yup.string().required(t('client_name_required_validation')),
    client_email: Yup.string().email(t('email_valid_validation')),
    client_phone: Yup.string().matches(/^5[0-9]+$/, t('phone_valid_validation')).required(t('phone_required_validation')),
    spare_part_no: Yup.string(),
    spare_part_name: Yup.string().required(t('spare_part_required_validation')),
    notes: Yup.string(),
});


const formik = useFormik({
    initialValues: {
        client_name: '',
        client_email: '',
        client_phone: '',
        spare_part_no: '',
        spare_part_name: '',
        notes: '',
        car_brand_id: car_brand_id,
        car_model_id: car_model_id,
    },

    validationSchema: memberBuyOrderRequestSchemaValidation,

    onSubmit: async (values, { resetForm }) => {

        try {
            console.log('Formik Values:', values);
            const response = await axios.post('http://127.0.0.1:8000/api/v1/spare-parts-request', values);

            Swal.fire({
                title: t('titleOfSuccessAskBuyRequestMsg'),
                icon: 'success',
                confirmButtonText: 'حسناً'
            });
            console.log('Api Response With:', response.data);
            resetForm();
            setTimeout(() => {
              window.location.reload();
          }, 4000)
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
      <Helmet>
        <title>
          {lang === "en"
            ? "DJ-MOTORS | SPARE PARTS"
            : "دي جي موتورز | قطع الغيار"}
        </title>
      </Helmet>

      <BreadCrump
        mainPageUrl={"/"}
        mainPage={t("home")}
        cuurentPageUrl={"/spareparts"}
        cuurentPage={t("spareparts")}
      />
      <Sectionheading heading={t("sparePartHeading")} />
      <div className="spare-parts-container">
        <div className="spare-parts sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto ">
          <div className="max-w-2xl mx-auto my-8">
            <p className="text-lg text-gray-500 leading-9 p-4">
              {t("sparePartsDescription")}
            </p>
          </div>
          <form action="" method="post" onSubmit={formik.handleSubmit} className="w-full">
          <div className={`w-full flex flex-col gap-4 my-4`}>
           
            <div className="w-full grid grid-cols-2 gap-2">
              <InputComponent
                labelInputID={"client_name"}
                inputLabel={t("labelForClientName")}
                inputType={"text"}
                inputPlaceHolder={t("placeholderforclientname")}
                required={true}
                inputName={"client_name"}
                inputID={"client_name"}
                width={'col-span-2'}
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
              <InputComponent
                labelInputID={"spare_part_no"}
                inputLabel={t("labelForSparePartNo")}
                inputType={"text"}
                inputPlaceHolder={t("placeholderforsparepartno")}
                inputName={"spare_part_no"}
                inputID={"spare_part_no"}
                onChangeHandler={formik.handleChange}
                onBlurHandler={formik.handleBlur}
                value={formik.values.spare_part_no}
                error={formik.errors.spare_part_no}
                touched={formik.touched.spare_part_no}
              />

              <InputComponent
                labelInputID={"spare_part_name"}
                inputLabel={t("labelForSparePartName")}
                inputType={"text"}
                inputPlaceHolder={t("placeholderforsparepartname")}
                required={true}
                inputName={"spare_part_name"}
                inputID={"spare_part_name"}
                onChangeHandler={formik.handleChange}
                onBlurHandler={formik.handleBlur}
                value={formik.values.spare_part_name}
                error={formik.errors.spare_part_name}
                touched={formik.touched.spare_part_name}
              />
            </div>
            <div className="input-card flex flex-col gap-2">
              <label
                htmlFor="choose_car_brand"
                className="font-bold text-sm text-gray-700"
              >
                {t("labelForChooseBrandCar")}
              </label>
              <Select
                options={carBrandsOptions}
                placeholder={t("placeHolderForChooseCarBrand")}
                name="choose_car_brand"
                onChange={(e) => {
                  formik.setFieldValue("car_brand_id", e.value); 
                  setCarBrandSelectValue(e.value);
                }}
              />
            </div>
            <div className="input-card flex flex-col gap-2">
              <label
                htmlFor="choose_car_model"
                className="font-bold text-sm text-gray-700"
              >
                {t("labelForChooseCarModel")}
              </label>
              <Select
                options={modelOptions}
                placeholder={t("placeHolderForChooseCarModel")}
                name="choose_car_model"
                onChange={(e) => {
                  formik.setFieldValue("car_model_id", e.value); 

                }}
              />
            </div>
            <InputComponent labelInputID={'notes'} inputLabel={t('labelForNotes')} inputType={'text'} inputPlaceHolder={t('placeholderfornotes')} inputName={'notes'} inputID={'notes'} width={'w-full'} height={'h-14'} onChangeHandler={formik.handleChange} onBlurHandler={formik.handleBlur} value={formik.values.notes} error={formik.errors.notes} touched={formik.touched.notes} />
            <div className="w-full flex justify-center">
                <button className='w-full border bg-red-600 text-white  font-bold flex justify-center items-center px-12 py-4 rounded outline-none hover:bg-mainRedColor transition-all duration-100' type='submit'>{t('confirm')}</button>
            </div>
            
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SpareParts;
