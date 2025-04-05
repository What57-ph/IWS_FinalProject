import Slider from "../../../components/client/Home/Slider";
import FilterCategories from "../../../components/client/Home/FilterCategories";

const HomePage = () => {
  return (
    <div className="max-w-screen-xl mx-[16px] lg:mx-[64px] xl:mx-auto">
      <Slider />
      <FilterCategories />
    </div>
  )
};
export default HomePage;
