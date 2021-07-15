const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const AVATAR_DEFAULT = 'img/muffin-grey.svg';
const PHOTO_DEFAULT = 'img/muffin-white.svg';

const  avatarUploadField = document.querySelector('.ad-form__field input[type=file]');
const  avatarPreviewField = document.querySelector('.ad-form-header__preview img');
const  photoUploadField = document.querySelector('.ad-form__upload input[type=file]');
const  photoPreviewField = document.querySelector('.ad-form__photo img');

const pictureChangeHandler = (uploadFieldName, previewFieldName) => {
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

avatarUploadField.addEventListener('change', pictureChangeHandler.bind(null, avatarUploadField, avatarPreviewField));
photoUploadField.addEventListener('change', pictureChangeHandler.bind(null, photoUploadField, photoPreviewField));

export {avatarPreviewField, photoPreviewField, AVATAR_DEFAULT, PHOTO_DEFAULT};
