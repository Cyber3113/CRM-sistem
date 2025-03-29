function toggleEditMode() {
  const inputs = document.querySelectorAll("#profileForm input, #profileForm textarea");
  const button = document.getElementById("toggleButton");
  const isDisabled = inputs[0].disabled;
  inputs.forEach(input => input.disabled = !isDisabled);
  button.textContent = isDisabled ? "Saqlash" : "Tahrirlash";
}
function uploadImage() {
  document.getElementById("fileInput").click();
}
function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          document.getElementById("profilePic").src = e.target.result;
      };
      reader.readAsDataURL(file);
  }
}