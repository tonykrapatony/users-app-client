const avatarGenerator = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function(onLoadEvent) {
      resolve(onLoadEvent.target?.result);
    }

    reader.onerror = function(error) {
      reject(error);
    }
  });
}

export default avatarGenerator;
