import { useTranslation } from 'react-i18next';
import Aos from 'aos';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import axios from 'axios';

import tuscon from '../images/cars/tuscon.png';
import corolla from '../images/cars/toyota.png';
import star from '../images/stars.png';

import Sectionheading from './SectionHeading';
import RecentCarCard from './RecentCarCard';
import InputComponent from './InputComponent';
import Loading from './Loading';

import 'aos/dist/aos.css';

function OfferDetailsPage() {
    const { t } = useTranslation();
    const lang = useSelector(state => state.webLanguage);
    const { pathname } = useLocation();

    const [offerId, setOfferId] = useState(undefined);
    const [offer, setOffer] = useState(null);

    useEffect(() => {
        const uuid = pathname.split('/').slice(-1)[0];
        setOfferId(uuid);
    }, [pathname]);

    useEffect(() => {
        Aos.init({ duration: 3000, delay: 300, once: true });
    }, []);

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/v1/offers/${offerId}`);
                setOffer(res.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (offerId) fetchOffer();
    }, [offerId]);

    const CommitmentOptions = [
        { label: lang === 'en' ? 'personal' : 'شخصي',
          value: lang === 'en' ? 'personal' : 'شخصي' 
        },
        { label: lang === 'en' ? 'real estate' : 'عقاري',
          value: lang === 'en' ? 'real estate' : 'عقاري' 
        },
    ];

    const CarIncludedOptions = [
        { label: lang === 'en' ? 'Toyota Corolla 2024' : 'تويوتا كورولا 2024', value: '1' },
        { label: lang === 'en' ? 'Hyundai Tuscon 2024' : 'هيونداي توسان 2024', value: '2' },
    ];


    const offerRequestSchema = Yup.object({
        client_name: Yup.string().required(t('client_name_required_validation')),
        client_email: Yup.string().email(t('email_valid_validation')),
        client_phone: Yup.string().matches(/^5[0-9]+$/, t('phone_valid_validation')).required(t('phone_required_validation')),
        monthly_salary: Yup.number(),
        monthly_commitment: Yup.number(),
        commitment_type: Yup.string().oneOf(['شخصي', 'عقاري', 'personal', 'real estate']),
    });
    useEffect(()=>{
        formik.setFieldValue('offer_id' , offerId)
    } , [offerId])
    const formik = useFormik({
        initialValues: {
            client_name: '',
            client_email: '',
            client_phone: '',
            monthly_salary: '',
            monthly_commitment: '',
            commitment_type: '',
            
        },
        validationSchema: offerRequestSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                console.log(`Offer Request Form : ${values}` )
                const response = await axios.post('http://127.0.0.1:8000/api/v1/offers-request', values);
                Swal.fire({
                    title: t('titleOfSuccessAskBuyRequestMsg'),
                    icon: 'success',
                    confirmButtonText: 'حسناً'
                });
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
    if (!offer) {
        return <Loading />;
    }
    
    return (
        <div className="min-h-screen">
            <Helmet>
                <title>{lang === 'en' ? 'DJ-MOTORS | Offers' : 'دي جي موتورز | تفاصيل العرض '}</title>
            </Helmet>

            <div className="offer-details-container">
                <Sectionheading heading={t('offersDetailsHeading')} />

                <div
                    className="offer-image w-full sm:h-[30rem] h-40 my-4 bg-slate-300"
                    style={{
                        backgroundImage: `url(${offer.offer_image?.full_path})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />

                <div className="offer-details sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto">
                    <div className="w-full flex flex-col justify-center items-center gap-4 my-4 p-4">
                        <div className='w-full flex flex-col'>
                            <div className="offer-title flex flex-col justify-center items-center bg-mainRedColor rounded-md p-4 text-white">
                                <p className="text-2xl font-bold">{lang === 'en' ? offer.offer_title_en : offer.offer_title_ar}</p>
                            </div>

                            <div className="offer-description flex flex-col gap-4 bg-slate-50 shadow-md rounded-md p-4">
                                <p className='text-sm font-black'>{lang === 'en' ? offer.offer_description_en : offer.offer_description_ar}</p>
                                <ul className='flex flex-col gap-4'>
                                    {(lang === 'en' ? offer.offer_detail_title_en : offer.offer_detail_title_ar).map((detail, index) => (
                                        <li key={index} className='flex flex-row gap-2 items-center'>
                                            <span><img src={star} alt="" className='w-4' /></span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {offer.offer_type === 'عروض تمويل' && (
                            <div className="w-full bg-slate-50 shadow-md rounded-md p-4 overflow-x-auto">
                                <Sectionheading heading={t('fundsDetailHeading')} />
                                <table className="table-auto w-full text-center">
                                    <thead className="bg-mainRedColor text-white">
                                        <tr>
                                            <th className="p-4">{t('monthly_installment')}</th>
                                            <th className="p-4">{t('administrative_fees')}</th>
                                            <th className="p-4">{t('funding_period')}</th>
                                            <th className="p-4">{t('Annual_percentage_rate')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {offer.offer_funds_details.map((row, index) => (
                                            <tr key={index} className="border-b border-gray-200">
                                                <td className="p-4">{`${row.monthly_installment} ${t('pricemeasure')}`}</td>
                                                <td className="p-4">{`${row.administrative_fees} %`}</td>
                                                <td className="p-4">{`${row.funding_period} ${t('funding_periodYears')}`}</td>
                                                <td className="p-4">{`${row.Annual_percentage_rate} %`}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <Sectionheading heading={t('offersDetailsCarsIncludedHeading')} />
                        <div className="offer-included-cars w-full flex sm:flex-row flex-col justify-center items-center gap-4 bg-slate-50 shadow-md rounded-md p-4">
                            <RecentCarCard carName="HYUNDAI TUSCON 2024" gearBox="أوتوماتيك" engineCapacity="1.5 لتر" carImage={tuscon} carPrice="12690" carFinance="16500" />
                            <RecentCarCard carName="Toyota Corolla 2024" gearBox="أوتوماتيك" engineCapacity="1.5 لتر" carImage={corolla} carPrice="18500" carFinance="19500" />
                        </div>

                        <Sectionheading heading={t('offersDetailsAskOfferHeading')} />
                        <form className='w-full' onSubmit={formik.handleSubmit} method='POST'>
                            <div className="offer-ask-form w-full grid sm:grid-cols-2 gap-4 bg-slate-50 shadow-md rounded-md p-4">
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
                                    inputType={'email'}
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

                                {offer.offer_type === 'عروض تمويل' && (
                                    <>
                                        <InputComponent
                                            labelInputID="monthly_salary"
                                            inputLabel={t('labelFormonthlySalary')}
                                            inputType="string"
                                            inputPlaceHolder={t('placeholderformonthlySalary')}
                                            required={true}
                                            inputName="monthly_salary"
                                            inputID="monthly_salary"
                                            onChangeHandler={formik.handleChange}
                                            onBlurHandler={formik.handleBlur}
                                            value={formik.values.monthly_salary}
                                            error={formik.errors.monthly_salary}
                                            touched={formik.touched.monthly_salary}
                                        />
                                        <InputComponent
                                            labelInputID="monthly_commitment"
                                            inputLabel={t('labelForMonthlyCommitment')}
                                            inputType="string"
                                            inputPlaceHolder={t('placeholderforMonthlyCommitment')}
                                            required={true}
                                            inputName="monthly_commitment"
                                            inputID="monthly_commitment"
                                            onChangeHandler={formik.handleChange}
                                            onBlurHandler={formik.handleBlur}
                                            value={formik.values.monthly_commitment}
                                            error={formik.errors.monthly_commitment}
                                            touched={formik.touched.monthly_commitment}
                                        />
                                        <div className="flex flex-col lg:col-span-1 col-span-2 gap-2">
                                            <label htmlFor="commitment_type" className="font-bold text-sm text-gray-700">{t('labelForCommitmentType')}</label>
                                            <Select
                                                options={CommitmentOptions}
                                                placeholder={t('placeHolderForChooseCommitment')}
                                                onChange={option => formik.setFieldValue('commitment_type', option.value)}
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="flex flex-col lg:col-span-1 col-span-2 gap-2">
                                    <label htmlFor="car_included_offer" className="font-bold text-sm text-gray-700">{t('labelForCarIncludedOffer')}</label>
                                    <Select
                                        options={CarIncludedOptions}
                                        placeholder={t('placeHolderForCarIncludedOffer')}
                                    />
                                </div>

                                <div className="flex col-span-2 justify-end">
                                    <button className="bg-transparent text-mainRedColor border border-mainRedColor py-2 px-4 rounded hover:bg-mainRedColor hover:text-white" type='submit'>
                                        {t('confirmBuyNow')}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfferDetailsPage;
