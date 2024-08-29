import HeroSection from "../../components/heroSection/HeroSection";
import Category from '../../components/category/Category';
// import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import Testimonial from "../../components/testimonial/Testimonial";
import Task from "../task/Task";
import Gemini from "../gemini/Gemini";
import Message from "../message/Message";

const HomePage = () => {
  return (
    <div>
      <Layout>
      <HeroSection />
      <Gemini/>
      <Category />
      <Message />
      <br />
      {/* <Task /> */}
      <Testimonial />  
      </Layout>
    </div>
  )
}

export default HomePage
