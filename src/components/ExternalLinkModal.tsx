import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiExternalLink, FiAlertTriangle } from 'react-icons/fi';

interface ExternalLinkModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  url: string;
}

const ExternalLinkModal = ({ isOpen, onConfirm, onCancel, url }: ExternalLinkModalProps) => {
  const { t } = useTranslation();
  
  if (!isOpen) return null;

  // Function to extract domain from URL
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return url;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      >
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400">
              <FiAlertTriangle className="h-6 w-6" />
            </div>
            <div className="ml-4 flex-1 overflow-hidden">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('modal.title')}
              </h3>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                <p>{t('modal.warning')}</p>
                <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-blue-600 dark:text-blue-400">
                  <div className="flex items-center">
                    <FiExternalLink className="flex-shrink-0 mr-2" />
                    <span 
                      className="truncate font-mono text-sm"
                      title={url}
                    >
                      {getDomain(url)}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm">{t('modal.trustNote')}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t('modal.stayButton')}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              autoFocus
            >
              {t('modal.continueButton')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExternalLinkModal;