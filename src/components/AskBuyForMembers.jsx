// Import React Package
import { useTranslation } from 'react-i18next'
import Aos from 'aos';
import Sectionheading from './SectionHeading';
import Select from 'react-select'
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import axios from 'axios';
import { fetechAllCarBrands } from '../rtk/slicers/carBrandsSlicer';
import { useEffect, useState } from 'react';
// End

// Import Assets / Images
import carGuess from '../images/cars/carGuess.png';
// End

// Import Componets 
import InputComponent from './InputComponent';



// End

// Import Css Files
import "primereact/resources/themes/lara-light-cyan/theme.css";
// End


function AskBuyForMember() {
    const { t } = useTranslation();
    const lang = useSelector(state => state.webLanguage);
    const dispatch = useDispatch();

    const { brands, status, error } = useSelector(state => state.carBrands);
    const [carBrandsOptions, setCarBrandsOptions] = useState([]);
    const [carBrandSelectValue, setCarBrandSelectValue] = useState('');
    const [carModelSelectValue, setCarModelSelectValue] = useState('');
    const [models, setModels] = useState([]);
    const [modelOptions, setModelOptions] = useState([]);
    const [selectedModel, setSelectedModel] = useState(undefined);
    const [car_brand_id, setCarBrandId] = useState('');
    const [car_model_id, setCarModelId] = useState('');


    const [selectedValue, setSelectedValue] = useState(undefined);

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


    useEffect(() => {
        const fetchCarModelImageBasedOnModelID = async () => {
            if (carModelSelectValue && carBrandSelectValue) {
                try {
                    const res = await axios.get(`http://127.0.0.1:8000/api/v1/main-car-model/${carBrandSelectValue}/${carModelSelectValue}/car-img`);
                    setSelectedModel(res.data.data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchCarModelImageBasedOnModelID();
    }, [carBrandSelectValue, carModelSelectValue]);


    useEffect(() => {
        console.log('Updated car_brand_id:', car_brand_id);
    }, [car_brand_id]);


    useEffect(() => {
        console.log('Updated car_model_id:', car_model_id);
    }, [car_model_id]);

    // Yup For Schema Validation

    const memberBuyOrderRequestSchemaValidation = Yup.object({
        client_name: Yup.string().required(t('client_name_required_validation')),
        client_email: Yup.string().email(t('email_valid_validation')),
        client_phone: Yup.string().matches(/^5[0-9]+$/, t('phone_valid_validation')).required(t('phone_required_validation')),
        monthly_salary: Yup.number(),
        monthly_commitment: Yup.number(),
        request_type: Yup.string().oneOf(['كاش', 'cash', 'تمويل', 'funding']).required(t('request_type_member_validation')),
        message_request: Yup.string()
    });


    const formik = useFormik({
        initialValues: {
            client_name: '',
            client_email: '',
            client_phone: '',
            monthly_salary: '',
            monthly_commitment: '',
            request_type: '',
            message_request: '',
            car_brand_id: car_brand_id,
            car_model_id: car_model_id,
        },

        validationSchema: memberBuyOrderRequestSchemaValidation,

        onSubmit: async (values, { resetForm }) => {

            try {
                console.log('Formik Values:', values);
                const response = await axios.post('http://127.0.0.1:8000/api/v1/members-buy-car-requests', values);

                Swal.fire({
                    title: t('titleOfSuccessAskBuyRequestMsg'),
                    icon: 'success',
                    confirmButtonText: 'حسناً'
                });
                console.log('Api Response With:', response.data);
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
        <div className='min-h-screen'>
            <Helmet>
                <title>{lang == 'en' ? 'DJ-MOTORS | BUY NOW - MEMBERS' : 'دي جي موتورز | أشتري الأن  - أفراد'}</title>
            </Helmet>
            <Sectionheading heading={t('buyNowMember')} />

            <div className='form-buy-now-member-container my-8'>
                <form action="" method="POST" onSubmit={formik.handleSubmit}>
                    <div className='form-buy-now-member sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto flex flex-col-reverse md:flex-row lg:flex-row gap-8'>

                        <div className='w-full grid grid-cols-2 gap-2 p-2'>
                            <div className='col-span-2'>
                                <Sectionheading heading={t('carInfo')} />
                            </div>


                            <div className='input-card flex flex-col gap-2'>
                                <label htmlFor="choose_car_brand" className='font-bold text-sm text-gray-700'>{t('labelForChooseBrandCar')}</label>
                                <Select options={carBrandsOptions} placeholder={t('placeHolderForChooseCarBrand')} name='choose_car_brand' onChange={(e) => {
                                    formik.setFieldValue('car_brand_id', e.value); // تحديث القيمة في Formik
                                    setCarBrandSelectValue(e.value);
                                }} />
                            </div>
                            <div className='input-card flex flex-col gap-2'>
                                <label htmlFor="choose_car_model" className='font-bold text-sm text-gray-700'>{t('labelForChooseCarModel')}</label>
                                <Select options={modelOptions} placeholder={t('placeHolderForChooseCarModel')} name='choose_car_model' onChange={(e) => {
                                    formik.setFieldValue('car_model_id', e.value); // تحديث القيمة في Formik
                                    setCarModelSelectValue(e.value);
                                }} />
                            </div>



                            <div className='col-span-2'>
                                <Sectionheading heading={t('contactInfo')} />
                            </div>
                            <InputComponent
                                labelInputID={'client_name'}
                                inputLabel={t('labelForClientName')}
                                inputType={'text'}
                                inputPlaceHolder={t('placeholderforclientname')}
                                required={true}
                                inputName={'client_name'}
                                inputID={'client_name'}
                                onChangeHandler={formik.handleChange}
                                onBlurHandler={formik.handleBlur}
                                value={formik.values.client_name}
                                error={formik.errors.client_name}
                                touched={formik.touched.client_name}
                            />

                            <InputComponent
                                labelInputID={'client_email'}
                                inputLabel={t('labelForEmail')}
                                inputType={'email'} // تصحيح نوع الحقل
                                inputPlaceHolder={t('placeholderforemail')}
                                required={false}
                                inputName={'client_email'}
                                inputID={'client_email'}
                                onChangeHandler={formik.handleChange}
                                onBlurHandler={formik.handleBlur}
                                value={formik.values.client_email}
                                error={formik.errors.client_email}
                                touched={formik.touched.client_email}
                            />

                            <InputComponent
                                labelInputID={'client_phone'}
                                inputLabel={t('labelForPhone')}
                                inputType={'text'}
                                maxLength={9}
                                inputPlaceHolder={t('placeholderforphone')}
                                required={true}
                                inputName={'client_phone'}
                                inputID={'client_phone'}
                                onChangeHandler={formik.handleChange}
                                onBlurHandler={formik.handleBlur}
                                value={formik.values.client_phone}
                                error={formik.errors.client_phone}
                                touched={formik.touched.client_phone}
                            />

                            <div className='col-span-2'>
                                <Sectionheading heading={t('selectBuyRequest')} />
                            </div>

                            <div className='radio-btns col-span-2 my-2 flex flex-row gap-2'>
                                <div
                                    className={`flex justify-center items-center w-full p-2 rounded cursor-pointer ${selectedValue === 'تمويل' ? 'bg-mainRedColor text-white' : 'bg-gray-200'}`}
                                    onClick={() => { handleSelect('تمويل'); formik.setFieldValue('request_type', 'تمويل'); }}
                                >
                                    <input
                                        type="radio"
                                        id="funds"
                                        name="request_type"
                                        value="تمويل"
                                        checked={selectedValue === 'تمويل'}
                                        onChange={() => handleSelect('تمويل')}

                                        className="hidden" // إخفاء عنصر الـ radio الافتراضي
                                    />
                                    <label htmlFor="funds" className="ml-2 cursor-pointer">{t('fundsSelect')}</label>
                                </div>

                                <div
                                    className={`flex justify-center items-center w-full p-2 rounded cursor-pointer ${selectedValue === 'كاش' ? 'bg-mainRedColor text-white' : 'bg-gray-200'}`}
                                    onClick={() => { handleSelect('كاش'); formik.setFieldValue('request_type', 'كاش'); }}
                                >
                                    <input
                                        type="radio"
                                        id="cash"
                                        name="request_type"
                                        value="كاش"
                                        checked={selectedValue === 'كاش'}
                                        onChange={() => handleSelect('كاش')}
                                        className="hidden"
                                    />
                                    <label htmlFor="cash" className="ml-2 cursor-pointer">{t('cashSelect')}</label>
                                </div>

                            </div>

                            {
                                selectedValue === 'تمويل' && <div className='col-span-2 flex flex-row gap-2'>
                                    <InputComponent labelInputID={'monthly_salary'} inputLabel={t('labelFormonthlySalary')} inputType={'text'} inputPlaceHolder={t('placeholderforMonthlySalary')} inputName={'monthly_salary'} inputID={'monthly_salary'} width={'w-full'} onChangeHandler={formik.handleChange} onBlurHandler={formik.handleBlur} value={formik.values.monthly_salary} error={formik.errors.monthly_salary} touched={formik.touched.monthly_salary} />
                                    <InputComponent labelInputID={'monthly_commitment'} inputLabel={t('labelForMonthlyCommitment')} inputType={'text'} inputPlaceHolder={t('placeholderforMonthlyCommitment')} inputName={'monthly_commitment'} inputID={'monthly_commitment'} width={'w-full'} onChangeHandler={formik.handleChange} onBlurHandler={formik.handleBlur} value={formik.values.monthly_commitment} error={formik.errors.monthly_commitment} touched={formik.touched.monthly_commitment} />
                                </div>
                            }


                            <div className='col-span-2'>
                                <Sectionheading heading={t('buyNowNotes')} />
                            </div>


                            <div className='input-card flex flex-col gap-2 col-span-2'>
                                <InputComponent labelInputID={'message_request'} inputLabel={t('labelForNotes')} inputType={'text'} inputPlaceHolder={t('placeholderfornotes')} inputName={'message_request'} inputID={'message_request'} width={'w-full'} height={'h-14'} onChangeHandler={formik.handleChange} onBlurHandler={formik.handleBlur} value={formik.values.message_request} error={formik.errors.message_request} touched={formik.touched.message_request} />
                            </div>

                            <hr className="col-span-2 bg-gray-300 my-4" />


                            <div className="w-full col-span-2 flex justify-center">
                                <button className='w-full border bg-red-600 text-white  font-bold flex justify-center items-center px-12 py-4 rounded outline-none hover:bg-mainRedColor transition-all duration-100' type='submit'>{t('confirm')}</button>
                            </div>

                        </div>

                        <div className='flex justify-center items-center w-full h-full'>
                            {
                                selectedModel ? <img src={selectedModel.car_main_image.full_path} alt="" className='w-full h-full object-cover' /> : <img src={carGuess} alt="" className='w-full h-full object-cover' />
                            }

                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default AskBuyForMember;