// Utility function to generate a unique device ID
export const generateDeviceId = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Get or create device ID from localStorage
export const getDeviceId = (): string => {
  const existingId = localStorage.getItem('telzen_device_id');
  if (existingId) {
    return existingId;
  }
  
  const newId = generateDeviceId();
  localStorage.setItem('telzen_device_id', newId);
  return newId;
};