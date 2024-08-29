import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            {/* footer  */}
            <footer className="text-gray-600 body-font bg-[#0a2540]">
                {/* main  */}
                <div className="container px-3 py-3 mx-auto flex items-center sm:flex-row flex-col">
                    {/* logo  */}
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                        <span className="text-xl font-bold">ReSort-It</span>
                    </a>
                    {/* para  */}
                    <p className="text-sm text-gray-100 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
                        © 2024 resort-it —
                        <Link
                        to={'/'}
                            className="text-gray-100 ml-1"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            @resort-it
                        </Link>
                    </p>
                    
                    
                </div>
            </footer>
        </div>
    );
}

export default Footer;