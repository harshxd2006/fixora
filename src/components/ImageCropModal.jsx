import { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCcw, Check, Loader2 } from 'lucide-react';
import { getCroppedImg } from '../utils/cropImage';

const ImageCropModal = ({ imageSrc, isOpen, onClose, onCropSave }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Lock background page scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isOpen]);

  const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      setIsSaving(true);
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);
      await onCropSave(croppedFile);
      setIsSaving(false);
      onClose();
    } catch (err) {
      console.error('Error generating cropped image:', err);
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none touch-none"
        style={{ overscrollBehavior: 'contain' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-[#0A0A0A] border border-white/15 rounded-2xl sm:rounded-3xl w-full max-w-[calc(100vw-24px)] sm:max-w-md md:max-w-lg overflow-hidden shadow-2xl flex flex-col text-white my-auto max-h-[95dvh]"
        >
          {/* HEADER */}
          <div className="p-3.5 sm:p-5 border-b border-white/15 flex justify-between items-center bg-white/5 flex-shrink-0">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                Crop Profile Picture
              </h3>
              <p className="text-[11px] sm:text-xs text-white/60">
                Pinch or drag to position your avatar crop
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="w-10 h-10 -mr-1 text-white/70 hover:text-white hover:bg-white/10 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 flex-shrink-0"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* CROP CONTAINER (Dynamic height for 320px–430px screens) */}
          <div className="relative w-full h-[240px] xs:h-[270px] sm:h-[340px] bg-black/95 flex-shrink-0 overflow-hidden touch-none select-none">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropCompleteHandler}
              />
            )}
          </div>

          {/* ZOOM SLIDER CONTROL */}
          <div className="p-3.5 sm:p-4 px-4 sm:px-6 border-t border-white/10 bg-white/[0.02] flex items-center gap-3 flex-shrink-0">
            <ZoomOut size={16} className="text-white/60 flex-shrink-0" />
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.02}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-[#E5B268] cursor-pointer h-2 bg-white/20 rounded-lg outline-none touch-none"
            />
            <ZoomIn size={16} className="text-[#E5B268] flex-shrink-0" />
          </div>

          {/* FOOTER THUMB ACTIONS (Apple/Android 44px minimum touch targets) */}
          <div className="p-3.5 sm:p-5 border-t border-white/15 bg-white/5 flex items-center justify-between gap-2.5 sm:gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={handleReset}
              disabled={isSaving}
              className="glass-card min-h-[44px] px-3.5 text-xs font-semibold text-white/80 hover:text-white flex items-center justify-center gap-1.5 hover:border-white/30 transition-all disabled:opacity-50 active:scale-95"
            >
              <RotateCcw size={14} /> Reset
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="glass-card min-h-[44px] px-4 text-xs font-semibold text-white/80 hover:text-white flex items-center justify-center transition-all disabled:opacity-50 active:scale-95"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="btn-primary min-h-[44px] px-5 sm:px-6 text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-50 active:scale-95"
              >
                {isSaving ? (
                  <Loader2 size={16} className="animate-spin text-[#0A0A0A]" />
                ) : (
                  <>
                    <Check size={16} /> Save Crop
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ImageCropModal;
