// Import React Package
import { useTranslation } from "react-i18next";
import Aos from "aos";
import { Helmet } from "react-helmet-async";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
// End

// Import Assets / Images
import sedan from "../images/cars/carsType/sedan.png";
import commerical from "../images/cars/carsType/commerical.png";
import suv from "../images/cars/carsType/suv.png";
import error404 from "../images/404.png";
// End

// Import Components
import SearchInput from "./SearchInput";
import Sectionheading from "./SectionHeading";
import BreadCrump from "./BreadCrump";
// End

// Import Css Files
import "aos/dist/aos.css";
import CarTypeComponenet from "./CarTypeComponent";
import Loading from "./Loading";
// End

function BrandCars() {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.webLanguage);
  let [carBrandTypes, setCarBrandTypes] = useState([]);
  let [loading, setLoading] = useState(true); // حالة التحميل
  let location = useLocation();
  let { brand_name } = useParams();
  const { brand_uuid } = location.state || {};

  useEffect(() => {
    Aos.init({
      duration: 3000,
      delay: 200,
      once: true,
    });
  }, []);

  useEffect(() => {
    async function getCarBrandTypes() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/v1/brands/${brand_uuid}`
        );
        setCarBrandTypes(res.data.data);
      } catch (error) {
        console.error("Error fetching car brand types:", error);
      } finally {
        setLoading(false); // انتهى التحميل
      }
    }

    getCarBrandTypes();
  }, [brand_uuid]);

  if (loading) {
    return (
     <Loading/>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="brand-cars-container w-full">
        <Sectionheading heading={t("filterCarTypesOfBrand")} />

        {carBrandTypes.length === 0 ? (
          // إذا كانت المصفوفة فارغة، سيتم عرض صورة الـ 404
          <div className="flex flex-col justify-center items-center gap-8 my-4">
            <img src={error404} alt="Error 404" className="w-3/4" />
            <p className="font-black text-2xl">{t('error404NotCarsForBrand')}</p>
          </div>
        ) : (
          // إذا كانت المصفوفة غير فارغة، سيتم عرض الـ car types
          <div className="brand-cars w-full sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-2 my-4">
            {carBrandTypes.map((vehicleType , index) => (
              <CarTypeComponenet
                key={index} // تأكد من وضع مفتاح فريد
                carTypeImage={vehicleType.car_brand_type_image_path}
                carTypeTitle={
                  lang === "en"
                    ? vehicleType.car_brand_type_name_en
                    : vehicleType.car_brand_type_name_ar
                }
                brandId={brand_uuid}
                brand_type_id={vehicleType.uuid}
                brandName={brand_name}
                carType={vehicleType.car_brand_type_name_en}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BrandCars;
