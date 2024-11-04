
// Import React Package
import { useTranslation } from 'react-i18next'
import Aos from 'aos';
import { Helmet } from 'react-helmet-async';
import { InfinitySpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState } from 'react';
// End

// Import Assets / Images
import toyota from '../images/Brands/toyota.png';
import kia from '../images/Brands/Kia.png';
import hyundai from '../images/Brands/Hyundai.png';
// End

// Import Componets 
import SearchInput from "./SearchInput";
import Sectionheading from './SectionHeading';
import { fetechAllCarBrands } from '../rtk/slicers/carBrandsSlicer';
import BrandCard from './BrandCard';
// End

// Import Css Files
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import BreadCrump from './BreadCrump';
import Loading from './Loading';

// End



function Brands() {
    const { t } = useTranslation();
    const lang = useSelector(state => state.webLanguage);
    const { brands, status, error } = useSelector(state => state.carBrands);
    const dispatch = useDispatch();
    
    // حالات لإدارة البحث وعدد العناصر
    const [searchQuery, setSearchQuery] = useState(''); // لإدارة نص البحث
    const [visibleBrandsCount, setVisibleBrandsCount] = useState(7);

    // تحميل جميع الماركات عند التحميل الأول
    useEffect(() => {
        dispatch(fetechAllCarBrands());
    }, []);

    // إعداد مكتبة AOS للتأثيرات
    useEffect(()=>{
        Aos.init({
            duration:3000,
            delay: 200,
            once: true
        })
    } , []);

    // دالة لزيادة عدد العناصر المعروضة
    const loadMoreBrands = () => {
        setVisibleBrandsCount(prevCount => prevCount + 7);
    };

    // دالة للتعامل مع تغيير قيمة البحث
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase()); // تحديث البحث (تحويل النص إلى أحرف صغيرة)
    };

    // تصفية الماركات بناءً على البحث
    const filteredBrands = brands.filter((brand) => 
        brand.car_brand_name_ar.toLowerCase().includes(searchQuery) || 
        brand.car_brand_name_en.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>{lang === 'en' ? 'DJ-MOTORS | CARS' : 'دي جي موتورز | السيارات'}</title>
            </Helmet>

            
            <BreadCrump mainPageUrl={'/'} mainPage={t('home')} cuurentPageUrl={'/brands'} cuurentPage={t('brands')} searchComponent={ <SearchInput 
                    placeHolder={t('searchPlaceHolder')} 
                    onSearchChange={handleSearchChange} // تمرير الدالة لتحديث قيمة البحث
                    />}
            />

           
            
            

            <Sectionheading heading={t('BrandsHeadingInBrands')} />

            <div className="brands-container" data-aos="fade">
                <div className="brands sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto my-4 flex flex-row flex-wrap justify-center gap-4"  >
                    {status === 'loading' ? (
                       <Loading/>
                    ) : (
                        filteredBrands.slice(0, visibleBrandsCount).map((brand , index) => (
                            <BrandCard 
                                key={brand.index}
                                brand={brand}
                                image={brand.car_brand_image_path}
                                lang={lang}
                                brand_uuid={brand.uuid}
                                brand_name_ar={brand.car_brand_name_ar}
                                brand_name_en={brand.car_brand_name_en}
                            />
                        ))
                    )}
                </div>

                {/* إظهار الزر إذا كان هناك المزيد من العناصر */}
                {(visibleBrandsCount < filteredBrands.length) & (status !== 'loading') ? (
                    <div className="flex justify-center my-4">
                        <button 
                            onClick={loadMoreBrands} 
                            className="bg-transparent text-mainRedColor border border-mainRedColor py-2 px-4 rounded hover:bg-mainRedColor hover:text-white"
                        >
                            {t('LoadMore')} {/* يمكنك تغيير النص ليكون ديناميكيًا */}
                        </button>
                    </div>
                ) : 
                null}
            </div>
        </div>
    );
}

export default Brands;
