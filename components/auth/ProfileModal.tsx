"use client";

import { motion, AnimatePresence } from "motion/react";
import { CloseIcon, appStrings } from "@/service";
import SelectDropdown from "../shared/SelectDropdown";
import Button from "../shared/Button";
import { useProfileModal } from "@/hook";

function ProfileModal() {
  const {
    isOpen,
    profileLoading,
    updateLoading,
    formData,
    countryOptions,
    handleClose,
    handleInputChange,
    handleSave,
    handleCountryChange,
  } = useProfileModal();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#004534E5] opacity-90 flex items-center justify-center z-[10000] p-4 overflow-hidden"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
            className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto no-scrollbar relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <CloseIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-4xl md:text-[56px] font-extrabold text-text-950 font-barlow">
                {appStrings.myProfile}
              </h2>
              <p className="text-text-700 text-sm lg:text-base">
                {appStrings.profileWelcome}
              </p>
            </div>

            {profileLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-700"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2">
                    {appStrings.yourName}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={appStrings.startTypingName}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:border-primary-700 outline-none transition-all placeholder:text-xs md:placeholder:text-sm"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2">
                    {appStrings.yourEmail}
                  </label>
                  <input
                    disabled
                    type="email"
                    value={formData.email}
                    readOnly
                    placeholder={appStrings.enterYourEmail}
                    className="w-full px-4 py-3 border bg-gray-100 border-gray-300 rounded-lg cursor-not-allowed opacity-60 placeholder:text-xs md:placeholder:text-sm"
                  />
                </div>

                {/* Country Field */}
                <SelectDropdown
                  disabled
                  label={appStrings.country}
                  options={countryOptions}
                  value={formData.country.code}
                  onChange={() => {}}
                  placeholder="Select your country"
                  showFlag={true}
                  searchable={true}
                />

                {/* Save Button */}
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={handleSave}
                  isLoading={updateLoading}
                  loadingText={appStrings.saving}
                  animate
                  className="mt-6 font-semibold lg:text-base"
                >
                  {appStrings.save}
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProfileModal;
