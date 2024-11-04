
// Import React Package
import { useTranslation } from 'react-i18next'
import Aos from 'aos';
import { Helmet } from 'react-helmet-async';
import { InfinitySpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import Swal from 'sweetalert2';
// End

// Import Assets / Images
import djCallCenter from '../images/djCallCenter.svg'
// End

// Import Componets 
import Sectionheading from './SectionHeading';
import InputComponent from './InputComponent';

// End

// Import Css Files
import 'aos/dist/aos.css';
import '../css/aboutCompany.css';


// End

function ContactForInquery() {

    const {t}= useTranslation();
    const lang = useSelector(state=>state.webLanguage);

    const contactValidationSchema = yup.object({
        first_name: yup.string().required(t('first_name_required_validation')),
        last_name: yup.string().required(t('last_name_required_validation')),
        email: yup.string().email(t('email_valid_validation')),
        phone: yup.string().matches(/^5[0-9]+$/, t('phone_valid_validation')).required(t('phone_required_validation')),
        message_subject: yup.string().required(t('message_subject_required_validation')),
        message_body: yup.string().required(t('message_body_required_validation'))
    });

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            message_subject: '',
            message_body: ''
        }, 
        validationSchema: contactValidationSchema,
        onSubmit: async(values , {resetForm})=> {
           try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/inquery-requests' , values);
            Swal.fire({
                title: t('titleOfSuccessRequestMsg'),
                icon: 'success',
                confirmButtonText: 'حسناً'
            })
            console.log(`Api Response With : ` , response.data);
            resetForm();
           } catch (error) {
            console.error('Error submitting Form:', error.response?.data || error.message);
                Swal.fire({
                    title: t('titleOfErrorRequestMsg'),
                    icon: 'error',
                    confirmButtonText: 'حسناً'
                })
           }


        }
    })

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>{lang === 'en' ? 'DJ-MOTORS | Inqueries' : 'دي جي موتورز | الاستفسارات '}</title>
            </Helmet>

            <Sectionheading heading={t('ContactForInqueryHeading')} textSize={'lg:text-4xl text-3xl'} />

            <div className='sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto my-8'>
                <form action="" method='post' onSubmit={formik.handleSubmit}>
                    <div className='sm:grid sm:grid-cols-2 grid-cols-1 justify-center items-center gap-4'>
                        <div className='w-full flex flex-col gap-4 p-4 order-last'>
                            <InputComponent labelInputID={'first_name'} inputLabel={t('labelForFirstName')} inputType={'text'} inputPlaceHolder={t('placeholderforfirstname')} required={true} inputName={'first_name'} inputID={'first_name'} onChangeHandler={formik.handleChange} onBlurHandler={formik.handleBlur} value={formik.values.first_name} error={formik.errors.first_name} touched={formik.touched.first_name}/>
                            <InputComponent labelInputID={'last_name'} inputLabel={t('labelForLastName')} inputType={'text'} inputPlaceHolder={t('placeholderforlastname')} required={true} inputName={'last_name'} inputID={'last_name'} onChangeHandler={formik.handleChange} onBlurHandler={formik.handleBlur} value={formik.values.last_name} error={formik.errors.last_name} touched={formik.touched.last_name}/>
                            <InputComponent labelInputID={'email'} inputLabel={t('labelForEmail')} inputType={'email'} inputPlaceHolder={t('placeholderforemail')} required={false} inputName={'email'} inputID={'email'} onChangeHandler={formik.handleChange} onBlurHandler={formik.handleBlur} value={formik.values.email} error={formik.errors.email} touched={formik.touched.email}/>
                            <InputComponent labelInputID={'phone'} inputLabel={t('labelForPhone')} inputType={'text'} inputPlaceHolder={t('placeholderforphone')} required={true} inputName={'phone'} inputID={'phone'} onChangeHandler={formik.handleChange} onBlurHandler={formik.handleBlur} value={formik.values.phone} error={formik.errors.phone} touched={formik.touched.phone} maxLength={9}/>
                            <InputComponent labelInputID={'message_subject'} inputLabel={t('labelForMessageHeading')} inputType={'text'} inputPlaceHolder={t('placeholderformessage')} required={true} inputName={'message_subject'} inputID={'message_subject'} onChangeHandler={formik.handleChange} onBlurHandler={formik.handleBlur} value={formik.values.message_subject} error={formik.errors.message_subject} touched={formik.touched.message_subject}/>
                            <InputComponent labelInputID={'message_body'} inputLabel={t('labelForMessageSubject')} inputType={'text'} inputPlaceHolder={t('placeholderforsubjet')} required={true} inputName={'message_body'} inputID={'message_body'} onChangeHandler={formik.handleChange} onBlurHandler={formik.handleBlur} value={formik.values.message_body} error={formik.errors.message_body} touched={formik.touched.message_body}/>
                            <div className='flex '>
                                <button className='w-full border bg-red-600 text-white  font-bold flex justify-center items-center px-12 py-4 rounded outline-none hover:bg-mainRedColor transition-all duration-100' type='submit'>{t('confirm')}</button>
                            </div>
                        </div>
                        <div className='flex justify-center items-center'>
                            <img src={djCallCenter} alt="" className='w-3/4'/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactForInquery;