import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import MovieGridModerator from "@/components/moderator/CommentManagermentCompoment/MovieGridModerator";
import MovieDetailModerator from "@/components/moderator/CommentManagermentCompoment/MovieDetailModerator";

const initialMovieData = [
    {
        id: "1",
        title: "Breaking Bad",
        poster:
            "https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.15752-9/495076856_689828353898141_1690583717271447443_n.png?stp=dst-png_s480x480&_nc_cat=110&ccb=1-7&_nc_sid=0024fc&_nc_ohc=N6JZt30xydcQ7kNvwFnFtPp&_nc_oc=AdmK1THskI1yed9b3rCzhTvJ1NJvcNbFehsnZPX66KlLPWW9Q8pWgQikisva3QAWGvuttMJMtHxWj8P7Ffbtbha7&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&oh=03_Q7cD2gGbnIzolMQfcJYTsLKnu_kLWjWB98Sh4aW2b6mMsu7HLg&oe=687251A4",
        seasons: [
            {
                seasonNumber: 1,
                episodes: [
                    {
                        id: "1",
                        name: "Pilot",
                        url: "https://cineflex.com/pilot",
                        duration: "58 phút",
                        comments: [
                            { user: "Minh", content: "Tập đầu quá cuốn, diễn xuất đỉnh thật!", time: "2025-06-13 19:00", status: "hiện" },
                            { user: "Lan", content: "Thấy hơi chậm nhưng setup tình huống ổn.", time: "2025-06-13 19:05", status: "ẩn" }
                        ],
                    },
                    {
                        id: "2",
                        name: "Cat's in the Bag...",
                        url: "https://cineflex.com/episode2",
                        duration: "48 phút",
                        comments: [
                            { user: "Nam", content: "Tập này gay cấn hơn nhiều!", time: "2025-06-13 19:10", status: "hiện" },
                            { user: "Hà", content: "Tình tiết bắt đầu hấp dẫn rồi.", time: "2025-06-13 19:15", status: "ẩn" }
                        ],
                    },
                ],
            },
            {
                seasonNumber: 2,
                episodes: [
                    {
                        id: "1",
                        name: "Seven Thirty-Seven",
                        url: "https://cineflex.com/breaking-bad/s2e1",
                        duration: "47 phút",
                        comments: [
                            { user: "Hùng", content: "Mở đầu mùa 2 căng thẳng thật.", time: "2025-06-13 19:20", status:"ẩn" },
                            { user: "Trúc", content: "Thích cách họ phát triển nhân vật Walter.", time: "2025-06-13 19:25", status: "hiện" }
                        ],
                    },
                    {
                        id: "2",
                        name: "Grilled",
                        url: "https://cineflex.com/breaking-bad/s2e2",
                        duration: "50 phút",
                        comments: [
                            { user: "An", content: "Tập này nghẹt thở luôn.", time: "2025-06-13 19:30", status: "hiện" },
                            { user: "Quân", content: "Combo hành động + tâm lý quá đỉnh!", time: "2025-06-13 19:35", status: "ẩn" }
                        ],
                    },
                ],
            },
        ],
        tags: ["Hành động", "Drama", "Crime"],
        description:
            "Walter White, a chemistry teacher, discovers he has cancer and resorts to making meth to secure his family's future.",
    },
    {
        id: "2",
        title: "Stranger Things",
        poster:
            "https://upload.wikimedia.org/wikipedia/vi/7/78/Stranger_Things_season_4.jpg",
        seasons: [
            {
                seasonNumber: 1,
                episodes: [
                    {
                        id: "1",
                        name: "The Vanishing of Will Byers",
                        url: "https://cineflex.com/stranger-things/s1e1",
                        duration: "47 phút",
                        comments: [
                            { user: "Linh", content: "Tập đầu mở ra nhiều bí ẩn hấp dẫn!", time: "2025-06-13 19:40", status: "hiện" },
                            { user: "Khoa", content: "Không khí rùng rợn nhưng cuốn.", time: "2025-06-13 19:45", status: "ẩn" }
                        ],
                    },
                    {
                        id: "2",
                        name: "The Weirdo on Maple Street",
                        url: "https://cineflex.com/stranger-things/s1e2",
                        duration: "55 phút",
                        comments: [
                            { user: "Dũng", content: "Eleven xuất hiện quá ấn tượng!", time: "2025-06-13 19:50", status: "ẩn" },
                            { user: "My", content: "Diễn xuất của bọn nhỏ rất tự nhiên.", time: "2025-06-13 19:55", status: "hiện" }
                        ],
                    },
                ],
            },
        ],
        tags: ["Kinh dị", "Khoa học viễn tưởng", "Giật gân"],
        description:
            "Ở thị trấn Hawkins năm 1983, một cậu bé biến mất bí ẩn. Bạn bè, gia đình và cảnh sát phải đối mặt với những thế lực siêu nhiên để tìm ra sự thật.",
    },
    {
        id: "3",
        title: "Money Heist",
        poster:
            "https://m.media-amazon.com/images/M/MV5BZjkxZWJiNTUtYjQwYS00MTBlLTgwODQtM2FkNWMyMjMwOGZiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        seasons: [
            {
                seasonNumber: 1,
                episodes: [
                    {
                        id: "1",
                        name: "Efectuar lo acordado",
                        url: "https://cineflex.com/money-heist/s1e1",
                        duration: "47 phút",
                        comments: [
                            { user: "Phúc", content: "Mở màn vụ cướp rất thông minh.", time: "2025-06-13 20:00", status: "hiện" },
                            { user: "Trang", content: "Tình tiết cực kỳ logic và hấp dẫn.", time: "2025-06-13 20:05", status: "ẩn" }
                        ],
                    },
                    {
                        id: "2",
                        name: "Imprudencias letales",
                        url: "https://cineflex.com/money-heist/s1e2",
                        duration: "41 phút",
                        comments: [
                            { user: "Hiếu", content: "Bắt đầu thấy hồi hộp rồi đây!", time: "2025-06-13 20:10", status: "ẩn" },
                            { user: "Vy", content: "Tokyo là nhân vật quá cá tính.", time: "2025-06-13 20:15", status: "hiện" }
                        ],
                    },
                ],
            },
        ],
        tags: ["Hành động", "Giật gân", "Tội phạm"],
        description:
            "Một nhóm tội phạm lên kế hoạch và thực hiện vụ cướp lớn nhất lịch sử Tây Ban Nha dưới sự chỉ đạo của 'The Professor'.",
    },
    {
        id: "4",
        title: "The Queen's Gambit",
        poster:
            "https://m.media-amazon.com/images/M/MV5BMmRlNjQxNWQtMjk1OS00N2QxLTk0YWQtMzRhYjY5YTFhNjMxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        seasons: [
            {
                seasonNumber: 1,
                episodes: [
                    {
                        id: "1",
                        name: "Openings",
                        url: "https://cineflex.com/queens-gambit/s1e1",
                        duration: "59 phút",
                        comments: [
                            { user: "Nhung", content: "Không ngờ cờ vua lại cuốn thế này!", time: "2025-06-13 20:20", status: "hiện" },
                            { user: "Bình", content: "Beth có ánh mắt rất cuốn hút.", time: "2025-06-13 20:25", status: "ẩn" }
                        ],
                    },
                    {
                        id: "2",
                        name: "Exchanges",
                        url: "https://cineflex.com/queens-gambit/s1e2",
                        duration: "65 phút",
                        comments: [
                            { user: "Tâm", content: "Diễn biến nội tâm rất rõ ràng.", time: "2025-06-13 20:30", status: "hiện" },
                            { user: "Hòa", content: "Phim đẹp từ âm nhạc tới góc quay.", time: "2025-06-13 20:35", status: "ẩn" }
                        ],
                    },
                ],
            },
        ],
        tags: ["Drama", "Thể thao", "Tâm lý"],
        description:
            "Một cô gái mồ côi trở thành thiên tài cờ vua nhưng phải chiến đấu với chứng nghiện và các thử thách tâm lý.",
    },
    {
        id: "5",
        title: "Naruto",
        poster:
            "https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg",
        seasons: [
            {
                seasonNumber: 1,
                episodes: [
                    {
                        id: "1",
                        name: "Enter: Naruto Uzumaki!",
                        url: "https://cineflex.com/naruto/s1e1",
                        duration: "23 phút",
                        comments: [
                            { user: "Long", content: "Tuổi thơ ùa về! Naruto quá dễ thương.", time: "2025-06-13 20:40", status: "hiện" },
                            { user: "Thảo", content: "Tập đầu hài hước, dễ thương và ý nghĩa.", time: "2025-06-13 20:45", status: "ẩn" }
                        ]
                    },
                ],
            },
        ],
        tags: ["Anime", "Hành động", "Phiêu lưu"],
        description:
            "Naruto là một ninja trẻ tuổi luôn khao khát được công nhận và trở thành Hokage.",
    },
];
export default function CommentModeratorPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movieData] = useState(initialMovieData);

    const handleSelectMovie = (movieId: string) => {
        navigate(`/moderator/comment/${movieId}`);
    };

    const selectedMovie = movieData.find((m) => m.id === id);

    return (
        <>
            {!id && (
                <MovieGridModerator movies={movieData} onSelectMovie={handleSelectMovie} />
            )}
            {id && selectedMovie && (
                <MovieDetailModerator
                    movie={selectedMovie}
                    onBack={() => navigate("/moderator/comment")}
                />
            )}
        </>
    );
}
