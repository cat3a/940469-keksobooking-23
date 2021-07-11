const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const  avatarUploadField = document.querySelector('.ad-form__field input[type=file]');
const  avatarPreviewField = document.querySelector('.ad-form-header__preview img');
const  photoUploadField = document.querySelector('.ad-form__upload input[type=file]');
const  photoPreviewField = document.querySelector('.ad-form__photo img');

const imagePreviewHandler = (uploadFieldName, previewFieldName) => {
  const file = uploadFieldName.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      previewFieldName.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

avatarUploadField.addEventListener('change', imagePreviewHandler.bind(null, avatarUploadField, avatarPreviewField));
photoUploadField.addEventListener('change', imagePreviewHandler.bind(null, photoUploadField, photoPreviewField));
