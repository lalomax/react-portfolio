import { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
// import { Button } from './Styles'; 

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
			behavior: 'auto'
			/* you can also use 'auto' behaviour 
				in place of 'smooth' */
		});
	};

	window.addEventListener('scroll', toggleVisible);

	return (
		<button className='scrollbutton text-indigo-600 ' style={{ display: visible ? 'inline' : 'none' }}>
			<FaArrowCircleUp onClick={scrollToTop}
				 />
		</button>
	);
}

export default ScrollButton; 
