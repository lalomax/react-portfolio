import { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ScrollButton = () => {

	const [visible, setVisible] = useState(false)

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300) {
			setVisible(true)
		}
		else if (scrolled <= 300) {
			setVisible(false)
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	window.addEventListener('scroll', toggleVisible);

	return (
		<motion.button 
			className={`fixed left-4 bottom-8 z-40 bg-accent hover:bg-accent-light text-white p-3 sm:p-4 rounded-full shadow-lg transition-colors duration-300 ${visible ? 'block' : 'hidden'}`}
			onClick={scrollToTop}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
			aria-label="Scroll to top"
		>
			<FaArrowUp size={20} />
		</motion.button>
	);
}

export default ScrollButton;
