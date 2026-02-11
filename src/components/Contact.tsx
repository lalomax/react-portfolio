// import "./contact.css"
import { useTranslation } from 'react-i18next';
const Contact = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-secondaryDark  text-primaryLight px-5 py-32" id="contact">
      <div className="text-center  mx-auto ">
        <h2 className="text-4xl inline-block font-bold mb-5 border-b-[5px]  mx-auto border-indigo-600 pb-2">
          {t('Contact-me')}
        </h2>
        <p className='mb-4'>
          {t('ContactDesc')}
        </p>

        
          
              <p className="flex items-center gap-1 justify-center group mb-4">
                <span className="font-bold hidden md:block">{t('Email')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href="mailto:lalomax365@gmail.com" className="mb-1 border-b-[2px]  border-indigo-600 group-hover:animate-pulse ">lalomax365@gmail.com</a>
                <button className="ml-2 text-slate-400 group-hover:animate-spin" onClick={() => {
                  navigator.clipboard.writeText('lalomax365@gmail.com')
                  .then(() => {
                    alert(t('EmailCopied'))
                  })
                }}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg></button>
              </p>

              <p className="flex items-center gap-1 justify-center group">
                <span className="font-bold hidden md:block">WhatsApp</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <a href="https://wa.me/message/NH6NSU3VKWD2A1?src=qr" target="_blank" className="mb-1 border-b-[2px]  border-indigo-600 group-hover:animate-pulse">+591 77595073</a>
                <button className="ml-2 text-slate-400 group-hover:animate-spin" onClick={() => {
                  navigator.clipboard.writeText('+591 77595073')
                  .then(() => {
                    alert(t('PhoneCopied'))
                  })
                }}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg></button>
              </p>
          
          

          

        
      
      </div>
    </section>
  );
};

export default Contact;