import React,  { useRef, useEffect } from 'react';
import Hls from 'hls.js';
import { motion } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router';
import Banner from '@/assets/img/cineflexLaptopIllustration.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};
{/* static FAQ part below */}
const faqs = [
  {
    question: "Cineflex là gì?",
    answer:
      "Cineflex là một nền tảng phát trực tuyến phim toàn cầu, cung cấp nội dung chất lượng cao từ khắp nơi trên thế giới. Nền tảng tập trung vào trải nghiệm thân thiện với người dùng, xem không quảng cáo và thiết kế ưu tiên bảo mật."
  },
  {
    question: "Tại sao tôi nên chọn Cineflex thay vì các nền tảng khác?",
    answer:
      "Cineflex mang đến khả năng truy cập tốt hơn, thư viện nội dung phong phú từ nhiều quốc gia, và khả năng loại bỏ quảng cáo chỉ với một lần thanh toán duy nhất. Giao diện của chúng tôi nhanh, an toàn và tối giản."
  },
  {
    question: "Làm sao để bắt đầu?",
    answer:
      "Chỉ cần truy cập trang chủ của chúng tôi, tạo tài khoản và bắt đầu duyệt nội dung ngay lập tức. Không cần thẻ tín dụng để xem các nội dung miễn phí!"
  },
  {
    question: "Tôi có cần phải trả tiền để sử dụng Cineflex không?",
    answer:
      "Không. Cineflex hoàn toàn miễn phí. Chúng tôi có tùy chọn loại bỏ quảng cáo chỉ một lần để bạn có trải nghiệm liền mạch. Một số nội dung cao cấp có thể được mở khóa sau, nhưng phần lớn nội dung đều có thể truy cập được cho mọi người."
  },
  {
    question: "Dữ liệu của tôi có an toàn với Cineflex không?",
    answer:
      "Chắc chắn rồi. Cineflex sử dụng mã hóa và giao thức bảo mật theo tiêu chuẩn ngành. Chúng tôi không bán hoặc chia sẻ dữ liệu cá nhân của bạn cho bên thứ ba."
  },
  {
    question: "Cineflex cung cấp những loại nội dung nào?",
    answer:
      "Cineflex cung cấp đa dạng các thể loại như phim điện ảnh, phim ngắn, phim tài liệu và phim bộ đến từ châu Á, châu Âu, châu Mỹ và nhiều nơi khác. Chúng tôi hướng tới việc mang lại sự đa dạng toàn cầu trong lĩnh vực giải trí."
  },
  {
    question: "Tôi có thể sử dụng Cineflex trên điện thoại hoặc máy tính bảng không?",
    answer:
      "Có. Cineflex hoàn toàn tương thích và tối ưu cho mọi thiết bị — máy tính để bàn, máy tính bảng và điện thoại di động."
  } 
];


const FAQSection = () => (
  <section className="w-full py-10 px-4">
    <div className="max-w-6xl mx-auto">
      <motion.h2
        className="text-4xl font-bold text-center text-purple-400 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Câu hỏi thường gặp
      </motion.h2>
    <div className="max-h-[700px] overflow-y-auto pr-2">
      <div className="divide-y divide-[#3B3D52]">
        {faqs.map((faq, idx) => (
          <Disclosure key={idx}>
            {({ open }) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Disclosure.Button
                  className="flex justify-between items-center w-full py-4 text-left text-lg font-medium text-white hover:text-purple-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronUpIcon
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      open ? 'rotate-180 text-purple-400' : 'text-gray-400'
                    }`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="py-2 text-md text-gray-300">
                  {faq.answer}
                </Disclosure.Panel>
              </motion.div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  </div>
  </section>
);
{/* static FAQ part above*/}

const Landing: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource("https://stream.mux.com/fF01gyvBNecwccLiMithDMIhUylC8EIvp2yq5JL301TrM.m3u8?redundant_streams=true");
        hls.attachMedia(video);

        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = "https://stream.mux.com/fF01gyvBNecwccLiMithDMIhUylC8EIvp2yq5JL301TrM.m3u8?redundant_streams=true";
      } else {
        console.error("HLS not supported in this browser");
      }
    }, []);

  return (
    <div className="bg-[#23263A]">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden text-white">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10" />

        <div className="relative z-20 px-8 lg:px-24 h-full flex items-center">
          <motion.div className="max-w-2xl space-y-6 bg-white/8 backdrop-blur-sm rounded-4xl p-10" variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="text-3xl md:text-4xl font-semibold">Tuyệt đối điện ảnh</h1>
            <p className="text-md text-gray-200 leading-relaxed">
              Tại Cineflex, thế giới điện ảnh luôn trong tầm tay bạn.
              <br /> Cineflex mang đến trải nghiệm xem phim linh hoạt, mọi lúc mọi nơi.
              <br /> Dù bạn đang ở nhà hay đang di chuyển tất cả chỉ với một cú chạm.
            </p>
            <Link to="/home">
              <motion.span
                className="inline-flex items-center gap-2 bg-purple-400 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-500 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 22v-20l18 10-18 10z" />
                </svg>
                Khám phá Cineflex
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* About Section */}
      <motion.div
        className="bg-[#23263A] text-white px-6 py-15"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
             <h2 className="text-3xl sm:text-4xl font-bold text-purple-500 mb-4">Xin chào,</h2>
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-500 mb-6">Chúng tôi là Cineflex</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Được sinh ra với sứ mệnh mang điện ảnh đến gần hơn với mọi người...
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mt-4">
              Hãy cùng chúng tôi khám phá thế giới điện ảnh đầy màu sắc và cảm xúc...
            </p>
            <div className="mt-8">
              <h4 className="font-bold text-white uppercase tracking-wider">CINEFLEX</h4>
              <p className="text-sm text-gray-400">Absolute Cinema</p>
            </div>
          </div>
          <div className="lg:w-1/2">
            <motion.img
              src={Banner}
              alt="Cineflex"
              className="rounded-lg shadow-lg w-full"
              whileHover={{ scale: 1.02 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Tabs of info Section */}
<motion.div
  className="bg-[#23263A] text-white px-6 py-20"
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  <div className="max-w-6xl mx-auto text-center mb-12">
    <h2 className="text-3xl sm:text-4xl font-bold text-purple-500">
      Tại sao chọn Cineflex?
    </h2>
    <p className="text-gray-300 text-lg mt-2">
      Những lý do khiến Cineflex trở nên khác biệt và đáng tin cậy
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-6">
    <motion.div
      className="bg-[#2f3147] rounded-lg p-6 shadow-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="mb-4">
        <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">Bảo mật hàng đầu</h3>
      <p className="text-sm text-gray-300 mb-4">
        Chúng tôi cam kết bảo vệ thông tin cá nhân và dữ liệu xem của bạn bằng các tiêu chuẩn bảo mật cao cấp.
      </p>
      <Link to="#" className="text-purple-500 text-sm inline-flex items-center gap-1 hover:underline">
        Tìm hiểu thêm <span>→</span>
      </Link>
    </motion.div>

    <motion.div
      className="bg-[#2f3147] rounded-lg p-6 shadow-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
          <div className="mb-4">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Thanh toán linh hoạt</h3>
          <p className="text-sm text-gray-300 mb-4">
            Chỉ cần thanh toán để gỡ bỏ quảng cáo. Tận hưởng trải nghiệm xem trọn vẹn mà không cần gói phức tạp.
          </p>
          <Link to="/plans" className="text-purple-500 text-sm inline-flex items-center gap-1 hover:underline">
            Tìm hiểu thêm <span>→</span>
          </Link>
        </motion.div>

        <motion.div
          className="bg-[#2f3147] rounded-lg p-6 shadow-lg "
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="mb-4">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Nội dung toàn cầu</h3>
          <p className="text-sm text-gray-300 mb-4">
            Từ phim bom tấn Hollywood đến điện ảnh Châu Á, bạn có thể khám phá thế giới phim ảnh mà không bị giới hạn.
          </p>
          <Link to="/home" className="text-purple-500 text-sm inline-flex items-center gap-1 hover:underline">
            Tìm hiểu thêm <span>→</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>


      {/* FAQ Section */}
      <motion.div
        className="bg-[#23263A] text-white px-6 py-20"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <FAQSection />
      </motion.div>
    </div>
  );
};

export default Landing;
