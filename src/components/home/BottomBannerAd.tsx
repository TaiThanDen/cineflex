import { useState } from "react";

const BottomBannerAd = ({
                            image,
                            link,
                        }: {
    image: string;
    link: string;
}) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 w-[90%] max-w-screen-md">
            <div className="relative">
                <button
                    onClick={() => setVisible(false)}
                    className="absolute top-1 right-1 z-10 bg-black/60 text-white rounded-full p-1 hover:bg-black"
                >
                    ✕
                </button>
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <img
                        src={image}
                        alt="Bottom Banner Ad"
                        className="w-full max-h-[100px] object-contain rounded-md shadow-lg"
                    />
                </a>
            </div>
        </div>
    );
};

export default BottomBannerAd;
