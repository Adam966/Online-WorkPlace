export function createForm(picture: File): FormData {
  const formData: FormData = new FormData();
  formData.append('file', picture);
  return formData;
}
