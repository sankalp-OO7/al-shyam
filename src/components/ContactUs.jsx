"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Mail, Phone, MessageSquare, MapPin } from "lucide-react";

// --- Utility Components and Hooks (Keeping them consistent) ---

const AnimatedText = ({ text, className, delay = 0 }) => {
  const letters = text.split("");
  const container = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    }),
  };
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block"
          whileHover={{
            scale: 1.05,
            color: "#38bdf8",
            transition: { duration: 0.3 },
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Card3D = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    setMousePosition({ x: rotateY, y: rotateX });
  };
  return (
    <motion.div
      ref={ref}
      className={`transform-gpu perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        rotateX: isHovered ? mousePosition.y : 0,
        rotateY: isHovered ? mousePosition.x : 0,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="relative"
        animate={{ z: isHovered ? 30 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const FloatingParticles = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particleCount = 12;

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (dimensions.width === 0) return null;

  const particles = Array.from({ length: particleCount }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-30"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            y: [null, -100, null],
            x: [null, Math.random() * 100 - 50, null],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Contact Method Component
const ContactMethod = ({
  icon: Icon,
  title,
  value,
  action,
  gradient,
  delay,
  isInView,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card3D className="h-full">
      <motion.div
        className="relative h-full p-6 bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-blue-500/30 shadow-2xl shadow-blue-900/50 group cursor-pointer overflow-hidden"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
        onClick={action}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.3)",
          y: -5,
        }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        <motion.div
          className={`relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg`}
          animate={
            isHovered
              ? {
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.3)",
                }
              : { scale: 1 }
          }
          transition={{ duration: 0.3 }}
        >
          <Icon className="text-white w-8 h-8 sm:w-10 sm:h-10" />

          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-md opacity-30`}
            animate={
              isHovered
                ? { scale: 1.3, opacity: 0.5 }
                : { scale: 1, opacity: 0.3 }
            }
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.3 }}
        >
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-400 text-sm sm:text-base font-medium break-all">
            {value}
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={
            isHovered ? { rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] } : {}
          }
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm">
            →
          </div>
        </motion.div>

        <motion.div
          className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${gradient} opacity-5 rounded-bl-full`}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.8, delay: delay + 0.1 }}
        />
      </motion.div>
    </Card3D>
  );
};

// Interactive Map Component
const InteractiveMap = ({ isInView }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // 🎯 UPDATED LOCATION AND LINKS
  const dubaiLocation = {
    address: "Dubai, United Arab Emirates",
    mapLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.5424339514766!2d55.2769027!3d25.184923500000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f683196d058f9%3A0x80415946c2a5349b!2sThe%20Metropolis%20Tower%20-%20Business%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1763960991432!5m2!1sen!2sin", // Embed map link
    gmapsUrl: "https://maps.app.goo.gl/YsPJFX8nFDF1dy2N9", // Directions link
  };

  return (
    <Card3D className="h-full">
      <motion.div
        className="relative h-full bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-blue-500/30 shadow-2xl shadow-blue-900/50 overflow-hidden"
        initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
        animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
        transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.3)",
          scale: 1.02,
        }}
      >
        {/* Map header */}
        <motion.div
          className="p-4 bg-gradient-to-r from-blue-700/80 to-cyan-700/80 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold">
                The Metropolis Tower
              </h3>
              <p className="text-sm opacity-90">{dubaiLocation.address}</p>
            </div>
            <motion.div
              className="text-2xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Map container */}
        <motion.div
          className="relative h-80 sm:h-96"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <motion.div
                className="flex flex-col items-center space-y-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400">Loading map...</p>
              </motion.div>
            </div>
          )}

          <iframe
            // 🎯 UPDATED MAP EMBED SRC
            src={dubaiLocation.mapLink}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setMapLoaded(true)}
            className="rounded-b-2xl"
          />
        </motion.div>

        {/* Location details */}
        <motion.div
          className="p-4 bg-gradient-to-r from-gray-900/90 to-black/90"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Office Location in {dubaiLocation.address}
              </p>
              <p className="text-xs text-gray-400">
                Click to open in Google Maps
              </p>
            </div>
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-lg shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(dubaiLocation.gmapsUrl, "_blank")} // 🎯 UPDATED DIRECTIONS LINK
            >
              <span className="flex items-center">
                Get Directions
                <motion.span
                  className="ml-1"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </Card3D>
  );
};

// Quick Contact Form Component
const QuickContactForm = ({ isInView }) => {
  // 🎯 UPDATED WHATSAPP NUMBER TO +971 58 635 4242 (971586354242)
  const whatsappNumber = "971586354242";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hello! I'm ${formData.name}.\n\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card3D>
      <motion.div
        className="relative p-6 sm:p-8 bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-blue-500/30 shadow-2xl shadow-blue-900/50"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.3)",
        }}
      >
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Inquire Now
          </h3>
          <p className="text-gray-400">
            Send us a message and we'll connect via WhatsApp!
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            {
              name: "name",
              type: "text",
              placeholder: "Your Name",
              delay: 0.8,
            },
            {
              name: "email",
              type: "email",
              placeholder: "Your Email",
              delay: 1.0,
            },
            {
              name: "phone",
              type: "tel",
              placeholder: "Your Phone Number",
              delay: 1.2,
            },
          ].map((field) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: field.delay }}
            >
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-500 transition-all duration-300"
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <textarea
              name="message"
              placeholder="Your Message (Optional)"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-500 transition-all duration-300 resize-none"
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold rounded-xl shadow-lg group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.6 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px -12px rgba(34, 197, 94, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              <span>Send Inquiry via WhatsApp</span>
            </span>
          </motion.button>
        </form>
      </motion.div>
    </Card3D>
  );
};

export default function ContactSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -30]);
  const y2 = useTransform(scrollY, [0, 500], [0, -60]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  };

  // 🎯 UPDATED CONTACT METHODS - WhatsApp number is now +971 58 635 4242
  const contactMethods = [
    {
      icon: MessageSquare,
      title: "WhatsApp & Call",

      value: "+971 58 635 4242", // Updated value
      action: () => window.open("https://wa.me/971586354242", "_blank"), // Updated action link
      gradient: "from-green-500 to-emerald-600",
      delay: 0.2,
    },
    {
      icon: Mail,
      title: "Email",
      value: "shamsgs.work@gmail.com",
      action: () => window.open("mailto:shamsgs.work@gmail.com"),
      gradient: "from-blue-500 to-cyan-600",
      delay: 0.4,
    },
    {
      icon: MapPin,
      title: "Headquarters",
      value: "Dubai, UAE",
      action: () =>
        window.open("https://maps.app.goo.gl/YsPJFX8nFDF1dy2N9", "_blank"), // Directions link
      gradient: "from-violet-500 to-fuchsia-600",
      delay: 0.6,
    },
  ];

  return (
    <motion.section
      ref={containerRef}
      id="contact"
      className="relative py-24 lg:py-40 bg-gray-900 border-b border-cyan-500/10 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: isMobile
          ? `#0D1117`
          : `radial-gradient(circle at ${mousePosition.x * 100}% ${
              mousePosition.y * 100
            }%, 
          rgba(59, 130, 246, 0.05) 0%, 
          rgba(6, 182, 212, 0.03) 25%, 
          transparent 50%),
          #0D1117`,
      }}
    >
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          background:
            "radial-gradient(circle at top right, #370665 0%, #0D1117 70%)",
        }}
      />

      <FloatingParticles />

      {!isMobile && (
        <>
          <motion.div
            className="absolute top-20 right-20 w-28 h-28 border-2 border-cyan-400/40 rounded-2xl rotate-12"
            animate={{ rotate: [12, 102, 12], scale: [1, 1.1, 1] }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ y: y1 }}
          />

          <motion.div
            className="absolute bottom-32 left-32 w-24 h-24 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full backdrop-blur-sm"
            animate={{ y: [-10, 10, -10], x: [-5, 5, -5], scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ y: y2 }}
          />

          <motion.div
            className="absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-r from-violet-400/40 to-fuchsia-400/40 rounded-xl rotate-45"
            animate={{ rotate: [45, 225, 45], scale: [1, 1.3, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-cyan-400/60 rounded-full text-sm font-medium text-cyan-400 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2 animate-pulse"></span>
            Global Outreach
          </motion.div>

          <AnimatedText
            text="Connect with Shams Global Systems"
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 mb-4 leading-tight tracking-tighter"
            delay={0.5}
          />

          <motion.p
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Our team is ready to assist you with inquiries, technical support,
            and partnership opportunities.
          </motion.p>

          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ duration: 1, delay: 1.5 }}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {contactMethods.map((method, index) => (
            <ContactMethod key={method.title} {...method} isInView={isInView} />
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <InteractiveMap isInView={isInView} />
          <QuickContactForm isInView={isInView} />
        </div>
      </div>
    </motion.section>
  );
}
