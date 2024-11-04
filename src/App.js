import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Suspense, useEffect } from "react";
import i18n from "./i18n";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import { lazy } from 'react';




  // Home Lazy Component
  const Home = lazy(()=>import('./components/Home'))
  // Brands Lazy Component
  const Brands = lazy(()=>import('./components/Brands'))
  // BuyNow Lazy Component
  const BuyNowComponent = lazy(()=>import('./components/BuyNowComponent'))
  // AskBuyForMember Lazy Component
  const AskBuyForMember = lazy(()=>import('./components/AskBuyForMembers'))
  // AskBuyForCompanies Lazy Component
  const AskBuyForCompanies = lazy(()=>import('./components/AskBuyForCompanies'))
  // About Company Lazy Component
  const AboutCompany = lazy(()=>import('./components/AboutCompany'))
  // Contact With Sales Team
  const ContactWithSalesTeam = lazy(()=>import('./components/ContactWithSalesTeam'));
  // Contact With Inquiry
  const ContactForInquery = lazy(()=>import('./components/ContactForInquery'));
  // Contact With Inquiry
  const ContactForComplaint = lazy(()=>import('./components/ContactForComplaint'));
  // Offers 
  const OfferNavigation = lazy(()=>import('./components/OfferNavigation'));
  // Cash Offers 
  const CashOffer = lazy(()=>import('./components/Offers'));
  // Funds Offers 
  const FundsOffer = lazy(()=>import('./components/Offers'));
  // book maintenance 
  const BookMaintenanceAppointment = lazy(()=>import('./components/BookMaintenanceAppointment'));
  // Offer Details Page
  const OfferDetailsPage = lazy(()=>import('./components/OfferDetailsPage'));
  // brands cars
  const BrandCars = lazy(()=>import('./components/BrandCars'));
  // Cars Show Room
  const ShowRoom = lazy(()=>import('./components/CarsShowRoom'));
  // Cars Show Room
  const CarShow = lazy(()=>import('./components/CarShow'));
  // Services 
  const Services = lazy(()=>import('./components/Services'));
  // Clients Reviews
  const ClientsReviews = lazy(()=>import('./components/ClientsReviews'));
  // SpareParts
  const SpareParts = lazy(()=>import('./components/SpareParts'));
  // SpareParts Store
  const SparePartsStore = lazy(()=>import('./components/SparePartsStore'));
  // Compare Cars
  const CompareCars = lazy(()=>import('./components/CompareCars'));
  // TERMS AND CONDITIONS
  const TermsAndConditions = lazy(()=>import('./components/TermsAndConditions'));
  // TERMS AND CONDITIONS
  const HelpClient = lazy(()=>import('./components/HelpClient'));


function App() {
  // Current Language From Store 
  const lang = useSelector(state=>state.webLanguage);


  useEffect(() => {
    // Set the initial direction
    window.document.dir = i18n.dir();

    // Listen for language changes and update the direction dynamically
    const handleLanguageChange = (lng) => {
      window.document.dir = i18n.dir(lng);
    };

    // Attach the language change listener
    i18n.on('languageChanged', handleLanguageChange);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  useEffect(()=>{
    document.body.className = lang === 'en' ? 'font-custom' : 'font-arabic';
  } , [lang])

  
  return (
    <div className="App relative">
      <ScrollToTop/>
      <Header />
      
      <Routes>

      <Route path='/' element={
        <Suspense fallback={ <Loading/>}>
                          <Home/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/about' element={
        <Suspense fallback={ <Loading/>}>
                          <AboutCompany/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/help-client' element={
        <Suspense fallback={ <Loading/>}>
                          <HelpClient/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/contact-with-sales' element={
        <Suspense fallback={ <Loading/>}>
                          <ContactWithSalesTeam/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/contact-for-complaint' element={
        <Suspense fallback={ <Loading/>}>
                          <ContactForComplaint/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/contact-for-inquery' element={
        <Suspense fallback={ <Loading/>}>
                          <ContactForInquery/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/offers' element={
        <Suspense fallback={ <Loading/>}>
                          <OfferNavigation/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/offers/cash' element={
        <Suspense fallback={ <Loading/>}>
                          <CashOffer/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/offers/funds' element={
        <Suspense fallback={ <Loading/>}>
                          <FundsOffer/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/offers/:offer_id' element={
        <Suspense fallback={ <Loading/>}>
                          <OfferDetailsPage/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/book-maintenance-appointment' element={
        <Suspense fallback={ <Loading/>}>
                          <BookMaintenanceAppointment/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/brands/:brand_name' element={
        <Suspense fallback={ <Loading/>}>
                          <BrandCars/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/brands/:brand_name/:car_type' element={
        <Suspense fallback={ <Loading/>}>
                          <ShowRoom/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/brands/:brand_name/:car_type/:car_model' element={
        <Suspense fallback={ <Loading/>}>
                          <CarShow/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/services' element={
        <Suspense fallback={ <Loading/>}>
                          <Services/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/clients-reviews' element={
        <Suspense fallback={ <Loading/>}>
                          <ClientsReviews/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/spare-parts' element={
        <Suspense fallback={ <Loading/>}>
                          <SpareParts/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/spare-parts/store' element={
        <Suspense fallback={ <Loading/>}>
                          <SparePartsStore/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/compare-cars' element={
        <Suspense fallback={ <Loading/>}>
                          <CompareCars/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/terms-conditions' element={
        <Suspense fallback={ <Loading/>}>
                          <TermsAndConditions/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/brands' element={
        <Suspense fallback={ <Loading/>}>
                          <Brands/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/buy-now' element={
        <Suspense fallback={ <Loading/>}>
                          <BuyNowComponent/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/buy-now/buy-now-members' element={
        <Suspense fallback={ <Loading/>}>
                          <AskBuyForMember/>  
        </Suspense>
                      
                      }>
      </Route>
      <Route path='/buy-now/buy-now-companies' element={
        <Suspense fallback={ <Loading/>}>
                          <AskBuyForCompanies/>  
        </Suspense>
                      
                      }>
      </Route>
        
       
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
