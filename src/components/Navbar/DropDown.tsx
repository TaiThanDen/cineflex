import { useState, useRef, useEffect, type ReactNode } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";

interface FilterOptions {
    genres: string[];
    country: string;
    ageRating: string;
    movieType: string;
    releaseYear: string;
}

interface Item {
    label: ReactNode;
    path: string;
}

interface Props {
    items?: Item[];
    path?: string;
    children: ReactNode;
}

const DropDown = ({ items, path, children }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [alignRight, setAlignRight] = useState(false); // true = dính mép phải của nút
    const [placeAbove, setPlaceAbove] = useState(false); // true = bật lên trên thay vì xuống dưới

    const [filters, setFilters] = useState<FilterOptions>({
        genres: [],
        country: "",
        ageRating: "",
        movieType: "",
        releaseYear: ""
    });

    const dropdownRef = useRef<HTMLLIElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const genres = [
        "Hành động", "Phiêu lưu", "Hài hước", "Kinh dị", "Lãng mạn",
        "Khoa học viễn tưởng", "Thriller", "Drama", "Hoạt hình", "Tài liệu"
    ];
    const countries = ["Việt Nam", "Hàn Quốc", "Nhật Bản", "Trung Quốc", "Thái Lan", "Mỹ", "Anh", "Pháp", "Đức", "Ấn Độ"];
    const ageRatings = ["G", "PG", "PG-13", "R", "NC-17", "18+"];
    const movieTypes = ["Phim lẻ", "Phim bộ"];
    const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

    // --- Auto position ---------------------------------------------------------
    const computePosition = () => {
        const anchor = dropdownRef.current;
        const panel = panelRef.current;
        if (!anchor || !panel) return;

        const a = anchor.getBoundingClientRect();

        // Tạm thời hiện panel để đo nếu đang invisible nhưng isOpen = true
        const prevVisibility = panel.style.visibility;
        if (!isOpen) panel.style.visibility = "hidden"; // không đo khi đóng
        else panel.style.visibility = "hidden"; // giữ layout nhưng không thấy
        panel.classList.remove("invisible");

        // Đo xong mới trả lại
        requestAnimationFrame(() => {
            const p = panel.getBoundingClientRect();
            const margin = 8; // khoảng cách an toàn với mép viewport

            const needRight = a.left + p.width > window.innerWidth - margin;
            const needAbove = a.bottom + p.height > window.innerHeight - margin;

            setAlignRight(needRight);
            setPlaceAbove(needAbove);

            // trả lại trạng thái hiển thị như cũ
            if (!isOpen) {
                panel.style.visibility = prevVisibility;
                panel.classList.add("invisible");
            } else {
                panel.style.visibility = "";
            }
        });
    };

    // Recompute khi mở panel
    useEffect(() => {
        if (!isOpen) return;
        computePosition();

        const handler = () => computePosition();
        window.addEventListener("resize", handler);
        // dùng capture để bắt scroll ở mọi container (sidebar, body, v.v.)
        window.addEventListener("scroll", handler, true);

        return () => {
            window.removeEventListener("resize", handler);
            window.removeEventListener("scroll", handler, true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    // Recompute khi nội dung thay đổi (lọc nhiều -> panel cao hơn)
    useEffect(() => {
        if (isOpen) computePosition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    // Đóng khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Đóng bằng phím Esc
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    // --- Filter handlers -------------------------------------------------------
    const handleGenreChange = (genre: string) => {
        setFilters(prev => ({
            ...prev,
            genres: prev.genres.includes(genre)
                ? prev.genres.filter(g => g !== genre)
                : [...prev.genres, genre]
        }));
    };

    const handleFilterChange = (key: keyof FilterOptions, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({ genres: [], country: "", ageRating: "", movieType: "", releaseYear: "" });
    };

    const applyFilters = () => {
        const queryParams = new URLSearchParams();
        if (filters.genres.length > 0) queryParams.set("genres", filters.genres.join(","));
        if (filters.country) queryParams.set("country", filters.country);
        if (filters.ageRating) queryParams.set("age", filters.ageRating);
        if (filters.movieType) queryParams.set("type", filters.movieType);
        if (filters.releaseYear) queryParams.set("year", filters.releaseYear);

        navigate(`/filter?${queryParams.toString()}`);
        setIsOpen(false);
    };

    const hasActiveFilters =
        filters.genres.length > 0 ||
        !!filters.country ||
        !!filters.ageRating ||
        !!filters.movieType ||
        !!filters.releaseYear;

    return (
        <li className="my-5 relative" ref={dropdownRef}>
            <span className="relative h-full text-white">
                <button
                    type="button"
                    onClick={() => setIsOpen(v => !v)}
                    className={`flex lg:w-auto w-full items-center opacity-100 transition-colors cursor-pointer ${hasActiveFilters ? "text-purple-600" : "text-white"}`}
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                >
                    <span className="lg:flex-none flex-1 items-start flex font-bold text-nowrap overflow-x-hidden">
                        {children}
                        {hasActiveFilters && <span className="ml-1 text-xs">•</span>}
                    </span>
                    <FaChevronDown className={`w-4 h-4 lg:flex-none flex-[0.2] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
            </span>

            {/* Panel */}
            <div
                ref={panelRef}
                className={[
                    "absolute mt-2",
                    placeAbove ? "bottom-full mb-2" : "top-full",
                    alignRight ? "right-0 left-auto" : "left-0 right-auto",
                    "w-[min(90vw,32rem)]",
                    "max-h-[min(70vh,28rem)] overflow-y-auto",
                    "bg-[#2f3147] border border-gray-600 rounded-lg shadow-xl z-50",
                    "transition-all duration-200",
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                ].join(" ")}
                role="menu"
                aria-label="Bộ lọc phim"
            >
                <div className="p-4">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-600">
                        <h3 className="text-white font-semibold">Bộ lọc phim</h3>
                        <button
                            onClick={clearFilters}
                            className="text-gray-400 hover:text-white text-sm flex items-center gap-1"
                        >
                            <FaTimes className="w-3 h-3" />
                            Xóa tất cả
                        </button>
                    </div>

                    {/* Thể loại */}
                    <div className="mb-4">
                        <h4 className="text-white font-medium mb-2">Thể loại</h4>
                        <div className="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto">
                            {genres.map((genre) => (
                                <label key={genre} className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filters.genres.includes(genre)}
                                        onChange={() => handleGenreChange(genre)}
                                        className="mr-2 rounded bg-gray-700 border-gray-600 text-purple-600"
                                    />
                                    {genre}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Quốc gia */}
                    <div className="mb-4">
                        <h4 className="text-white font-medium mb-2">Quốc gia</h4>
                        <select
                            value={filters.country}
                            onChange={(e) => handleFilterChange("country", e.target.value)}
                            className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm"
                        >
                            <option value="">Tất cả quốc gia</option>
                            {countries.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>

                    {/* Độ tuổi */}
                    <div className="mb-4">
                        <h4 className="text-white font-medium mb-2">Độ tuổi</h4>
                        <select
                            value={filters.ageRating}
                            onChange={(e) => handleFilterChange("ageRating", e.target.value)}
                            className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm"
                        >
                            <option value="">Tất cả độ tuổi</option>
                            {ageRatings.map((rating) => (
                                <option key={rating} value={rating}>{rating}</option>
                            ))}
                        </select>
                    </div>

                    {/* Loại phim */}
                    <div className="mb-4">
                        <h4 className="text-white font-medium mb-2">Loại phim</h4>
                        <div className="flex gap-2">
                            {movieTypes.map((type) => (
                                <label key={type} className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
                                    <input
                                        type="radio"
                                        name="movieType"
                                        value={type}
                                        checked={filters.movieType === type}
                                        onChange={(e) => handleFilterChange("movieType", e.target.value)}
                                        className="mr-2"
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Năm phát hành */}
                    <div className="mb-4">
                        <h4 className="text-white font-medium mb-2">Năm phát hành</h4>
                        <select
                            value={filters.releaseYear}
                            onChange={(e) => handleFilterChange("releaseYear", e.target.value)}
                            className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm"
                        >
                            <option value="">Tất cả năm</option>
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    {/* Nút áp dụng */}
                    <button
                        onClick={applyFilters}
                        className="w-full bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                        Áp dụng bộ lọc
                    </button>
                </div>
            </div>
        </li>
    );
};

export default DropDown;
