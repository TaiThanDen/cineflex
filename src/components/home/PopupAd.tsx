
const PopupAd = ({
                     image,
                     link,
                     open,
                     onClose,
                 }: {
    image: string;
    link: string;
    open: boolean;
    onClose: () => void;
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="relative w-[90%] max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-1 right-1 z-10 bg-black/60 text-white rounded-full p-1 hover:bg-black"
                >
                    ✕
                </button>
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <img
                        src={image}
                        alt="Popup Ad"
                        className="w-full rounded-md shadow-xl"
                    />
                </a>
            </div>
        </div>
    );
};

export default PopupAd;
