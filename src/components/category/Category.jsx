import { useNavigate } from "react-router";
import PlasticScrap from '../../assets/plasticscrap.jpg'
import PaperScrap from '../../assets/paperscrap.jpg'
import MetalScrap from '../../assets/metalscrap.jpg'


// category 
const category = [
    {
        image: PlasticScrap,
        name: "plastic"
    },
    {
        image: PaperScrap,
        name: "paper"
    },
    {
        image: MetalScrap,
        name: "metal"
    },
];

const Category = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center mt-5 px-4 h-[50vh] pt-4 bg-gray-50">
            <h1 className="text-center text-[#00a99d] text-3xl font-bold mb-4">Browse Various Recyclable Products !</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full w-[75%] ">
                {category.map((item, index) => {
                    return (
                        <div 
                            key={index} 
                            className="w-full  h-76 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 cursor-pointer  hover:shadow-xl bg-gray-200 hover:bg-[#1f6863] hover:text-white" 
                            onClick={() => navigate(`/category/${item.name}`)}
                        >
                            <img className="w-full h-56 object-cover" src={item.image} alt="item" />
                            <div className="px-6 py-4">
                                <h1 className="text-2xl font-semibold  text-center uppercase ">{item.name}</h1>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* style  */}
            <style dangerouslySetInnerHTML={{ __html: "\n.hide-scroll-bar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.hide-scroll-bar::-webkit-scrollbar {\n  display: none;\n}\n" }} />
        
        </div>
    );
}

export default Category;
